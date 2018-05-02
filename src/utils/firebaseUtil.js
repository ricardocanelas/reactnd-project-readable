import { database } from '../config/firebase'
import { isObject, replaceByReg } from './helpers'

/**
 * Example:
 *
 * const services = {
 *  posts: crud('/posts'),
 *  posts_comments: crud('/posts/:post_id/comments')
 * }
 *
 * services.posts.all().then(response => { console.log(response )})
 * services.posts_comments.all({post_id: 'P0341}).then(response => { console.log(response) })
 * services.posts_comments.save({id: 'C0393', comment: 'Testing'}, {post_id: 'P0341'})
 *
 **/

export const crud = (ref) => {

    function getRef(params) {
        const regex = /:(\w*)/g;
        return replaceByReg(regex, this.ref, params)
    }


    return {
        ref,
        getRef,
        all(refParams = {}) {
            return database.ref(this.getRef(refParams)).once('value')
                .then(snapshot => {
                    return Object.assign({}, snapshot.val())
                })
        },

        get(obj, refParams = {}) {
            return database.ref(this.getRef(refParams)).child(obj.id).once('value')
                .then(snapshot => {
                    if (snapshot.val() === null) throw new Error("Does not found");
                    return Object.assign({}, snapshot.val())
                })
        },

        update(obj, refParams = {}) {
            return database.ref(this.getRef(refParams)).child(obj.id).set(obj).then(() => obj)
        },

        create(obj, refParams = {}) {
            const key = database.ref(this.getRef(refParams)).push().key
            return this.update({ ...obj, id: key }, refParams).then(post => post)
        },

        save(obj, refParams = {}) {
            if (isObject(obj)) {
                return obj.hasOwnProperty('id') ? this.update(obj, refParams) : this.create(obj, refParams)
            } else {
                return false;
            }
        },

        delete(obj, refParams = {}) {
            return database.ref(this.getRef(refParams)).child(obj.id).remove().then(() => obj)
        },
    }
}