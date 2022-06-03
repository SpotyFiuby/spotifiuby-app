import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { playAndPauseSound, playSound } from "../../../store/actions/musicPlayer.action";
import styles from './styles';
import { withTiming } from "react-native-reanimated";
import Slider from "@react-native-community/slider";
import * as Progress from 'react-native-progress';

const MiniPlayer = ({sharedValue}) => {
  const dispatch = useDispatch()
  const sound = useSelector(state => state.musicPlayer.sound)
  const isPlaying = useSelector(state => state.musicPlayer.isPlaying)
  const play = useSelector(state => state.musicPlayer.play)
  const currentAudioIndex = useSelector(state => state.musicPlayer.currentAudioIndex)
  const songs = useSelector(state => state.musicPlayer.songs)
    
  
    const handleOnPress = () => {
        sharedValue.value = withTiming(0,{
            duration: 500,
        })
    }

    const handleOnPressSong = () => {
      dispatch(playAndPauseSound(sound, play, songs, currentAudioIndex))
    }

    const playbackPosition = useSelector(state => state.musicPlayer.playbackPosition)
    const playbackDuration = useSelector(state => state.musicPlayer.playbackDuration)

    const calculateSlider = () => {
        if (playbackDuration !== undefined && playbackDuration !== null && playbackPosition !== undefined && playbackPosition !== null) {
            if(playbackDuration !== 0)
              return (playbackPosition / playbackDuration)
        }
    }

    return (
        <View>
            <View style={styles.sliderContainer}>
                <Progress.Bar
                        width={null}
                        color={"lightgray"}
                        progress={calculateSlider()}
                        style={styles.slider}
                    />
            </View>
                
            <TouchableWithoutFeedback onPress={handleOnPress}>
                <View style={styles.container}>
                    <Image source={{uri: songs[currentAudioIndex].imageUri}}  style={styles.image} />
                    <View style={styles.rightContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.title}>{songs[currentAudioIndex].title}</Text>
                            <Text style={styles.artist}>{songs[currentAudioIndex].artist}</Text>
                        </View>
                        <View style={styles.iconsContainer}>
                            <AntDesign name='hearto' size={30} color={"white"}/>
                            <TouchableOpacity onPress={handleOnPressSong}>
                              <Ionicons name={isPlaying ? 'pause' : 'play'} color="white" size={35} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
                    
            
        </View>
        
    )
}

export default MiniPlayer;