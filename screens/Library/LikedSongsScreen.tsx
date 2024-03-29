import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import SongListItem from "../../components/SongListItem";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoBackButton from "../../components/Buttons/GoBackButton";

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
            <GoBackButton/>
            {

                    <FlatList
                        data={data}
                        renderItem={({item, index}) => <SongListItem song={item} index={index} albumSongs={data} playlist={null}/>}
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

