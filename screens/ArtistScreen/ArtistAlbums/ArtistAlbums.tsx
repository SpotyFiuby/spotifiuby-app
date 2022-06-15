import { FlatList, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../../../components/Themed';
import styles from './styles';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import albums from '../../../data/albums';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';


const ArtistAlbums = ({navigation}: {navigation: any}) => {

  const user = useSelector((state: any) => state.user);

  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const getArtistAlbums = async (artistId: number) => {
    // getting albums from artist
    let response: any;
    try {
      console.log(`getting artist albums from backend artistId: ${artistId}`);
      response = await axios.get(`https://spotifiuba-contenido.herokuapp.com/albums/artist_id/${artistId}`);
      response = response;
    } catch(error) {
      response = (error as any).response;
    } finally {
      if (response.status == 404) {
        console.log('no albums found');
        setData([])
      } else if(response.status == 200) {
        console.log('albums found');
        setData(response.data)
      } else {
        console.log(`error ${response?.status} could not get albums`);
      }
      setRefreshing(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await getArtistAlbums(user.userId)
  }

  useEffect(() => {
    getArtistAlbums(user.userId)
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Albums</Text>
      {
        data.length == 0 ?
        <View style={{ 
          marginTop: 30,
          marginBottom: 20
          }}>
          <Text style={{ alignSelf: 'center'}}>No albums yet, upload one using the button below</Text>
        </View>: null
      }
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={data}
        ListFooterComponent={
          <View>  
          <TouchableOpacity style={styles.createAlbumButton}  onPress={() => { navigation.navigate('NewAlbum');}}>
            <Text>Create new Album  </Text>
            <MaterialCommunityIcons name="folder-plus" size={24} color="white" />
          </TouchableOpacity>
          <View style={{marginBottom: 150}}></View>
          </View>
        }
        renderItem={({item}) => (
        <TouchableOpacity onPress={() => { navigation.navigate('ArtistAlbumSongs', {albumId: item.id});}}>
          <View style={styles.albumContainer}>
            <Image source={{uri: "http://cdn.shopify.com/s/files/1/0481/9596/0985/products/Firingvinylrecordneonsign.jpg?v=1620971781"}}  style={styles.image} />
            <View style={styles.rightContainer}>
              <Text style={styles.songTitle}>{item.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
        )}
      />


      
    </View>
  );
};



export default ArtistAlbums;

