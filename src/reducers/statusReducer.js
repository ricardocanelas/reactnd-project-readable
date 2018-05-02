// External Depedencies
import produce from 'immer'

// Our Depedencies
import { types as userTypes     } from '../actions/userActions'
import { types as categoryTypes } from '../actions/categoryActions'
import { types as commentsTypes } from '../actions/commentActions'
import { types as postsTypes    } from '../actions/postActions'

const initialState = {
    user: {
        checked: false,
        authenticated: false,
    },
    categories: {
        loaded: false,
    },
    comments: {
        loaded: false,
    },
    posts: {
        loaded: false,
    },
}

const statusReducer = produce((state = initialState, action) => {
    switch (action.type) {

        case userTypes.SET_CREDENTIAL:
            state.user.checked = true
            state.user.authenticated = true
            break

        case userTypes.LOGOUT:
            state.user.checked = true
            state.user.authenticated = false
            break

        case categoryTypes.CATEGORY_GET_ALL_SUCCESS:
            state.categories.loaded = true
            break

        case commentsTypes.COMMENT_GET_ALL_SUCCESS:
            state.comments.loaded = true
            break

        case postsTypes.POST_GET_ALL_SUCCESS:
            state.posts.loaded = true
            break

        default:
            break
    }

    return state
})

export default statusReducer;