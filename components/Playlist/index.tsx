import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import { Album } from '../../types';
import { useNavigation } from '@react-navigation/native';


const PlaylistComponent = (props) => {
    
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('AlbumScreen', { album: props.album });
    }

    
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <Image source={{uri: props.album.cover}} style={styles.image}/>
                <Text style={styles.text}>{props.album.title}</Text>
            </View>
        </TouchableWithoutFeedback>
        
    )
    
}

export default AlbumComponent;