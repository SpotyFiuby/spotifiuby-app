import React from "react";
import { View, Text, FlatList } from 'react-native';
import { Album } from "../../types";
import AlbumComponent from "../Album";
import styles from "./styles"



const AlbumCategory = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {
                props.albums.length > 0?
                <FlatList
                    data={props.albums}
                    renderItem={({item}) => <AlbumComponent album={item}/>}
                    keyExtractor={(item)=> item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />:
                <Text style={styles.text}>No albums found</Text>
            }
        </View>
    )
}

export default AlbumCategory;