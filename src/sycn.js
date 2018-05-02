// Our Depedencies
import api from './utils/api';
import actions from './actions'
import { objToArray } from './utils/helpers';
import { auth, database } from './config/firebase'
import { notificationType } from './actions/notificationActions'

export default {

    listenDataHasInit: false,

    init(store) {

        // Get & Listen Authentication
        auth.onAuthStateChanged(firebaseUser => {
            store.dispatch(actions.user.setCredential(firebaseUser))
            if (firebaseUser === null) {
                this.listenDataHasInit = false
            }
        })

        // Subscribe
        store.subscribe(() => {
            if(store.getState().status.user.authenticated && !this.listenDataHasInit) {
                this.listenDataHasInit = true
                this.listenData(store)
            }
        })
    },

    listenData(store) {

        // -----------------------------------------------------
        // Categories
        // -----------------------------------------------------

        database.ref(`categories`).once('value').then(snapshot => {
            store.dispatch(actions.categories.private_actions.getAllSuccess(snapshot.val()))
        })


        // -----------------------------------------------------
        // Comments
        // -----------------------------------------------------

        let isFirstCallOfCommentsAdded = true

        database.ref(`comments`).once('value').then(snapshot => {
            store.dispatch(actions.comments.private_actions.getAllSuccess(snapshot.val()))
            if(snapshot.numChildren() === 0) isFirstCallOfCommentsAdded = false
        })

        database.ref(`comments`).limitToLast(1).on('child_added', ((snapshot, prevChildKey) => {
            if (isFirstCallOfCommentsAdded) {
                isFirstCallOfCommentsAdded = false
            } else {
                store.dispatch(actions.comments.private_actions.saveSuccess(snapshot.val()))
            }
        }))

        database.ref(`comments`).on('child_changed', (snapshot => {
            store.dispatch(actions.comments.private_actions.saveSuccess(snapshot.val()))
        }))

        database.ref(`comments`).on('child_removed', (snapshot => {
            store.dispatch(actions.comments.private_actions.deleteSuccess(snapshot.val()))
        }))

        // -----------------------------------------------------
        // Posts
        // -----------------------------------------------------

        let isFirstCallOfPostAdded = true

        database.ref(`posts`).once('value').then(snapshot => {
            store.dispatch(actions.posts.private_actions.getAllSuccess(snapshot.val()))
            if(snapshot.numChildren() === 0) isFirstCallOfPostAdded = false
        })

        database.ref(`posts`).limitToLast(1).on('child_added', ((snapshot, prevChildKey) => {
            if (isFirstCallOfPostAdded) {
                isFirstCallOfPostAdded = false
            } else {
                const post = snapshot.val()
                store.dispatch(actions.posts.private_actions.saveSuccess(post))
            }
        }))

        database.ref(`posts`).on('child_changed', (snapshot => {
            const post = snapshot.val()
            store.dispatch(actions.posts.private_actions.saveSuccess(post))
        }))

        database.ref(`posts`).on('child_removed', (snapshot => {
            const post = snapshot.val()
            store.dispatch(actions.posts.private_actions.deleteSuccess(post))

            // global notification when delete a post
            store.dispatch(actions.notifications.showNotification({
                header: 'Deleted',
                message: `The post [${post.title}] has deleted.`,
                type: notificationType.WARNING
            }))

            // Delete all comments
            const comments = objToArray(store.getState().comments.all)
            const ids = comments.reduce((acc, comment) => {
                if (comment.post_id === post.id) acc.push(comment.id)
                return acc
            }, [])
            api.comment.deleteByIds(ids)
        }))
    }
}