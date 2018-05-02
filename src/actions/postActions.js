import API from '../utils/api'
import notificationActions, { notificationType } from './notificationActions'

export const types = {
    POST_GET_ALL_REQUEST: '[post] GET_ALL_REQUEST',
    POST_GET_ALL_SUCCESS: '[post] GET_ALL_SUCCESS',
    POST_GET_ALL_FAILURE: '[post] GET_ALL_FAILURE',

    POST_SAVE_REQUEST:    '[post] SAVE_REQUEST',
    POST_SAVE_SUCCESS:    '[post] SAVE_SUCCESS',
    POST_SAVE_FAILURE:    '[post] SAVE_FAILURE',

    POST_DELETE_REQUEST:  '[post] DELETE_REQUEST',
    POST_DELETE_SUCCESS:  '[post] DELETE_SUCCESS',
    POST_DELETE_FAILURE: '[post] DELETE_FAILURE',

    POST_SET_CURRENT: '[post] SET_CURRENT_POST',

    POST_CHANGE_FILTER_REQUEST: '[post] CHANGE_FILTER_REQUEST',
    POST_CHANGE_SORT_REQUEST: '[post] CHANGE_SORT_REQUEST',

    POST_VOTE_SCORE_CHANGE_REQUEST: '[post] VOTE_SCORE_CHANGE_REQUEST',
    POST_VOTE_SCORE_CHANGE_SUCCESS: '[post] VOTE_SCORE_CHANGE_SUCCESS',
}

export const actions = {
    getAllRequest: ()      => ({ type: types.POST_GET_ALL_REQUEST }),
    getAllSuccess: (posts) => ({ type: types.POST_GET_ALL_SUCCESS, payload: posts }),
    getAllFailure: (error) => ({ type: types.POST_GET_ALL_SUCCESS, payload: error }),

    saveRequest: ()        => ({ type: types.POST_SAVE_REQUEST }),
    saveSuccess: (post)    => ({ type: types.POST_SAVE_SUCCESS, payload: post }),
    saveFailure: (error)   => ({ type: types.POST_SAVE_SUCCESS, payload: error }),

    deleteRequest: ()      => ({ type: types.POST_DELETE_REQUEST }),
    deleteSuccess: (post)  => ({ type: types.POST_DELETE_SUCCESS, payload: post }),
    deleteFailure: (error) => ({ type: types.POST_DELETE_SUCCESS, payload: error }),

    setCurrentPost: (post_id) => ({ type: types.POST_SET_CURRENT, payload: post_id }),

    setFilter(filter) { return { type: types.POST_CHANGE_FILTER_REQUEST, payload: filter } },
    setSort(sort) { return { type: types.POST_CHANGE_SORT_REQUEST, payload: sort } }
}

export default {

    private_actions: actions,

    savePost(post, notification = true) {
        const auxPost = {...post}
        return (dispatch, getState) => {
            const isNew = !post.hasOwnProperty('id')
            if (isNew) {
                // Create
                auxPost.vote_score = 0
                auxPost.created_at = Date.now()
                auxPost.created_by = getState().user ? getState().user.uid : null
            } else {
                // Update
                auxPost.updated_at = Date.now()
                auxPost.updated_by = getState().user ? getState().user.uid : null
            }

            dispatch(actions.saveRequest())

            return API.post.save(auxPost)
                .then(response => {
                    if (notification) {
                        dispatch(notificationActions.showNotification({
                            header: isNew ? 'Added' : 'Saved',
                            message: `The post [${post.title}] has ${isNew ? 'added' : 'saved'}.`,
                            type: isNew ? notificationType.SUCCESS : notificationType.INFO
                        }))
                    }
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

    deletePost(post) {
        return dispatch => {
            dispatch(actions.deleteRequest())

            return API.post.delete(post)
                .then(response => {
                    // the success action will dispatch using firebase events
                    // dispatch(actions.deleteSuccess(post))
                    return response
                })
                .catch(error => {
                    dispatch(actions.deleteFailure(error))
                    throw error
                })
        }
    },

    setCurrentPost: (post_id) => {
        return actions.setCurrentPost(post_id)
    },

    changeFilter(field, value) {
        const filter = { field, value: (value === undefined || value === '' ? 'all' : value) }
        return (dispatch, getState) => {
            if (getState().posts.filterBy.field !== filter.field
                || getState().posts.filterBy.value !== filter.value) {
                return dispatch(actions.setFilter(filter))
            }
        }
    },

    changeSort(field, order) {
        const sort = {field, order: (order === undefined || order === '' || order === 'asc' ? 'asc' : 'desc')}
        return (dispatch, getState) => {
            if (getState().posts.sortBy.field !== sort.field
                || getState().posts.sortBy.order !== sort.order) {
                return dispatch(actions.setSort(sort))
            }
        }
    },

    votePost(post, increment = true) {
        const tempPost = { ...post, vote_score: increment ? post.vote_score + 1 : post.vote_score - 1 }
        return this.savePost(tempPost, false)
    }
}