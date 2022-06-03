import { applyMiddleware, combineReducers, createStore } from "redux";

import AuthReducer from "./reducers/auth.reducer";
import MusicPlayerReducer from "./reducers/musicPlayer.reducer";
import thunk from "redux-thunk";
import UserReducer from "./reducers/user.reducer";

const RootReducer = combineReducers({
    auth: AuthReducer,
    musicPlayer: MusicPlayerReducer,
    user: UserReducer
})

export default createStore(RootReducer, applyMiddleware(thunk));