import * as React from 'react';
import { StyleSheet, FlatList, View, Text, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';


import { RootTabScreenProps } from '../../types';

import AlbumCategory from '../../components/AlbumCategory';
import albumCategories from '../../data/albumCategories';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AlbumComponent from '../../components/Album';
import PlaylistCategory from '../../components/Playlists/PlaylistCategory/idex';

export default function LibraryScreen({navigation}: {navigation: any}) {

  const [data, setData] = useState([])
  const user = useSelector((state: any) => state.user);
  const followedAlbums = useSelector(state => state.userFollows.likedAlbums)
  
  const getAlbums = async () => {
    // getting albums 
    try {
      const response = await axios.get(`http://spotifiuba-contenido.herokuapp.com/users/favourite_albums/${user.userId}`);
      setData(response.data)
    } catch(error) {
      console.error(error);
      setData([])
    }
  }




  useEffect(() => {
    getAlbums()
  },[followedAlbums])

  return (
    
    <ScrollView style={styles.container}>
      <View style={styles.likedSongsContainer}>
        <Text style={styles.title}>Liked Songs</Text>
        <TouchableWithoutFeedback onPress={() => {navigation.navigate('LikedSongsScreen');}}>
              <View style={styles.likedSongsContainer}>
                  <Image source={{uri: "https://misc.scdn.co/liked-songs/liked-songs-300.png"}} style={styles.image}/>
                  <Text style={styles.text}>Your Liked Songs</Text>
              </View>
        </TouchableWithoutFeedback>
      </View>
      

      <AlbumCategory 
        title={"Liked Albums"}
        albums={data}
      />
      
      <PlaylistCategory
        title={"Your Playlists"}
        albums={data}
      />
        
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    margin:10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  likedSongsContainer: {
    margin: 10,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  image: {
      width: 150,
      height: 150,
  },
  text: {
      color: 'grey',
      marginTop: 10,
  }
});

