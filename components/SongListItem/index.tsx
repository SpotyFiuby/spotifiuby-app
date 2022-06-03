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
    const { song, songs, index } = props;
    const dispatch = useDispatch()
    const play = useSelector(state => state.musicPlayer.play)
    const sound = useSelector(state => state.musicPlayer.sound)

    const handleOnPress = () => {
        dispatch(newSound(sound, play, songs,index))
        dispatch(showPlayer(true,songs,index))
    }

    return (
        <TouchableOpacity onPress={handleOnPress}>
            <View style={styles.container}>
                <Image source={{uri: song.imageUri}}  style={styles.image} />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{song.title}</Text>
                    <Text style={styles.artist}>{song.artist}</Text>
                </View>
            </View>
        </TouchableOpacity>
        
    )
}

export default SongListItem;