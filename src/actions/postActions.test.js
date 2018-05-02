import actions, { types } from './postActions'

describe('Post Actions', () => {
    it('has an action to add post', () => {
        const post = { id: '01', title: 'My post' }
        const expectedAction = {
            type: types.POST_SAVE_SUCCESS,
            payload: post,
        };

        expect(actions.private_actions.saveSuccess(post)).toEqual(expectedAction)
    })
})
