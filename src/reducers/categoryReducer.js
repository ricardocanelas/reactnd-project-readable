// External Depedencies
import produce from 'immer'

// Our Depedencies
import { types } from '../actions/categoryActions'

const initialState = {
    all: {}
}

const categoryReducer = produce((state = initialState, action) => {
    switch (action.type) {

        case types.CATEGORY_GET_ALL_SUCCESS:
            state.all = action.payload
            break

        default:
            break
    }

    return state
})

export default categoryReducer;