import { ADD_NOTIFICATION, ALL_NOTIFICATIONS_READ, SET_NOTIFICATIONS, UNRREAD_NOTIFICATION } from "../actions/notifications.action"

const initialState = {
  notifications: [],
  unreadNotifications: false,
}



const NotificationsReducer = (state = initialState, action: any) => {
    switch(action.type) {

        case SET_NOTIFICATIONS:
            return {
              ...state,
              notifications: action.payload,
            }
            

        case ADD_NOTIFICATION:
            return {
              ...state,
              notifications: [...state.notifications].includes(action.payload) ? [...state.notifications] : [action.payload, ...state.notifications],
            }
          
        case UNRREAD_NOTIFICATION:
            return {
              ...state,
              unreadNotifications: true,
            }
          
        case ALL_NOTIFICATIONS_READ:
          return {
            ...state,
            unreadNotifications: false,
          }

        default: 
            return state
    }
}

export default NotificationsReducer;