import {
  SET_FIRSTNAME,
  SET_LASTNAME,
  SET_USERNAME,
  SET_PROFILEIMAGE,
  SET_LOCATION,
  SET_PHONE,
  SET_BIO,
  SET_EMAIL,
  SET_ISPREMIUM,
  SET_TOKEN,
  SET_USERID,
  SET_USERFIELDS,
  SET_ISARTIST
} from "../actions/user.action"

const initialState = {
    firstName: "",
    lastName: "",
    profileImage: "https://cdn0.iconfinder.com/data/icons/body-parts-glyph-silhouettes/300/161845119Untitled-3-512.png",
    username: "@johndoe",
    location: "No location",
    phone: "",
    bio: "",
    email: "",
    userId: undefined,
    isPremium: false,
    isArtist: false,
}

const UserReducer = (state = initialState, action: { type: any; payload: any }) => {
    switch(action.type) {
        case SET_USERFIELDS:
          return {
            ...state,
            ...action.payload
          }
        case SET_FIRSTNAME:
          return {
            ...state,
            firstName: action.payload
          }
        case SET_LASTNAME:
          return {
            ...state,
            lastName: action.payload
          }
        case SET_USERNAME:
          return {
            ...state,
            username: action.payload
          }
        case SET_PROFILEIMAGE:
          return {
            ...state,
            profileImage: action.payload
          }
        case SET_LOCATION:
          return {
            ...state,
            location: action.payload
          }
        case SET_PHONE:
          return {
            ...state,
            phone: action.payload
          }
        case SET_BIO:
          return {
            ...state,
            bio: action.payload
          }
        case SET_EMAIL:
          return {
            ...state,
            email: action.payload
          }
        case SET_ISPREMIUM:
          return {
            ...state,
            isPremium: action.payload
          }
        case SET_TOKEN:
          return {
            ...state,
            token: action.payload
          }
        case SET_USERID:
          return {
            ...state,
            userId: action.payload
          }
        case SET_ISARTIST:
          return {
            ...state,
            isArtist: action.payload
          }
        default: 
            return state
    }
}

export default UserReducer;