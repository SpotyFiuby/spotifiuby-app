import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const AlbumComponent = (props) => {
    
    const navigation = useNavigation();
    const user = useSelector(state => state.user)

    const onPress = () => {
        props.album.premium  && !user.isPremium ? 
        (
            Alert.alert(
                "This is a PREMIUM album",
                "Upgrade to premium to unlock it",
                [
                    
                  {
                    text: "Go",
                    onPress: () => {
                        return navigation.navigate('Premium');
                    },
                    style: "default",
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                  }
                ],
                {
                  cancelable: true,
                }
              )
        ) :
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