import API from '../utils/api'

export const types = {
    COMMENT_GET_ALL_REQUEST: '[comment] GET_ALL_REQUEST',
    COMMENT_GET_ALL_SUCCESS: '[comment] GET_ALL_SUCCESS',
    COMMENT_GET_ALL_FAILURE: '[comment] GET_ALL_FAILURE',

    COMMENT_SAVE_REQUEST:    '[comment] SAVE_REQUEST',
    COMMENT_SAVE_SUCCESS:    '[comment] SAVE_SUCCESS',
    COMMENT_SAVE_FAILURE:    '[comment] SAVE_FAILURE',

    COMMENT_DELETE_REQUEST:  '[comment] DELETE_REQUEST',
    COMMENT_DELETE_SUCCESS:  '[comment] DELETE_SUCCESS',
    COMMENT_DELETE_FAILURE: '[comment] DELETE_FAILURE',
}

export const actions = {
    getAllRequest: () => ({type: types.COMMENT_GET_ALL_REQUEST}),
    getAllSuccess: (comments) => ({type: types.COMMENT_GET_ALL_SUCCESS, payload: comments}),
    getAllFailure: (error) => ({ type: types.COMMENT_GET_ALL_FAILURE, payload: error }),

    saveRequest: () => ({ type: types.COMMENT_SAVE_REQUEST }),
    saveSuccess: (comment)  => ({type: types.COMMENT_SAVE_SUCCESS, payload: comment}),
    saveFailure: (error) => ({type: types.COMMENT_SAVE_SUCCESS, payload: error}),

    deleteRequest: ()  => ({ type: types.COMMENT_DELETE_REQUEST }),
    deleteSuccess: (comment) => ({type: types.COMMENT_DELETE_SUCCESS, payload: comment}),
    deleteFailure: (error) => ({ type: types.COMMENT_DELETE_SUCCESS, payload: error }),
}

export default {

    private_actions: actions,

    saveComment(comment, post_id = null) {
        const auxComment = {...comment}
        return (dispatch, getState) => {
            if (comment.hasOwnProperty('id')) {
                // Update
                auxComment.updated_at = Date.now()
                auxComment.updated_by = getState().user.uid
            } else {
                // Create
                auxComment.vote_score = 0
                auxComment.post_id = post_id ? post_id : getState().posts.current
                auxComment.created_at = Date.now()
                auxComment.created_by = getState().user.uid
            }

            dispatch(actions.saveRequest())

            return API.comment.save(auxComment)
                .then(response => {
                    // the success action will dispatch using firebase events
                    // dispatch(actions.saveSuccess(response))
                    return response
                })
                .catch(error => {
                    dispatch(actions.saveFailure(error))
                    throw error
                })
        }
    },

    deleteComment(comment) {
        return dispatch => {
            dispatch(actions.deleteRequest())

            return API.comment.delete(comment)
                .then(response => {
                    // the success action will dispatch using firebase events
                    // dispatch(actions.deleteSuccess(comment))
                    return response
                })
                .catch(error => {
                    dispatch(actions.deleteFailure(error))
                    throw error
                })
        }
    },

    deleteComments(ids) {
        // TODO
    },

    voteComment(comment, increment = true) {
        const tempComment = { ...comment, vote_score: increment ? comment.vote_score + 1 : comment.vote_score - 1 }
        return this.saveComment(tempComment)
    }

}