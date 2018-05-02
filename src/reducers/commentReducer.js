// External Depedencies
import produce from 'immer'

// Our Depedencies
import { types } from '../actions/commentActions'

const initialState = {
    all: {}
}

const commentReducer = produce((state = initialState, action) => {
    switch (action.type) {

        case types.COMMENT_GET_ALL_SUCCESS:
            state.all = action.payload
            break

        case types.COMMENT_SAVE_SUCCESS:
            if (!!!state.all) state.all = {}
            state.all[action.payload.id] = action.payload
            break

        case types.COMMENT_DELETE_SUCCESS:
            delete state.all[action.payload.id]
            break

        default:
            break
    }

    return state
})

export default commentReducer;