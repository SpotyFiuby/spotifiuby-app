import { SET_CURRENT_USER } from "../actions/auth.action"

const initialState = {
    currentUser: null,
}

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }

        default: 
            return state
    }
}

export default AuthReducer;