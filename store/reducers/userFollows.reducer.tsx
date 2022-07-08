import { FOLLOW_ALBUM, UNFOLLOW_ALBUM, FOLLOW_SONG, UNFOLLOW_SONG, SET_FOLLOWS, FOLLOW_ARTIST, UNFOLLOW_ARTIST} from "../actions/userFollows.action"

const initialState = {
  likedAlbums: [],
  likedSongs: [],
  followedArtists: [],
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
        case FOLLOW_ARTIST:
          return {
            ...state,
            followedArtists: [...state.followedArtists].includes(action.payload.newArtist) ? [...state.followedArtists] : [...state.followedArtists, action.payload.newArtist],
          }
        case UNFOLLOW_ARTIST:
          return {
            ...state,
            followedArtists: state.followedArtists.filter(item => item !== action.payload.artist),
          }
        case SET_FOLLOWS:
            return {
              ...state,
              likedSongs: action.payload.songs,
              likedAlbums: action.payload.albums,
              followedArtists:  action.payload.artists,
            }

        default: 
            return state
    }
}

export default UserFollowsReducer;