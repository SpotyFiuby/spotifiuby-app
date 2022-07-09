import { SafeAreaView, FlatList, Button, TouchableOpacity, Image, Alert } from 'react-native';
import { Text, View } from '../../../components/Themed';
import styles from './styles';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import albumHeaderStyles from '../../../components/AlbumHeader/styles'
import albumDetails from "../../../data/albumDetails";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showPlayer } from '../../../store/actions/musicPlayer.action';


const ArtistAlbumSongs = ({navigation, route}) => {
    
    const album={albumDetails}
    const {albumId} = route.params;
    const [albumData, setAlbumData] = useState({})
    const [refreshing, setRefreshing] = useState(false);
    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch()

    const deleteSong = (songId: string) => {
      Alert.alert(
        "Are your sure?",
        "Are you sure you want to delete this song?",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: async () => {
              const headers = {
                'accept' : 'application/json',
              }

              try {
                
                console.log(songId)
                const response = await axios.delete(`https://spotifiuba-contenido.herokuapp.com/songs/{songs_id}?song_id=${songId}`);
              }
              catch(error) {
                console.error(error)
              }
              
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "No",
          },
        ]
      );
      
    }

    
    const onRefresh = async () => {
      setRefreshing(true)
      await getAlbumSongs(albumId)
    }

    const getAlbumSongs = async (albumId: number) => {
      // getting songs from albumId
      try {
        console.log(`getting songs from albumId: ${albumId}`);
        const response = await axios.get(`https://spotifiuba-contenido.herokuapp.com/albums/${albumId}`)
        // console.log(response.data)
        setRefreshing(false)
        setAlbumData(response.data)
      } catch(error) {
        console.error(error);
        setAlbumData({})
      }
    }

    useEffect(() => {
      dispatch(showPlayer(false))
      getAlbumSongs(albumId)
    },[])

  return (
      
    <SafeAreaView style={styles.safeAreaContainer}>
      
      <View style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
        <Button title="Back" onPress={() => {
          dispatch(showPlayer(true))
          return navigation.goBack();
        }} />
      </View>
        
      <View style={albumHeaderStyles.container}>
        <Image source={{uri: albumData.cover}} style={albumHeaderStyles.image} />
        <Text style={albumHeaderStyles.name}>{albumData.title}</Text>
      </View>

      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={albumData.songs}
        renderItem={({item}) => (
          <View style={styles.albumContainer}>
            <Image source={{uri: "https://static.vecteezy.com/system/resources/previews/003/484/892/original/neon-music-note-on-the-brick-wall-eps-10-illustration-vector.jpg"}}  style={styles.image} />
            <View style={styles.rightContainer}>
              <Text style={styles.songTitle}>{item.name}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteSong(item.id)}  style={{marginLeft: 350, marginTop: 20, position: 'absolute'}} >
                <MaterialCommunityIcons name="delete" size={35} color="red" />
              </TouchableOpacity>
          </View>
          
        )}
      />

      <TouchableOpacity style={styles.addSongButton} onPress={() => {navigation.navigate('UploadSong', {albumId: albumId});}}>
        <Text>Add new Song  </Text>
        <MaterialCommunityIcons name="music-note-plus" size={24} color="white" />
      </TouchableOpacity>

    </SafeAreaView>

  );
};

export default ArtistAlbumSongs;
