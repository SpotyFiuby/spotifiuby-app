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
import { playSound } from "../../../store/actions/musicPlayer.action";
import styles from "./styles";

const songs = [
  {
    url: 'http://example.com/avaritia.mp3', // Load media from the network
    title: 'Avaritia',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork: 'http://example.com/cover.png', // Load artwork from the network
    duration: 402 // Duration in seconds
  },
  {
    url: 'http://example.com/avaritia.mp3', // Load media from the network
    title: 'Coelacanth I',
    artist: 'deadmau5',
    artwork: 'http://example.com/cover.png', // Load artwork from the network
    duration: 166
  },
  {
    url: 'file:///storage/sdcard0/Downloads/artwork.png', // Load media from the file system
    title: 'Ice Age',
    artist: 'deadmau5',
     // Load artwork from the file system:
    artwork: 'file:///storage/sdcard0/Downloads/cover.png',
    duration: 411
  },
]

const millisToMinutesAndSeconds = (millis: number) => {
  const sec = Math.floor(millis / 1000) % 60;
  var min = Math.floor(millis / 60000);
  return min + ":" + (sec < 10 ? '0' : '') + sec;
}

<<<<<<< HEAD
const song = '';
// require('../../../assets/songs/Los_Palmeras_-_Soy_Sabalero_Versi_(getmp3.pro).mp3')
=======
const song = require('../../../assets/songs/LosPalmeras.mp3')
>>>>>>> bfde326f25348a0005532c840b64242570c69cd1

const Player = ({sharedValue} ) => {
  const dispatch = useDispatch()
  const sound = useSelector(state => state.musicPlayer.sound)
  const isPlaying = useSelector(state => state.musicPlayer.isPlaying)
  const play = useSelector(state => state.musicPlayer.play)
  const playbackPosition = useSelector(state => state.musicPlayer.playbackPosition)
  const playbackDuration = useSelector(state => state.musicPlayer.playbackDuration)

  const handleOnPress = () => {
    dispatch(playSound(sound, play, song))
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
    if(playbackDuration !== 0)
      return (playbackPosition / playbackDuration)

    return 0
  }

  const handleClosePlayerScreen = () => {
    sharedValue.value = withTiming(Layout.window.height, {
      duration: 500
    })
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
            <Text style={styles.title}>Los Palmeras</Text>
            <Entypo name="dots-three-horizontal" size={24} color="white" />
          </View>
          <View style={styles.imageContainer}>
            <Image source={{uri: "https://www.conmebol.com/wp-content/uploads/2019/11/palmera2.jpg"}} style={styles.cover}/>
          </View>
          <View style={styles.metadata}>
            <View>
              <Text style={styles.song}>Sabalero</Text>
              <Text style={styles.artist}>Los Palmeras</Text>
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
            <AntDesign name="stepbackward" color="white" size={32} />
            <TouchableOpacity onPress={handleOnPress}>
              <AntDesign name={isPlaying ? 'pause' : 'play'} color="white" size={48} />
            </TouchableOpacity>
            <AntDesign name="stepforward" color="white" size={32} />
            <Feather name="repeat" size={24} color="white" />
          </View>

        </View>
        
        
        
      </Animated.View>
  ); 
};

export default Player;