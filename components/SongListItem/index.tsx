import React from "react";
import { Text, Image, View } from "react-native";

import styles from './styles';
import { Song } from "../../types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { setSongs, showPlayer } from "../../store/actions/musicPlayer.action";

export type SongListItemProps = {
    song: Song,
    songs: [Song],
    index: number,
}

const SongListItem = (props: SongListItemProps) => {
    const { song, songs, index } = props;
    const dispatch = useDispatch()
    const play = useSelector(state => state.musicPlayer.play)
    
    const handleOnPress = () => {
        dispatch(setSongs(songs, index, play))
        dispatch(showPlayer(true))
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