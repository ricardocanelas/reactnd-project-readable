import {createSelector} from "reselect";

const notificationsSelector = state => state.notifications;

const getNotifications = createSelector(
    notificationsSelector,
    notifications => {
        return Object.keys(notifications).map(key => notifications[key])
    }
);

export {
    getNotifications
}