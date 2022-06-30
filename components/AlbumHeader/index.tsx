import React, { useEffect, useState } from "react";
import { Album } from "../../types";
import { View, Text, Image, TouchableOpacity} from "react-native";
import styles from "./styles"
import { useDispatch, useSelector } from "react-redux";
import { newSound, setSongs, showPlayer } from "../../store/actions/musicPlayer.action";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { followAlbum, unfollowAlbum } from "../../store/actions/userFollows.action";


const AlbumHeader = (props) => {
    const {album} = props;
    const user = useSelector((state: any) => state.user);
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

    const followedAlbums = useSelector(state => state.userFollows.likedAlbums)

    useEffect (() => {
        getArtist(album.artistId)
    }, [])

    useEffect (() => {
    }, [followedAlbums])

    const dispatch = useDispatch()
    const play = useSelector(state => state.musicPlayer.play)
    const sound = useSelector(state => state.musicPlayer.sound)
    const songs = useSelector(state => state.musicPlayer.songs)
    

    const handleOnPress = () => {
        if (album.songs.length > 0) {
            dispatch(setSongs(album.songs))
            dispatch(newSound(sound, play, album.songs,0))
            dispatch(showPlayer(true, album.songs, 0))
        }
    }

    const likeAlbum = async (albumId: number, userId: number) => {
        dispatch(followAlbum(albumId,userId)) 
    }

    const unLikeAlbum = async (albumId: number, userId: number) => {
        dispatch(unfollowAlbum(albumId,userId)) 
    }

    return (
        <View style={styles.container}>
            <Image source={{uri: album.cover}} style={styles.image} />
            <Text style={styles.name}>{album.title}</Text>
            <View style={styles.creatorContainer}>
                <Text style={styles.creator}>By {artist}</Text>
                <Text style={styles.likes}>{album.scoreCount} Likes</Text>
                <TouchableOpacity onPress={() => followedAlbums.includes(album.id) ? unLikeAlbum(album.id, user.userId) : likeAlbum(album.id, user.userId)}>
                    {
                        followedAlbums.includes(album.id) ?
                        <AntDesign style={{margin: 5}} name='heart' size={20} color={"#1DB954"}/> :
                        <AntDesign style={{margin: 5}} name='hearto' size={20} color={"white"}/>
                        
                    }  
                </TouchableOpacity>
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