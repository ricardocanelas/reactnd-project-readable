import { types } from '../actions/userActions'

const initialState = {
    uid: '',
    email: ''
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_CREDENTIAL:
            return { ...action.payload }

        case types.LOGOUT:
            return { ...initialState }

        default:
            return state
    }
}

export default userReducer;