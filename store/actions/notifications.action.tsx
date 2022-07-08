export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS"
export const ADD_NOTIFICATION = "ADD_NOTIFICATION"
export const UNRREAD_NOTIFICATION = "UNRREAD_NOTIFICATION"
export const ALL_NOTIFICATIONS_READ = "ALL_NOTIFICATIONS_READ"

export const setNotifications = (notifications: Notification[]) => ({
    type: SET_NOTIFICATIONS,
    payload: notifications,
});

export const addNotifications = (notification: Notification) => ({
    type: ADD_NOTIFICATION,
    payload: notification,
});

export const unreadNotifications = () => ({
    type: UNRREAD_NOTIFICATION,
});

export const allNotificationsReaded = () => ({
    type: ALL_NOTIFICATIONS_READ,
});


