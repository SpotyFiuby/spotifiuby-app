import React from "react";
import { Album } from "../../types";
import { View, Text, Image, TouchableOpacity} from "react-native";
import styles from "./styles"
import { useDispatch, useSelector } from "react-redux";
import { setSongs, showPlayer } from "../../store/actions/musicPlayer.action";

export type AlbumHeaderProps = {
    album: Album;
}

const AlbumHeader = (props: AlbumHeaderProps) => {
    const {album} = props;

    const dispatch = useDispatch()
    const play = useSelector(state => state.musicPlayer.play)
    
    const handleOnPress = () => {
        dispatch(setSongs(album.songs, 0, play))
        dispatch(showPlayer(true))
    }

    return (
        <View style={styles.container}>
            <Image source={{uri: album.imageUri}} style={styles.image} />
            <Text style={styles.name}>{album.name}</Text>
            <View style={styles.creatorContainer}>
                <Text style={styles.creator}>By {album.by}</Text>
                <Text style={styles.likes}>{album.numberOfLikes} Likes</Text>
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