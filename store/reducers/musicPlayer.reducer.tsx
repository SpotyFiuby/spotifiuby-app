import { NEW_SONG, PAUSE_SONG, RESUME_SONG, UPDATE_PLAYBACK, NEXT_SONG } from "../actions/musicPlayer.action"

const initialState = {
  sound: null,
  isPlaying: false,
  play: null,
  playbackPosition: 0,
  playbackDuration: 0,
  currentAudioIndex: 0,
}

const MusicPlayerReducer = (state = initialState, action) => {
    switch(action.type) {
        case NEW_SONG:
          return {
            ...state,
            play: action.payload.play,
            sound: action.payload.sound,
            isPlaying: action.payload.isPlaying
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
        default: 
            return state
    }
}

export default MusicPlayerReducer;