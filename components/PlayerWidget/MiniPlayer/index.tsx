import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { playSound } from "../../../store/actions/musicPlayer.action";
import styles from './styles';
import { withTiming } from "react-native-reanimated";
import Slider from "@react-native-community/slider";
import * as Progress from 'react-native-progress';

const song = require('../../../assets/songs/LosPalmeras.mp3')

const songInfo = {
  id: '1',
  imageUri: 'https://www.conmebol.com/wp-content/uploads/2019/11/palmera2.jpg',
  title: 'Sabalero',
  artist: 'Los palmeras'
}

const MiniPlayer = ({sharedValue}) => {
  const dispatch = useDispatch()
  const sound = useSelector(state => state.musicPlayer.sound)
  const isPlaying = useSelector(state => state.musicPlayer.isPlaying)
  const play = useSelector(state => state.musicPlayer.play)
    
    const handleOnPress = () => {
        sharedValue.value = withTiming(0,{
            duration: 500,
        })
    }

    const handleOnPressSong = () => {
      dispatch(playSound(sound, play, song))
    }

    const playbackPosition = useSelector(state => state.musicPlayer.playbackPosition)
    const playbackDuration = useSelector(state => state.musicPlayer.playbackDuration)

    const calculateSlider = () => {
        if(playbackDuration !== 0)
          return (playbackPosition / playbackDuration)
        return 0
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
                    <Image source={{uri: songInfo.imageUri}}  style={styles.image} />
                    <View style={styles.rightContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.title}>{songInfo.title}</Text>
                            <Text style={styles.artist}>{songInfo.artist}</Text>
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