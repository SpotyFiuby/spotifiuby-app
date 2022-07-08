import { Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import { useSelector } from 'react-redux';
import AlbumCategory from '../../components/AlbumCategory';
import ProfileCategory from '../../components/ProfileCategory';
import styles from './styles';

const SearchScreen = ({ navigation }: { navigation: any }) => {

  const user = useSelector((state: any) => state.user);
  const userId = user.userId;
  const [genre, setGenre] = useState("ALL");
  const [search, setSearch] = useState('');
  const [searchedText, setSearchedText] = useState('');
  const [albumsData, setAlbumsData] = useState<any>([[]])
  const [profilesData, setProfilesData] = useState<any>([[]])
  const [artistsProfileData, setArtistsProfileData] = useState<any>([[]])
  const [genres, setGenres] = useState({})
  const [premium, setPremium] = useState(false);

  const getGenres = async () => {
    try {
      const response = await axios.get(`https://spotifiuba-contenido.herokuapp.com/albums/genres_dict/`);
      let  array = Object.keys(response.data).map((key) => [response.data[key]])
      array.push(["ALL"])
      setGenres(array)
    } catch(error) {
      setGenres({})
    }
  }

  const getAlbums = async (search: string) => {
    // getting albums 
    try {
      console.log(`getting albums with prefix: ${search}`);
      const url = `https://spotifiuba-contenido.herokuapp.com/albums/album_name/${encodeURIComponent(search)}`;
      const response = await axios.get(url);

      const isFilteredByGenre = genre != "ALL"

      if (!premium) {
        console.log(genre)
        const albumsData = response.data.filter((item: any) => !item.premium && (!isFilteredByGenre || (item.genre == genre)));
        setAlbumsData([albumsData]);
      }
      else {
        const albumsData = response.data.filter((item: any) => (!isFilteredByGenre || (item.genre == genre)));
        setAlbumsData([albumsData]);
      }
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
      // // filter out ourselves from the list
      // const filteredProfiles = response.data.filter((profile: any) => profile.id !== userId);
      // console.log(filteredProfiles);
      // filter out the artists
      const artistsData = response.data.filter((item: any) => item.isArtist);
      const profileData = response.data.filter((item: any) => !item.isArtist);
      setArtistsProfileData([artistsData]);
      setProfilesData([profileData]);
    } catch(error) {
      setProfilesData([[]]);
    }
  }

  useEffect(() => {
    getGenres()
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      getAlbums(search);
      getProfiles(search);
    }
    
  }, [premium, genre]);
  
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
        
        <View style={styles.filterContainer}>
          <SelectDropdown
              data={genres}
              // defaultValueByIndex={1}
              // defaultValue={'Egypt'}
              onSelect={(selectedItem, index) => {
                setGenre(selectedItem[0])
              }}
              defaultButtonText={'ALL'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'white'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              selectedRowStyle={styles.dropdown1SelectedRowStyle}
              search
              searchInputStyle={styles.dropdown1searchInputStyleStyle}
              searchPlaceHolder={'Search here'}
              searchPlaceHolderColor={'darkgrey'}
              renderSearchInputLeftIcon={() => {
                return <FontAwesome name={'search'} color={'#444'} size={18} />;
              }}
            />

          <TouchableOpacity style={styles.premiumContainer} onPress={() => setPremium(!premium)}>
                <MaterialCommunityIcons name="crown" size={30} color={premium ? "gold" : "gray"} />
                <Text style={premium ? {color: "gold"} : {color: "gray"}}>Premium</Text>
          </TouchableOpacity>
        </View>
        

        {/* albums searched data */}
        <ScrollView>
            {
              searchedText !== ''?
              <View style={styles.albumCtn}>
                    <AlbumCategory 
                      title={"Albums"}
                      albums={albumsData[0]}
                    />
              </View>: null
          }
          {/* Artists searched data */}
          {
            searchedText !== ''?
            <View style={styles.profileCtn}>
                    <ProfileCategory 
                      title={"Artists"}
                      profiles={artistsProfileData[0]}
                    />

            </View>: null
          }
          {/* Profiles searched data */}
          {
            searchedText !== ''?
            <View style={styles.profileCtn}>

                  <ProfileCategory 
                    title={"Profiles"}
                    profiles={profilesData[0]}
                  />
            </View>: null
          }
        </ScrollView>
        
    </SafeAreaView>
  );
};

export default SearchScreen;
