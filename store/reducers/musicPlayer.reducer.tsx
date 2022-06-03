import { ActionSheetIOS } from "react-native"
import SongListItem from "../../components/SongListItem"
import { NEW_SONG, PAUSE_SONG, RESUME_SONG, UPDATE_PLAYBACK, NEXT_SONG, SHOW_PLAYER, SET_SONGS} from "../actions/musicPlayer.action"

const initialState = {
  sound: null,
  isPlaying: false,
  play: null,
  playbackPosition: 0,
  playbackDuration: 0,
  currentAudioIndex: 0,
  showPlayer: false,
  songs: null,
}

const MusicPlayerReducer = (state = initialState, action) => {
    switch(action.type) {
        case NEW_SONG:
          return {
            ...state,
            play: action.payload.play,
            sound: action.payload.sound,
            isPlaying: action.payload.isPlaying,
            song: action.payload.songs,
          }
        case PAUSE_SONG:
          return {
            ...state,
            sound: action.payload.sound,
            isPlaying: action.payload.isPlaying
          }
        case RESUME_SONG:
          return {
            ...state,
            sound: action.payload.sound,
            isPlaying: action.payload.isPlaying
          }
        case UPDATE_PLAYBACK:
          return {
            ...state,
            playbackPosition: action.payload.playbackPosition,
            playbackDuration: action.payload.playbackDuration
          }
        case NEXT_SONG:
          return {
            ...state,
            play: action.payload.play,
            sound: action.payload.sound,
            isPlaying: action.payload.isPlaying,
            currentAudioIndex: action.payload.currentAudioIndex,
          }
        case SHOW_PLAYER:
          return {
            ...state,
            showPlayer: action.payload.show,
            songs: action.payload.songs,
            currentAudioIndex: action.payload.currentIndex,
          }
        

        default: 
            return state
    }
}

export default MusicPlayerReducer;