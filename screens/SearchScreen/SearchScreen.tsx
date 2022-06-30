import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Pressable, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import AlbumCategory from '../../components/AlbumCategory';
import ProfileCategory from '../../components/ProfileCategory';
import styles from './styles';

const SearchScreen = ({ navigation }: { navigation: any }) => {

  const [search, setSearch] = useState('');
  const [searchedText, setSearchedText] = useState('');
  const [albumsData, setAlbumsData] = useState<any>([[]])
  const [profilesData, setProfilesData] = useState<any>([[]])
  const [artistsProfileData, setArtistsProfileData] = useState<any>([[]])

  const getAlbums = async (search: string) => {
    // getting albums 
    try {
      console.log(`getting albums with prefix: ${search}`);
      const url = `https://spotifiuba-contenido.herokuapp.com/albums/album_name/${encodeURIComponent(search)}`;
      const response = await axios.get(url);
      setAlbumsData([response.data]);
    } catch(error) {
      setAlbumsData([[]]);
    }
  }

  const getProfiles = async (search: string) => {
    // getting profiles 
    try {
      console.log(`getting profiles with prefix: ${search}`);
      const url = `https://spotifiuba-usuario.herokuapp.com/users/search_prefix_email/{user_email}?email_prefix=${encodeURIComponent(search)}&limit=30`;
      const response = await axios.get(url);
      // filter out the artists
      const artistsData = response.data.filter((item: any) => item.isArtist);
      setArtistsProfileData(artistsData);
      setProfilesData([response.data]);
    } catch(error) {
      setProfilesData([[]]);
    }
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* spotify theme search bar */}
        <SearchBar
            round
            searchIcon={
              <Pressable onPress={() => {
                console.debug('Go back Pressed');
                setSearch('');
                setSearchedText('');
                navigation.goBack();
              } }>
                <Ionicons name="arrow-back" size={25} color="white" />
              </Pressable>
            }
            clearIcon={
              <View style={{ flexDirection: 'row', padding: 5}}>
                <Pressable onPress={() => {
                  console.debug('Clear Pressed');
                  setSearch('');
                  setSearchedText('');
                } }>
                  <Entypo name="cross" size={25} color="white" />
                </Pressable>
                <Pressable style={{ marginLeft: 5 }} onPress={() => {
                  console.debug('Search Pressed');
                  // do something here to search
                  setSearchedText(search);
                  getAlbums(search);
                  getProfiles(search);
                } }>
                  <Ionicons name="search" size={25} color="white" />
                </Pressable>
              </View>
            }
            onChangeText={(text) => {
              setSearch(text);
              if(!text) setSearchedText('');
            }}
            onClear={(text) => {
              setSearch('');
              setSearchedText('');
            }}
            placeholder="Type Here..."
            value={search}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            onSubmitEditing={() => {
              // Function for click on search button
              setSearchedText(search);
              getAlbums(search);
              getProfiles(search);
            }}
          />
        </View>
        {/* albums searched data */}
        {
          searchedText !== ''?
          <View style={styles.albumCtn}>
            <FlatList
              // onRefresh={onRefresh}
              // refreshing={refreshing}
              data={albumsData}
              keyExtractor={(item, index)=> index}
              renderItem={({item}) => {
                return (
                <AlbumCategory 
                  title={"Albums"}
                  albums={item}
                />
                );
              }}
            />
          </View>: null
      }
      {/* Artists searched data */}
      {
        searchedText !== ''?
        <View style={styles.profileCtn}>
          <FlatList
            // onRefresh={onRefresh}
            // refreshing={refreshing}
            data={profilesData}
            keyExtractor={(item, index)=> index}
            renderItem={({item}) => {
              const items = item.filter( (item: any) => item.isArtist);
              return (
                <ProfileCategory 
                  title={"Artists"}
                  profiles={items}
                />
              );
            }}
          />
        </View>: null
      }
      {/* Profiles searched data */}
      {
        searchedText !== ''?
        <View style={styles.profileCtn}>
          <FlatList
            // onRefresh={onRefresh}
            // refreshing={refreshing}
            data={profilesData}
            keyExtractor={(item, index)=> index}
            renderItem={({item}) => {
              // console.log(item);
              const items = item.filter( (item: any) => !item.isArtist);
              return (
              <ProfileCategory 
                title={"Profiles"}
                profiles={items}
              />
              );
            }}
          />
        </View>: null
      }
    </SafeAreaView>
  );
};

export default SearchScreen;
