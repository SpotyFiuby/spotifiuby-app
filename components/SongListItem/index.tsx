import React, { useEffect, useState } from "react";
import { Text, Image, View } from "react-native";

import styles from './styles';
import { Song } from "../../types";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { newSound, setSongs, showPlayer } from "../../store/actions/musicPlayer.action";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { followSong, unfollowSong } from "../../store/actions/userFollows.action";
import { number } from "yup";
import Navigation from "../../navigation";
import { useNavigation } from "@react-navigation/native";
import { removeSongFromPlaylist } from "../../store/actions/userPlaylists.action";

export type SongListItemProps = {
    song: Song,
    albumSongs: [Song],
    index: number,
    playlist: any,
}

const SongListItem = (props: SongListItemProps) => {
    
    const navigation = useNavigation()
    const { song, index, albumSongs, playlist } = props;
    const dispatch = useDispatch()
    const play = useSelector(state => state.musicPlayer.play)
    const sound = useSelector(state => state.musicPlayer.sound)
    const songs = useSelector(state =>  state.musicPlayer.songs)
    const likedSongs = useSelector(state =>  state.userFollows.likedSongs)
    const user = useSelector((state: any) => state.user);

    const [addToPlaylistPressed, setAddToPlaylistPressed] = useState(false)

    const handleOnPress = () => {
        if (albumSongs.length > 0) {
            dispatch(setSongs(albumSongs))
            dispatch(newSound(sound, play, albumSongs,index))
            dispatch(showPlayer(true,albumSongs,index))
        }
    }

    const likeSong= async (songId: number, userId: number) => {
        dispatch(followSong(songId,userId)) 
    }

    const unLikeSong = async (songId: number, userId: number) => {
        dispatch(unfollowSong(songId,userId)) 
    }

    useEffect (() => {
    }, [likedSongs])
    
    return (
            <TouchableOpacity onPress={handleOnPress}>
                <View style={styles.container}>
                    <Image source={{uri: "https://static.vecteezy.com/system/resources/previews/003/484/892/original/neon-music-note-on-the-brick-wall-eps-10-illustration-vector.jpg"}}  style={styles.image} />
                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{song.name}</Text>
                        <Text style={styles.artist}>{song.authors}</Text>
                    </View>
                    {
                        playlist ?
                        (
                            <TouchableOpacity onPress={() => {
                                dispatch(removeSongFromPlaylist(song.id, playlist.id))
                                navigation.goBack()
                            }}  style={{marginLeft: 300, marginTop: 20, position: 'absolute'}} >
                                <AntDesign name='minus' size={30} color={"white"}/>
                            </TouchableOpacity>
                        ) :
                        (
                            <TouchableOpacity onPress={() => navigation.navigate('AddToPlaylist', {song: song})}  style={{marginLeft: 300, marginTop: 20, position: 'absolute'}} >
                                <AntDesign name='plus' size={30} color={"white"}/>
                            </TouchableOpacity>
                        )
                    }
                    
                    <TouchableOpacity onPress={() => likedSongs.includes(song.id) ? unLikeSong(Number(song.id), user.userId) : likeSong(Number(song.id), user.userId)}  style={{marginLeft: 350, marginTop: 20, position: 'absolute'}} >
                        {
                            likedSongs.includes(song.id) ?
                            <AntDesign name='heart' size={30} color={"#1DB954"}/> :
                            <AntDesign  name='hearto' size={30} color={"white"}/>
                            
                        }
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        
    )
}

export default SongListItem;