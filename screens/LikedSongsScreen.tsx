import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import albumDetails from "../data/albumDetails";
import SongListItem from "../components/SongListItem";
import AlbumHeader from "../components/AlbumHeader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSongs } from "../store/actions/musicPlayer.action";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const LikedSongsScreen = ({navigation}: {navigation: any}) => {

    const route = useRoute();

    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const user = useSelector((state: any) => state.user);
    const songs = useSelector(state => state.musicPlayer.songs)
    const likedSongs = useSelector(state => state.userFollows.likedSongs)

    const getSongs = async () => {
        // getting albums 
        try {
          const response = await axios.get(`http://spotifiuba-contenido.herokuapp.com/users/favourite_songs/${user.userId}`);
          setData(response.data)
        } catch(error) {
          console.error(error);
          setData([])
        }
    }


    useEffect (() => {
       getSongs()
    }, [likedSongs])

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                            <View style={{marginTop: 10, marginLeft: 10, flexDirection: "row", alignItems: "center"}} >
                                <FontAwesome name="angle-left" size={40} color="blue" />
                                <Text style={{color: "blue", fontSize: 25, marginLeft: 10}}> Back</Text>
                            </View>
            </TouchableOpacity>
            {
                (data.length > 0) ? 
                (
                    <FlatList
                        data={data}
                        renderItem={({item, index}) => <SongListItem song={item} index={index} albumSongs={data}/>}
                        keyExtractor={(item, index) => index}
                        ListHeaderComponent={
                            <View style={styles.container}>
                                <Image source={{uri: "https://misc.scdn.co/liked-songs/liked-songs-300.png"}} style={styles.image} />
                                <Text style={styles.name}> Your Liked Songs</Text>
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
});


export default LikedSongsScreen;

