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
import ProfileCategory from '../../components/ProfileCategory';

export default function LibraryScreen({navigation}: {navigation: any}) {

  const [data, setData] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [followedArtistsData, setFollowedArtistsData] = useState([])
  const user = useSelector((state: any) => state.user);
  const followedAlbums = useSelector(state => state.userFollows.likedAlbums)
  const followedArtists = useSelector(state => state.userFollows.followedArtists)
  const userPlaylists = useSelector(state => state.userPlaylists.playlists)
  const playlistUpdate = useSelector(state => state.userPlaylists.changes)
  
  const getFollowedArtists = async () => {
    // getting albums 
    try {
      const response = await axios.get(`https://spotifiuba-usuario.herokuapp.com/users/user_followings/${user.userId}`);
      setFollowedArtistsData(response.data)
    } catch(error) {
      console.error(error);
      setData([])
    }
  }

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

  const getPlaylists = async () => {
    // getting albums 
    try {
      const response = await axios.get(`https://spotifiuba-contenido.herokuapp.com/playlists/`);
      setPlaylists(response.data)
    } catch(error) {
      setPlaylists([])
    }
  }

  useEffect(() => {
    getFollowedArtists()
  },[followedArtists])

  useEffect(() => {
    getAlbums()
  },[followedAlbums])

  useEffect(() => {
    getPlaylists()
  }, [userPlaylists, playlistUpdate])

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
      
      <ProfileCategory 
        title={"Followed Artists"}
        profiles={followedArtistsData}
      />
      
      <PlaylistCategory
        title={"Your Playlists"}
        albums={playlists}
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
  },
  profileCtn: {
    marginTop: 10,
  },
});

