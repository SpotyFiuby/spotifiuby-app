import { SafeAreaView, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../../../components/Themed';
import styles from './styles';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import albumHeaderStyles from '../../../components/AlbumHeader/styles'
import albumDetails from "../../../data/albumDetails";
import axios from 'axios';


const ArtistAlbumSongs = ({navigation, route}) => {
    
    const album={albumDetails}
    const {albumId} = route.params;
    const [albumData, setAlbumData] = useState({})
    const [refreshing, setRefreshing] = useState(false);

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
      getAlbumSongs(albumId)
    },[])

  return (
      
    <SafeAreaView style={styles.safeAreaContainer}>
      
      <View style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
        <Button title="Back" onPress={() => {
          return navigation.goBack();
        }} />
      </View>
        
      <View style={albumHeaderStyles.container}>
        <Image source={{uri: album.albumDetails.imageUri}} style={albumHeaderStyles.image} />
        <Text style={albumHeaderStyles.name}>{albumData.description}</Text>
      </View>

      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={albumData.songs}
        renderItem={({item}) => (
          <View style={styles.albumContainer}>
            <Image source={{uri: item.imageUri}}  style={styles.image} />
            <View style={styles.rightContainer}>
              <Text style={styles.songTitle}>{item.title}</Text>
            </View>
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
