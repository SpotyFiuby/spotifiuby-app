import React from "react";
import { Text, Image, View, TouchableWithoutFeedback } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { withTiming } from "react-native-reanimated";

import styles from './styles';

const song = {
    id: '1',
    imageUri: 'https://www.conmebol.com/wp-content/uploads/2019/11/palmera2.jpg',
    title: 'Sabalero',
    artist: 'Los palmeras'
}


const MiniPlayer = ({sharedValue}) => {
    
    const handleOnPress = () => {
        sharedValue.value = withTiming(0,{
            duration: 500,
        })
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={handleOnPress}>
                <View style={styles.container}>
                    <Image source={{uri: song.imageUri}}  style={styles.image} />
                    <View style={styles.rightContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.title}>{song.title}</Text>
                            <Text style={styles.artist}>{song.artist}</Text>
                        </View>
                        <View style={styles.iconsContainer}>
                            <AntDesign name='hearto' size={30} color={"white"}/>
                            <FontAwesome5 name='play' size={30} color={"white"}/>
                        </View>  
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
        </View>
        
    )
}

export default MiniPlayer;