import React from "react";
import { View, Text, FlatList } from 'react-native';
import { Album } from "../../types";
import AlbumComponent from "../Album";
import styles from "./styles"



const AlbumCategory = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <FlatList
                data={props.albums}
                renderItem={({item}) => <AlbumComponent album={item}/>}
                keyExtractor={(item)=> item.id}
                showsHorizontalScrollIndicator={false}
                horizontal
            />
        </View>
    )
}

export default AlbumCategory;