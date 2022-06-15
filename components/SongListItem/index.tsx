import React from "react";
import { Text, Image, View } from "react-native";

import styles from './styles';
import { Song } from "../../types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { newSound, setSongs, showPlayer } from "../../store/actions/musicPlayer.action";

export type SongListItemProps = {
    song: Song,
    songs: [Song],
    index: number,
}

const SongListItem = (props: SongListItemProps) => {
    
    const { song, index } = props;
    const dispatch = useDispatch()
    const play = useSelector(state => state.musicPlayer.play)
    const sound = useSelector(state => state.musicPlayer.sound)
    const songs = useSelector(state =>  state.musicPlayer.songs)

    const handleOnPress = () => {
        dispatch(newSound(sound, play, songs,index))
        dispatch(showPlayer(true,songs,index))
    }

    return (
        <TouchableOpacity onPress={handleOnPress}>
            <View style={styles.container}>
                <Image source={{uri: "https://static.vecteezy.com/system/resources/previews/003/484/892/original/neon-music-note-on-the-brick-wall-eps-10-illustration-vector.jpg"}}  style={styles.image} />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{song.name}</Text>
                    <Text style={styles.artist}>{song.authors}</Text>
                </View>
            </View>
        </TouchableOpacity>
        
    )
}

export default SongListItem;