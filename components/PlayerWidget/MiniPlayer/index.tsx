import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { playSound } from "../../../store/actions/musicPlayer.action";
import styles from './styles';
import { withTiming } from "react-native-reanimated";
import Slider from "@react-native-community/slider";
import * as Progress from 'react-native-progress';



const songs = [{
    id: '1',
    imageUri: 'https://www.cmtv.com.ar/tapas-cd/0825697001573678353.jpg',
    title: 'Sabalero',
    artist: 'Los palmeras',
    album: 'Cumbia',
    mp3: require("../../../assets/songs/LosPalmeras.mp3")
  }, {
    id: '2',
    imageUri: 'https://www.elciudadanoweb.com/wp-content/uploads/2019/06/los-palmeras.jpg',
    title: 'El Bombón',
    artist: 'Los palmeras',
    album: 'Cumbia',
    mp3: require("../../../assets/songs/elbombon.mp3")
  }, {
    id: '3',
    imageUri: 'https://i.scdn.co/image/ab67616d0000b273328e973ede81069ff83d552e',
    title: 'Olvídala',
    artist: 'Los palmeras',
    album: 'Cumbia',
    mp3: require("../../../assets/songs/olvidala.mp3")
  },{
    id: '4',
    imageUri: 'https://i1.sndcdn.com/artworks-000135126611-qxj5bq-t500x500.jpg',
    title: 'Lo que Quiere la Chola',
    artist: 'Los palmeras',
    album: 'Cumbia',
    mp3: require("../../../assets/songs/loquequierelachola.mp3")
  }]

const MiniPlayer = ({sharedValue}) => {
  const dispatch = useDispatch()
  const sound = useSelector(state => state.musicPlayer.sound)
  const isPlaying = useSelector(state => state.musicPlayer.isPlaying)
  const play = useSelector(state => state.musicPlayer.play)
  const currentAudioIndex = useSelector(state => state.musicPlayer.currentAudioIndex)
    
    const handleOnPress = () => {
        sharedValue.value = withTiming(0,{
            duration: 500,
        })
    }

    const handleOnPressSong = () => {
      dispatch(playSound(sound, play, songs, currentAudioIndex))
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