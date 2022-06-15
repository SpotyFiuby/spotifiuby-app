import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import { Album } from '../../types';
import { useNavigation } from '@react-navigation/native';


const AlbumComponent = (props) => {
    
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('AlbumScreen', { album: props.album });
    }

    
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <Image source={{uri: "http://cdn.shopify.com/s/files/1/0481/9596/0985/products/Firingvinylrecordneonsign.jpg?v=1620971781"}} style={styles.image}/>
                <Text style={styles.text}>{props.album.description}</Text>
            </View>
        </TouchableWithoutFeedback>
        
    )
    
}

export default AlbumComponent;