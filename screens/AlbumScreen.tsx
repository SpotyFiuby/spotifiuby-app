import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text } from "react-native";

const album = {
    id: '1',
    name: 'Album',
    by: 'Spotify',
    numberOfLikes: 23,
    imageUri: 'https://i.scdn.co/image/ab67616d0000b273328e973ede81069ff83d552e',
    artistsHeadline: 'Los palmeras',
    songs: [{
        id: '1',
        imageUri: 'https://www.cmtv.com.ar/tapas-cd/0825697001573678353.jpg',
        title: 'Sabalero',
        artist: 'Los palmeras'
    }, {
        id: '2',
        imageUri: 'https://www.cmtv.com.ar/tapas-cd/0825697001573678353.jpg',
        title: 'Sabalero 2',
        artist: 'Los palmeras'
    }, {
        id: '3',
        imageUri: 'https://www.cmtv.com.ar/tapas-cd/0825697001573678353.jpg',
        title: 'Sabalero 3',
        artist: 'Los palmeras'
    },{
        id: '4',
        imageUri: 'https://www.cmtv.com.ar/tapas-cd/0825697001573678353.jpg',
        title: 'Sabalero 4',
        artist: 'Los palmeras'
    }]
}

const AlbumScreen = () => {

    const route = useRoute();

    useEffect (() => {
        console.log(route);
    }, [])

    return (
        <View>
            <Text style={{color:'white'}}>Hello from Album Screen</Text>
        </View>
    )
}
export default AlbumScreen;