export const types = {
    NOTIFICATION_SHOW: "[notification ] SHOW",
    NOTIFICATION_DISMISS: "[notification ] DISMISS",
    NOTIFICATION_CLEAR: "[notification ] CLEAR"
}

export const notificationType = {
    SUCCESS : "SUCCESS",
    INFO : "INFO",
    WARNING : "WARNING",
    ERROR : "ERROR",
}

export default {
    showNotification(options) {
        return (dispatch) => {
            const { message = "" } = options;
            const { header = "" } = options;
            const { type = notificationType.INFO } = options;
            const { id = Date.now() } = options;
            const { dismissAfter = 5000 } = options;

            dispatch({ type: types.NOTIFICATION_SHOW, payload: { message, header, type, id } });

            setTimeout(() => {
                dispatch(this.dismissNotification(id));
            }, dismissAfter);
        }
    },

    dismissNotification(id) {
        return {
            type: types.NOTIFICATION_DISMISS,
            payload: { id }
        }
    },

    clearAllNotifications() {
        return {
            type: types.NOTIFICATION_CLEAR
        }
    }
}