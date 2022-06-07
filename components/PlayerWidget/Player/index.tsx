import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";
import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Audio } from "expo-av";
import Layout from "../../../constants/Layout";
import { LinearGradient } from "expo-linear-gradient";
import Slider from '@react-native-community/slider';
import { playSound, playNextorPrev, playAndPauseSound } from "../../../store/actions/musicPlayer.action";
import styles from "./styles";



const millisToMinutesAndSeconds = (millis: number) => {
  if (millis === null || millis === undefined || millis !== millis)
    return ""

  const sec = Math.floor(millis / 1000) % 60;
  var min = Math.floor(millis / 60000);
  return min + ":" + (sec < 10 ? '0' : '') + sec;
}


const Player = ({sharedValue} ) => {
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
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClosePlayerScreen}>
              <AntDesign name="down" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>{songs[currentAudioIndex].album}</Text>
            <Entypo name="dots-three-horizontal" size={24} color="white" />
          </View>
          <View style={styles.imageContainer}>
            <Image source={{uri: songs[currentAudioIndex].imageUri}} style={styles.cover}/>
          </View>
          <View style={styles.metadata}>
            <View>
              <Text style={styles.song}>{songs[currentAudioIndex].title}</Text>
              <Text style={styles.artist}>{songs[0].artist}</Text>
            </View>
            <AntDesign name='hearto' size={24} color={"white"}/>
          </View>
          <Slider
              style ={styles.slider}
              value={calculateSlider()}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onSlidingComplete={()=>{}}
            />
          <View style={styles.progressLevelDuration}>
              <Text style={styles.progressLabelText}>{millisToMinutesAndSeconds(playbackPosition)}</Text>
              <Text style={styles.progressLabelText}>{millisToMinutesAndSeconds(playbackDuration - playbackPosition)}</Text>
          </View>
          <View style={styles.controls}>
            <Entypo name="shuffle" size={24} color="white" />
            
            <TouchableOpacity onPress={() => handleNextorPrev(false)}>
              <AntDesign name="stepbackward" color="white" size={32} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleOnPress}>
              <AntDesign name={isPlaying ? 'pause' : 'play'} color="white" size={48} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNextorPrev(true)}>
              <AntDesign name="stepforward" color="white" size={32}/>
            </TouchableOpacity>
            
            <Feather name="repeat" size={24} color="white" />
          </View>

        </View>
        
        
        
      </Animated.View>
  ); 
};

export default Player;