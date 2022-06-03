import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import albumDetails from "../data/albumDetails";
import SongListItem from "../components/SongListItem";
import AlbumHeader from "../components/AlbumHeader";

const AlbumScreen = () => {

    const route = useRoute();

    useEffect (() => {
        console.log(route);
    }, [])

    return (
        <View>
            <FlatList
                data={albumDetails.songs}
                renderItem={({item, index}) => <SongListItem song={item} songs={albumDetails.songs} index={index}/>}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={() => <AlbumHeader album={albumDetails}/>}
            />
        </View>
    )
}
export default AlbumScreen;