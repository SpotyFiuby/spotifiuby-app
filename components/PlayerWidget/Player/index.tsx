import React from "react";
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";
import {
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import Layout from "../../../constants/Layout";
import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";




const Player = ({sharedValue} ) => {

  const mainContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: sharedValue.value,
        }
      ]
    }
  })



  const handleClosePlayerScreen = () => {
    sharedValue.value = withTiming(Layout.window.height,{
      duration: 500,
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
          <Image source={{uri: "https://www.conmebol.com/wp-content/uploads/2019/11/palmera2.jpg"}} style={styles.cover}/>
          <View style={styles.metadata}>
            <View>
              <Text style={styles.song}>Sabalero</Text>
              <Text style={styles.artist}>Los Palmeras</Text>
            </View>
            <AntDesign name='hearto' size={24} color={"white"}/>
          </View>
          <View style={styles.slider} />
          <View style={styles.controls}>
            <Entypo name="shuffle" size={24} color="white" />
            <AntDesign name="stepbackward" color="white" size={32} />
            <AntDesign name="play" color="white" size={48} />
            <AntDesign name="stepforward" color="white" size={32} />
            <Feather name="repeat" size={24} color="white" />
          </View>

        </View>
        
        
        
      </Animated.View>
  ); 
};

export default Player;