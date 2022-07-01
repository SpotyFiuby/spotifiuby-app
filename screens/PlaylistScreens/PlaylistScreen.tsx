import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import albumDetails from "../../data/albumDetails";
import SongListItem from "../../components/SongListItem";
import AlbumHeader from "../../components/AlbumHeader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSongs } from "../../store/actions/musicPlayer.action";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const PlaylistScreen = () => {
    //route.params.album.songs
    const route = useRoute();
    const navigation = useNavigation();

    const data = route.params.playlist.songs;

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                            <View style={{marginTop: 10, marginLeft: 10, flexDirection: "row", alignItems: "center"}} >
                                <FontAwesome name="angle-left" size={40} color="blue" />
                                <Text style={{color: "blue", fontSize: 25, marginLeft: 10}}> Back</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('EditPlaylist', {playlist: route.params.playlist})}  style={{marginLeft: 270, position: 'relative'}} >
                                    <MaterialCommunityIcons name="pencil-outline" size={35} color="white" />
                                </TouchableOpacity>
                            </View>
                            
            </TouchableOpacity>
            {
                (data.length > 0) ? 
                (
                    <FlatList
                        data={data}
                        renderItem={({item, index}) => <SongListItem song={item} index={index} albumSongs={data} playlist={route.params.playlist}/>}
                        keyExtractor={(item, index) => index}
                        ListHeaderComponent={
                            <View style={styles.container}>
                                <Image source={{uri: "https://static.vecteezy.com/system/resources/previews/002/990/653/non_2x/neon-line-cd-or-dvd-disk-icon-isolated-on-brick-wall-background-vector.jpg"}} style={styles.image} />
                                <Text style={styles.name}>{route.params.playlist.title}</Text>
                                <Text style={styles.description}>{route.params.playlist.description}</Text>
                            </View>
                        }
                        ListFooterComponent={
                            <View style={{marginBottom: 100}}>
                                
                            </View>
                            
                        }
                    />
                ) : <></>
            }
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        margin: 15,
    },
    name: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    description: {
        color: 'gray',
        fontSize: 15,
        
    },
});


export default PlaylistScreen;
