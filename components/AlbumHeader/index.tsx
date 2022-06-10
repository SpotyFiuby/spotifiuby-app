import React, { useEffect, useState } from "react";
import { Album } from "../../types";
import { View, Text, Image, TouchableOpacity} from "react-native";
import styles from "./styles"
import { useDispatch, useSelector } from "react-redux";
import { newSound, setSongs, showPlayer } from "../../store/actions/musicPlayer.action";
import axios from "axios";


const AlbumHeader = (props) => {
    const {album} = props;
    
    const [artist, setArtist] = useState("")
    

    const getArtist = async (userId: number) => {
        // getting user data for profile
        try {
          console.log(`getting user data from backend token userId: ${userId}`);
          const userDataRes = await axios.get(`https://spotifiuba-usuario.herokuapp.com/users/${userId}`);
          await setArtist(userDataRes.data.firstName + " " + userDataRes.data.lastName)
        } catch(error) {
          console.error(error);
        }
    }


    useEffect (() => {
        getArtist(album.artistId)
    }, [])

    const dispatch = useDispatch()
    const play = useSelector(state => state.musicPlayer.play)
    const sound = useSelector(state => state.musicPlayer.sound)
    const songs = useSelector(state => state.musicPlayer.songs)
    
    const handleOnPress = () => {
        dispatch(newSound(sound, play, songs,0))
        dispatch(showPlayer(true, songs, 0))
    }

    return (
        <View style={styles.container}>
            <Image source={{uri: "http://cdn.shopify.com/s/files/1/0481/9596/0985/products/Firingvinylrecordneonsign.jpg?v=1620971781"}} style={styles.image} />
            <Text style={styles.name}>{album.description}</Text>
            <View style={styles.creatorContainer}>
                <Text style={styles.creator}>By {artist}</Text>
                <Text style={styles.likes}>{album.scoreCount} Likes</Text>
            </View>
            <TouchableOpacity onPress={handleOnPress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>PLAY</Text>
                    </View>
            </TouchableOpacity>
        </View>
    )
}

export default AlbumHeader;