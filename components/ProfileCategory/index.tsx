import React from "react";
import { View, Text, FlatList } from 'react-native';
import ProfileSlider from "../ProfileSlider";
import styles from "./styles"



const ProfileCategory = (props: any) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {
                props.profiles.length > 0?
                <FlatList
                    data={props.profiles}
                    renderItem={({item}) => <ProfileSlider profile={item}/>}
                    keyExtractor={(item)=> item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />:
                <Text style={styles.text}>{`No ${props.title} found`}</Text>
            }
        </View>
    )
}

export default ProfileCategory;