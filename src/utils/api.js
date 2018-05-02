// Our Depedencies
import { crud } from './firebaseUtil'
import database from '../config/firebase'

export default {
    category: crud('/categories'),
    comment: {
        ...crud('/comments'),
        deleteByIds: (ids) => {
            const updates = {};
            for (let id of ids) {
                updates[`/comments/${id}`] = null
            }
            return database.ref().update(updates)
        }
    },
    post: crud('/posts'),
}