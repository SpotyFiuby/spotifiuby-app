import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Pressable, Modal} from "react-native";
import styles from "./styles"
import { useDispatch, useSelector } from "react-redux";
import { newSound, setSongs, showPlayer } from "../../store/actions/musicPlayer.action";
import axios from "axios";
import StarsRating from "../StarsRating";


const AlbumHeader = (props: any) => {
    const {album} = props;
    
    const [artist, setArtist] = useState("");
    const [ratingModalShow, setRatingModalShow] = useState(false);
    const [rating, setRating] = useState(0);
    

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

    const updateRating = async (rating: number) => {
      // axios call to backend to update rating
      try {
        console.log(`Updating rating to backend: ${rating}, https://spotifiuba-contenido.herokuapp.com/albums/album_rating/${album.id}?score=${rating}`);
        const updateRatingRes = await axios.put(`https://spotifiuba-contenido.herokuapp.com/albums/album_rating/${album.id}?score=${rating}`);
        // console.log(`Update rating response: ${updateRatingRes}`);
        const albumData = updateRatingRes.data;
        // console.log(albumData);
        calculateRating(albumData.score, albumData.scoreCount);
        console.debug(`new score: ${rating} for album id: ${album.id}`);
      } catch(error) {
        console.error(error);
      }
    };

    const calculateRating = (score: number, count: number) => {
      const albumRating = score ? score/count : 0;
      setRating(albumRating);
    };


    useEffect (() => {
        getArtist(album.artistId)
    }, [])

    const dispatch = useDispatch()
    const play = useSelector((state: any) => state.musicPlayer.play)
    const sound = useSelector((state: any) => state.musicPlayer.sound)
    const songs = useSelector((state: any) => state.musicPlayer.songs)
    
    const handleOnPress = () => {
        dispatch(newSound(sound, play, songs,0) as any)
        dispatch(showPlayer(true, songs, 0))
    }

    const handleOnEditRating = () => setRatingModalShow(true);

    useEffect( () => {
      calculateRating(album.score, album.scoreCount);
    },[]);

    return (
        <View style={styles.container}>
            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={ratingModalShow}
                onRequestClose={() => {
                  setRatingModalShow(!ratingModalShow);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Select your rating for this album</Text>
                    <StarsRating 
                      readOnly={false}
                      score={rating}
                      onChanged={async (rating: any) => {
                        setRating(rating);
                      }}
                    />
                    <View style={{ flexDirection: "row", padding: 10 }}>
                      <Pressable
                        style={[styles.modalButton, styles.buttonClose]}
                        onPress={() => {
                          updateRating(rating);
                          setRatingModalShow(!ratingModalShow)
                        }}
                      >
                        <Text style={styles.textStyle}>Rate</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.modalButton, styles.buttonClose, styles.buttonModalCancel]}
                        onPress={() => setRatingModalShow(!ratingModalShow)}
                      >
                        <Text style={styles.textStyle}>Cancel</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            <Image source={{uri: "http://cdn.shopify.com/s/files/1/0481/9596/0985/products/Firingvinylrecordneonsign.jpg?v=1620971781"}} style={styles.image} />
            <Text style={styles.name}>{album.description}</Text>
            <View style={styles.creatorContainer}>
                <View style={styles.rating}>
                    <StarsRating readOnly={true} score={rating} onChanged={(rating: any) => {
                        return;
                      }}/>
                    <Pressable onPress={handleOnEditRating} style={styles.ratingPressable}>
                        <Text style={styles.ratingEditText}>Rate this album</Text>
                    </Pressable>
                </View>
                <Text style={styles.likes}>{album.scoreCount} Likes</Text>
                <Text style={styles.creator}>By {artist}</Text>
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