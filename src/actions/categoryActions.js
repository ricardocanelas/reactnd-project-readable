export const types = {
    CATEGORY_GET_ALL_REQUEST: '[category] GET_ALL_REQUEST',
    CATEGORY_GET_ALL_SUCCESS: '[category] GET_ALL_SUCCESS',
    CATEGORY_GET_ALL_FAILURE: '[category] GET_ALL_FAILURE',
}

export const actions = {
    getAllRequest: () => ({type: types.CATEGORY_GET_ALL_REQUEST}),
    getAllSuccess: (categories) => ({type: types.CATEGORY_GET_ALL_SUCCESS, payload: categories}),
    getAllFailure: (error) => ({ type: types.CATEGORY_GET_ALL_FAILURE, payload: error }),
}

export default {
    private_actions: actions
}