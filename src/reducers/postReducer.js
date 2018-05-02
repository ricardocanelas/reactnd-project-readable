// External Depedencies
import produce from 'immer'

// Our Depedencies
import { types } from '../actions/postActions'

const initialState = {
    all: {},
    current: undefined,
    currentHasDeleted: false,
    currentNotFound: false,
    filterBy: { field: 'category', value: 'all' },
    sortBy: { field: 'created_at', order: 'desc' },
}

const categoryReducer = produce((state = initialState, action) => {
    switch (action.type) {

        case types.POST_GET_ALL_SUCCESS:
            state.all = action.payload
            break

        case types.POST_SAVE_SUCCESS:
            if (!!!state.all) state.all = {}
            state.all[action.payload.id] = action.payload
            break

        case types.POST_DELETE_SUCCESS:
            delete state.all[action.payload.id]
            if (state.current === action.payload.id) {
                state.current = undefined
                state.currentHasDeleted = true
                state.currentNotFound = true
            } else {
                state.currentHasDeleted = false
            }
            break

        case types.POST_SET_CURRENT:
            state.current = action.payload
            state.currentHasDeleted = false
            if (action.payload) {
                state.currentNotFound = state.all ? (state.all[action.payload] ? false : true) : false
            } else {
                state.current = undefined
                state.currentNotFound = false
            }
            break

        case types.POST_CHANGE_FILTER_REQUEST:
            state.filterBy = action.payload
            break

        case types.POST_CHANGE_SORT_REQUEST:
            state.sortBy = action.payload
            break

        default:
            break
    }

    return state
})

export default categoryReducer;