import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const ProfileSliderComponent = (props: any) => {
    
    const navigation = useNavigation();
    const user = useSelector(state => state.user)

    const onPress = () => {
        if (props.profile.id !== user.userId)
            navigation.navigate('ProfileViewerScreen', { userId: props.profile.id });
        else 
            navigation.navigate('EditProfile');

    }
    const profileImage = props.profile.profileImage;
    const profileName = props.profile.firstName + ' ' + props.profile.lastName;
    
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <Image source={{uri: 
                    profileImage ? profileImage : "https://cdn0.iconfinder.com/data/icons/body-parts-glyph-silhouettes/300/161845119Untitled-3-512.png"
                    }} style={styles.image}/>
                <Text style={styles.text}>{profileName}</Text>
            </View>
        </TouchableWithoutFeedback>
        
    )
    
}

export default ProfileSliderComponent;