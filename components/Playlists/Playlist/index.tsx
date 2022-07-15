import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';


const PlaylistComponent = (props) => {
    
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('PlaylistScreen', { playlist: props.album });  // navigation.navigate('AlbumScreen', { album: props.album });
    }

    
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <Image source={{uri: "https://static.vecteezy.com/system/resources/previews/002/990/653/non_2x/neon-line-cd-or-dvd-disk-icon-isolated-on-brick-wall-background-vector.jpg"}} style={styles.image}/>
                <Text style={styles.text}>{props.album.title}</Text>
            </View>
        </TouchableWithoutFeedback>
        
    )
    
}

export default PlaylistComponent;