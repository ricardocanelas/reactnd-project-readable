export const types = {
    SET_CREDENTIAL: '[user] SET CREDENTIAL',
    LOGOUT: '[user] LOGOUT',
}

export const actions = {
    setCredential: (user) => ({
        type: types.SET_CREDENTIAL,
        payload: user
    }),

    logout: () => ({
        type: types.LOGOUT
    })
}

export default {
    /**
     * setUser
     * @param {object} user - The title of the book
     * @param {string} user.uid - The uid of the user
     * @param {string} user.email - The email of the user
     */
    setCredential(user = null) {
        if (user === null) {
            return actions.logout()
        }

        return actions.setCredential({ uid: user.uid, email: user.email })
    },

    /**
     * logout
     */
    logout: () => actions.logout()
}