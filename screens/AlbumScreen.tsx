import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import albumDetails from "../data/albumDetails";
import SongListItem from "../components/SongListItem";
import AlbumHeader from "../components/AlbumHeader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSongs } from "../store/actions/musicPlayer.action";

const AlbumScreen = () => {

    const route = useRoute();

    const dispatch = useDispatch()
    const songs = useSelector(state => state.musicPlayer.songs)
    const [albumSongs, setAlbumSongs] = useState([{}])
    const [refreshing, setRefreshing] = useState(false);

    const getSongs = async () => {
        try {
          const response = await axios.get(`https://spotifiuba-contenido.herokuapp.com/songs/`);
          dispatch(setSongs(response.data))
          setAlbumSongs(response.data)
          setRefreshing(false)
        } catch(error) {
          console.error(error);
        }
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await getSongs()
    }
      
    useEffect (() => {
        getSongs()
    }, [])

    return (
        <View>
            <FlatList
                onRefresh={onRefresh}
                refreshing={refreshing}
                data={albumSongs}
                renderItem={({item, index}) => <SongListItem song={item} index={index}/>}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={<AlbumHeader album={route.params.album}/>}
                ListFooterComponent={
                    <View style={{marginBottom: 100}}></View>
                  }
            />
        </View>
    )
}
export default AlbumScreen;