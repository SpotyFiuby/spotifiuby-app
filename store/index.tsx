import { applyMiddleware, combineReducers, createStore } from "redux";

import AuthReducer from "./reducers/auth.reducer";
import MusicPlayerReducer from "./reducers/musicPlayer.reducer";
import thunk from "redux-thunk";

const RootReducer = combineReducers({
    auth: AuthReducer,
    musicPlayer: MusicPlayerReducer
})

export default createStore(RootReducer, applyMiddleware(thunk));