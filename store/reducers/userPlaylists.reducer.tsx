import { UPDATE_PLAYLIST} from "../actions/userPlaylists.action"

const initialState = {
  playlists: [],
  changes: true,
}



const UserPlaylistsReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_PLAYLIST:
          return {
            ...state,
            changes: !(state.changes),
          }
        default: 
            return state
    }
}

export default UserPlaylistsReducer;