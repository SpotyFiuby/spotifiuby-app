import { FOLLOW_ALBUM, UNFOLLOW_ALBUM, FOLLOW_SONG, UNFOLLOW_SONG, SET_FOLLOWS} from "../actions/userFollows.action"

const initialState = {
  likedAlbums: [],
  likedSongs: [],
}



const UserFollowsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW_ALBUM:
          return {
            ...state,
            likedAlbums: [...state.likedAlbums].includes(action.payload.newAlbum) ? [...state.likedAlbums] : [...state.likedAlbums, action.payload.newAlbum],
          }
        case UNFOLLOW_ALBUM:
          return {
            ...state,
            likedAlbums: state.likedAlbums.filter(item => item !== action.payload.album),
          }
        case FOLLOW_SONG:
          return {
            ...state,
            likedSongs: [...state.likedSongs].includes(action.payload.newSong) ? [...state.likedSongs] : [...state.likedSongs, action.payload.newSong],
          }
        case UNFOLLOW_SONG:
          return {
            ...state,
            likedSongs: state.likedSongs.filter(item => item !== action.payload.song),
          }
        case SET_FOLLOWS:
            return {
              ...state,
              likedSongs: action.payload.songs,
              likedAlbums: action.payload.albums
            }

        default: 
            return state
    }
}

export default UserFollowsReducer;