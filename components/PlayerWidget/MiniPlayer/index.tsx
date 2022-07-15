import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { playAndPauseSound } from "../../../store/actions/musicPlayer.action";
import styles from './styles';
import { withTiming } from "react-native-reanimated";
import * as Progress from 'react-native-progress';

const MiniPlayer = ({sharedValue} : any) => {
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
                    <Image source={{uri: "https://static.vecteezy.com/system/resources/previews/003/484/892/original/neon-music-note-on-the-brick-wall-eps-10-illustration-vector.jpg"}}  style={styles.image} />
                    <View style={styles.rightContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.title}>{songs[currentAudioIndex].name}</Text>
                            <Text style={styles.artist}>{songs[currentAudioIndex].authors}</Text>
                        </View>
                        <View style={styles.iconsContainer}>
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