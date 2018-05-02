// External Depedencies
import produce from 'immer'

// Our Depedencies
import { types } from "../actions/notificationActions";

const initialState = {
    // exampleA: {
    //     id: "exampleA",
    //     header: 'Saved',
    //     message: 'The post [React is a good framework] has saved with success',
    //     type: 'SUCCESS'
    // }
};

const notificationReducer = produce((state = initialState, action) => {
    switch (action.type) {

        case types.NOTIFICATION_SHOW:
            state[action.payload.id] = action.payload
            break

        case types.NOTIFICATION_DISMISS:
            delete state[action.payload.id]
            break

        case types.NOTIFICATION_CLEAR:
            state = []
            break

        default:
            break
    }

    return state
})

export default notificationReducer;