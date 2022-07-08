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


    return (
        <View>
            <FlatList
                data={route.params.album.songs}
                renderItem={({item, index}) => <SongListItem song={item} index={index} albumSongs={route.params.album.songs} playlist={null}/>}
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