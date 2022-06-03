import { Audio } from "expo-av";
import { isLoaded } from "expo-font";

export const SET_PLAYING = "SET_PLAYING"
export const NEW_SONG = "NEW_SONG"
export const PAUSE_SONG = "PAUSE_SONG"
export const RESUME_SONG = "RESUME_SONG"
export const UPDATE_PLAYBACK = "UPDATE_PLAYBACK"
export const NEXT_SONG = "NEXT_SONG"
export const SHOW_PLAYER = "SHOW_PLAYER"
export const SET_SONGS = "SET_SONGS"


export const newSound = (sound, play, songs, currentAudioIndex) => {
  return async (dispatch) => {
    if (sound === null) {
      const playb = new Audio.Sound();
      const status = await playb.loadAsync({uri: songs[currentAudioIndex].mp3}, {shouldPlay: true})
      playb.setOnPlaybackStatusUpdate(async (playbackStatus) => {

        if(playbackStatus.didJustFinish) {   
          const {status, index} = await _playNextOrPrev(sound,playb,songs,currentAudioIndex, true)
        
          dispatch({
            type: NEXT_SONG,
            payload: {play: playb, sound: status, isPlaying: true, playbackPosition: 0, playbackDuration: 0, currentAudioIndex: index}
            })
        }
        else {
          dispatch({
            type: UPDATE_PLAYBACK,
            payload: {playbackPosition: playbackStatus.positionMillis, playbackDuration: playbackStatus.durationMillis}
          })
        }

      })
      dispatch({
        type: NEW_SONG,
        payload: {play: playb, sound: status, isPlaying: true, songs: songs},
      })
    } 
    else {
      const checkLoading = await play.getStatusAsync();
      if (checkLoading.isLoaded) {
        play.stopAsync()
        play.unloadAsync()
        let status 
        status = await play.loadAsync({uri: songs[currentAudioIndex].mp3}, {shouldPlay: true})
        dispatch({
          type: NEXT_SONG,
          payload: {play: play, sound: status, isPlaying: true, playbackPosition: 0, playbackDuration: 0, currentAudioIndex: currentAudioIndex}
        })
      }
    }
    
  }
}

export const playAndPauseSound = (sound, play, songs, currentAudioIndex) => {
  return async (dispatch) => {
    if (sound != null) {
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
      if (!checkLoading.isLoaded){
        let status 
        status = await play.loadAsync({uri: songs[currentAudioIndex].mp3}, {shouldPlay: true})
        dispatch({
          type: NEXT_SONG,
          payload: {play: play, sound: status, isPlaying: true, playbackPosition: 0, playbackDuration: 0, currentAudioIndex: currentAudioIndex}
        })
        
      }
      
    }
  }
}

// If next = true the next audio is played
// If next = false the previous audio is played
export const playNextorPrev = (sound, play, songs, currentAudioIndex, next) => {

  return async(dispatch) => {

      
      if (sound != null) {

        const {status, index} = await _playNextOrPrev(sound,play,songs,currentAudioIndex, next)
        
        dispatch({
          type: NEXT_SONG,
          payload: {play: play, sound: status, isPlaying: true, playbackPosition: 0, playbackDuration: 0, currentAudioIndex: index}
          })
      }
    }
}

const _playNextOrPrev = async (sound, play, songs, currentAudioIndex, next) => {

  let newIndex 

  if (next){
    newIndex = currentAudioIndex + 1
    if (newIndex === songs.length)
      newIndex = 0
  }
  else {
    newIndex = currentAudioIndex - 1
    if (newIndex < 0)
      newIndex = songs.length - 1
  }

  const checkLoading = await play.getStatusAsync();

  
  let index = currentAudioIndex
  let status

  if (!checkLoading.isLoaded){
    status = await play.loadAsync({uri: songs[newIndex].mp3}, {shouldPlay: true})
    index = newIndex
  }
  
  if (checkLoading.isLoaded){
    play.stopAsync()
    play.unloadAsync()
    status = await play.loadAsync({uri: songs[newIndex].mp3}, {shouldPlay: true})
    index = newIndex
  }

  return {status, index}
}

export const showPlayer = (show, songs, index) => ({
  type:SHOW_PLAYER,
  payload: {show: show, songs: songs, currentIndex: index},
})


  
  

