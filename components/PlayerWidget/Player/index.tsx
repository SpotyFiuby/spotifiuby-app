import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";
import { AntDesign, Entypo } from '@expo/vector-icons'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, {  } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../../constants/Layout";
import { LinearGradient } from "expo-linear-gradient";
import Slider from '@react-native-community/slider';
import { playNextorPrev, playAndPauseSound } from "../../../store/actions/musicPlayer.action";
import styles from "./styles";



const millisToMinutesAndSeconds = (millis: number) => {
  if (millis === null || millis === undefined || millis !== millis)
    return ""

  const sec = Math.floor(millis / 1000) % 60;
  var min = Math.floor(millis / 60000);
  return min + ":" + (sec < 10 ? '0' : '') + sec;
}


const Player = ({sharedValue} : any) => {
  const dispatch = useDispatch()
  const sound = useSelector(state => state.musicPlayer.sound)
  const isPlaying = useSelector(state => state.musicPlayer.isPlaying)
  const play = useSelector(state => state.musicPlayer.play)
  const playbackPosition = useSelector(state => state.musicPlayer.playbackPosition)
  const playbackDuration = useSelector(state => state.musicPlayer.playbackDuration)
  const currentAudioIndex = useSelector(state => state.musicPlayer.currentAudioIndex)
  const songs = useSelector(state => state.musicPlayer.songs)

  const handleOnPress = () => {
    dispatch(playAndPauseSound(sound, play, songs, currentAudioIndex))
  }

  const mainContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: sharedValue.value,
        }
      ]
    }
  })

  const calculateSlider = () => {
    if (playbackDuration !== undefined && playbackDuration !== null && playbackPosition !== undefined && playbackPosition !== null) {
      if(playbackDuration !== 0)
        return (playbackPosition / playbackDuration)
    }
    
    return 0
  }

  const handleClosePlayerScreen = () => {
    sharedValue.value = withTiming(Layout.window.height, {
      duration: 500
    })
  }


  const handleNextorPrev = (next) => {
     dispatch(playNextorPrev(sound, play, songs, currentAudioIndex, next))
  }



  return (

      <Animated.View style={[styles.mainContainer, mainContainerAnimatedStyle]}>
      <LinearGradient
        colors={["#252850", "#191414"]}
        style={StyleSheet.absoluteFill}
        />

      {
        songs ? 
        songs[currentAudioIndex] ?
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClosePlayerScreen}>
              <AntDesign name="down" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>{songs? songs[currentAudioIndex].name : ""}</Text>
            <Entypo name="dots-three-horizontal" size={24} color="white" />
          </View>
          <View style={styles.imageContainer}>
            <Image source={{uri: "https://static.vecteezy.com/system/resources/previews/003/484/892/original/neon-music-note-on-the-brick-wall-eps-10-illustration-vector.jpg"}} style={styles.cover}/>
          </View>
          <View style={styles.metadata}>
            <View>
              <Text style={styles.song}>{songs? songs[currentAudioIndex].name : ""}</Text>
              <Text style={styles.artist}>{songs? songs[currentAudioIndex].authors : ""}</Text>
            </View>
          </View>
          <Slider
              style ={styles.slider}
              value={calculateSlider()}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              disabled={true}
              
            />
          <View style={styles.progressLevelDuration}>
              <Text style={styles.progressLabelText}>{millisToMinutesAndSeconds(playbackPosition)}</Text>
              <Text style={styles.progressLabelText}>{millisToMinutesAndSeconds(playbackDuration - playbackPosition)}</Text>
          </View>
          <View style={styles.controls}>
            
            
            <TouchableOpacity onPress={() => handleNextorPrev(false)}>
              <AntDesign name="stepbackward" color="white" size={32} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleOnPress}>
              <AntDesign name={isPlaying ? 'pause' : 'play'} color="white" size={48} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNextorPrev(true)}>
              <AntDesign name="stepforward" color="white" size={32}/>
            </TouchableOpacity>
            
            
          </View>

        </View> : null : null
      }

        
        
        
      </Animated.View>
  ); 
};

export default Player;