import React from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import navigation from "../../navigation";
import AlbumComponent from "../Album";
import styles from "./styles"
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { white } from "react-native-paper/lib/typescript/styles/colors";




const PlaylistCategory = (props) => {
    const navigation = useNavigation();
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
                <Text style={styles.text}>You don't have playlists yet.</Text>
            }
            <View>  
                <TouchableOpacity style={styles.createPlaylistButton}  onPress={() => { navigation.navigate('NewPlaylist');}}>
                    <Text style={{color: "white"}}>Create new Playlist  </Text>
                    <SimpleLineIcons name="playlist" size={24} color="white" />
                </TouchableOpacity>
                <View style={{marginBottom: 150}}></View>
            </View>
        </View>
    )
}

export default PlaylistCategory;