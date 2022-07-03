import { FlatList, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import { Text, View } from '../../../components/Themed';
import styles from './styles';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import albums from '../../../data/albums';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import GoBackButton from '../../../components/Buttons/GoBackButton';

const AddToPlaylist = ({navigation, route}: {navigation: any, route: any}) => {

  const user = useSelector((state: any) => state.user);
  const {song} = route.params;

  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const getUserPlaylists = async (artistId: number) => {
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
    await getUserPlaylists(user.userId)
  }

  useEffect(() => {
    getUserPlaylists(user.userId)
  },[])

  return (
    <SafeAreaView>
      <GoBackButton/>
      <View style={styles.container}>
        <Text style={styles.title}>Add song to playlist</Text>
        {
          data.length == 0 ?
          <View style={{ 
            marginTop: 30,
            marginBottom: 20
            }}>
            <Text style={{ alignSelf: 'center'}}>No playlists yet.</Text>
          </View>: null
        }
        <FlatList
          onRefresh={onRefresh}
          refreshing={refreshing}
          data={data}
          renderItem={({item}) => (
          <TouchableOpacity onPress={() => {
              console.log(song)
              console.log(item.title)
          }}>
            <View style={styles.albumContainer}>
              <Image source={{uri: "https://static.vecteezy.com/system/resources/previews/002/990/653/non_2x/neon-line-cd-or-dvd-disk-icon-isolated-on-brick-wall-background-vector.jpg"}}  style={styles.image} />
              <View style={styles.rightContainer}>
                <Text style={styles.songTitle}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
            


      
  
  );
};



export default AddToPlaylist;
