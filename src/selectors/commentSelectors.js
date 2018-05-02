import { createSelector } from 'reselect'

const allCommentsSelector = state => state.comments.all

const getCommentsByPostId = (post_id) => {
    return createSelector(
        [allCommentsSelector],
        (all_comments) => {
            const comments = all_comments || {}
            return Object.keys(comments).filter(key => {
                return comments[key].post_id === post_id
            }).map(key => comments[key])
        }
    )
}

const getTotalCommentsByPostId = (post_id) => {
    return createSelector(
        [getCommentsByPostId(post_id)],
        (comments) => {
            return comments.length
        }
    )
}

export {
    getCommentsByPostId,
    getTotalCommentsByPostId
}