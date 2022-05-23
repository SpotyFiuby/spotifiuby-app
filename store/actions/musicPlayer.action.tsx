import { Audio } from "expo-av";

export const SET_PLAYING = "SET_PLAYING"
export const NEW_SONG = "NEW_SONG"
export const PAUSE_SONG = "PAUSE_SONG"
export const RESUME_SONG = "RESUME_SONG"
export const UPDATE_PLAYBACK = "UPDATE_PLAYBACK"

export const playSound = (sound, play, song) => {
  return async (dispatch) => {
    if (sound === null) {
      const playb = new Audio.Sound();
      const status = await playb.loadAsync(song, {shouldPlay: true})
      playb.setOnPlaybackStatusUpdate((playbackStatus) => {
        dispatch({
          type: UPDATE_PLAYBACK,
          payload: {playbackPosition: playbackStatus.positionMillis, playbackDuration: playbackStatus.durationMillis}
        })
      })
      dispatch({
        type: NEW_SONG,
        payload: {play: playb, sound: status, isPlaying: true}
      })
    } else {
      //pause
      const checkLoading = await play.getStatusAsync();
      if (checkLoading.isLoaded && checkLoading.isPlaying) {
        const status = await play.setStatusAsync({shouldPlay: false})
        dispatch({
          type: PAUSE_SONG,
          payload: {sound: status, isPlaying: false}
        })
      }
      //resume
      if (checkLoading.isLoaded && !checkLoading.isPlaying) {
        const status = await play.playAsync()
        dispatch({
          type: RESUME_SONG,
          payload: {sound: status, isPlaying: true}
        })
      }
    }
  }
}

