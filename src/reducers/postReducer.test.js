import postReducer from './postReducer'
import { types } from '../actions/postActions'

describe('Post Reducer', () => {

    it('has a default status', () => {
        const action = { type: 'unexpected'}
        expect(postReducer(undefined, action).all).toEqual({})
    })

    it('can handle POST_GET_ALL_SUCCESS', () => {
        const action = {
            type: types.POST_GET_ALL_SUCCESS,
            payload: {
                "a1": { id: "a1"}
            }
        }

        expect(postReducer(undefined, action).all).toEqual({
            "a1": { id: "a1"}
        })
    })


    it('can handle POST_SET_CURRENT', () => {
        const currentState = {
            all: {},
            current: undefined,
            currentHasDeleted: false,
            currentNotFound: false,
        }
        const action = {
            type: types.POST_SET_CURRENT,
            payload: "b1"
        }

        expect(postReducer(currentState, action).currentNotFound).toEqual(true)
        expect(postReducer(currentState, action).current).toEqual('b1')
    })

})