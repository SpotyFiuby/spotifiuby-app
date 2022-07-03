import { SafeAreaView, Button, TouchableOpacity, Pressable } from 'react-native';
import { Text, View } from '../../../components/Themed';
import styles from './styles';
import React, { useEffect, useState } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { storage } from "../../../firebase";
import uuid from 'react-native-uuid';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SelectList from 'react-native-dropdown-select-list'
import SelectDropdown from 'react-native-select-dropdown'

      /*<TextInput
        label="Genre"
        mode="flat"
        style={{ 
          margin: 10,
          width: 300,
        }}
        onChangeText={text => setGenre(text)}
      />
      
            <SelectList 
        setSelected={setGenre} 
        data={genres} 
        boxStyles={{backgroundColor:"red"}}
        dropdownStyles={{backgroundColor:"red"}}
      />
      */
const UploadSong = ({navigation, route}) => {
  
  const {albumId} = route.params;
  const [song, setSong] = useState(null);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [authors, setAuthors] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState({})
  const user = useSelector((state: any) => state.user);

  const getGenres = async () => {
    try {
      const response = await axios.get(`https://spotifiuba-contenido.herokuapp.com/albums/genres_dict/`);
      setGenres(Object.keys(response.data).map((key) => [response.data[key]]))
    } catch(error) {
      console.error(error);
      setGenres({})
    }
  }

  const handleFilePicker = async () => {

    try {
      let options = {type:"audio/mpeg"}
      let result = await DocumentPicker.getDocumentAsync(options);
      
      if (result.type != "cancel") {
        setSong(result)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async () => {
    if (song != null) {
      const filename = uuid.v4();
      const url = await uploadMp3Async(song.uri, `content/album/songs/${filename as string}`);

      let body = {
        url: url,
        token: user.token,
        name: title,
        description: description,
        authors: authors,
        genre: genre,
        premium: false,
        artistId: user.userId,
        albumId: albumId
      }

      try {
        const response = await axios.post(`https://spotifiuba-contenido.herokuapp.com/songs/`,
        body,
          {
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json'
              },
          });
        // console.log(response)
      } catch(error) {
        console.error(error);
      }
    }
  }


  useEffect(() => {
    getGenres()
  },[])


  return (
      
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
        <Button title="Back" onPress={() => {
          return navigation.goBack();
        }} />
      </View>
      
      <Text style={styles.title}>NEW SONG</Text>
      
      <TextInput
        label="Song Title"
        mode="flat"
        style={{ 
          margin: 10,
          marginTop: 50,
          width: 300,
        }}
        onChangeText={text => setTitle(text)}
      /> 



      <SelectDropdown
        data={genres}
        // defaultValueByIndex={1}
        // defaultValue={'Egypt'}
        onSelect={(selectedItem, index) => {
          setGenre(selectedItem[0])
        }}
        defaultButtonText={'Select Genre'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        renderDropdownIcon={isOpened => {
          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
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

      <TextInput
        label="Authors"
        mode="flat"
        style={{ 
          margin: 10,
          width: 300,
        }}
        onChangeText={text => setAuthors(text)}
      />

      <TextInput
        label="Description"
        mode="flat"
        style={{ 
          margin: 5,
          width: 300,
        }}
        onChangeText={text => setDescription(text)}
      />

      <Text style={{marginTop: 50}}>{(song === null)  ? "No file chosen" : song.name}</Text>
  
      <TouchableOpacity style={styles.uploadSongButton} onPress={() => handleFilePicker()}>
        <AntDesign name="upload" size={30} color="white" style={{marginRight: 35, marginLeft: 40}} />
        <Text style={{fontSize: 20,}}>Choose File</Text>
      </TouchableOpacity>

      <View style={{ marginLeft: 250, flex: 1, flexDirection: 'row'}}>
          
        <Pressable onPress={() => {navigation.goBack();}}>
          <View style={{ flexDirection: 'column', justifyContent: "center", alignSelf: "center", marginEnd: 30 }}>
            <AntDesign name="closecircleo" size={30} color="white" />
            <Text style={{color: "white"}}>Cancel</Text>
          </View>
        </Pressable>

        <Pressable  disabled={(song === null) || (title.length <= 0) || (genre.length <= 0)|| (authors.length <= 0) || (description.length <= 0)} onPress={async () => {
              await handleSubmit();
              navigation.goBack();
            }}>
          
          <View style={{ flexDirection: 'column', justifyContent: "center", alignSelf: "center" }}>
            <AntDesign name="checkcircleo" size={30} color={(song === null) || (title.length <= 0) || (genre.length <= 0) || (authors.length <= 0)|| (description.length <= 0) ? 'grey' : 'white'}/>
            <Text style={(song === null) || (title.length <= 0) || (genre.length <= 0)|| (authors.length <= 0) || (description.length <= 0)  ? {color: "grey"} : {color: "white"}}>Save</Text>
          </View>
        </Pressable>

      </View>

    </SafeAreaView>
  );
};

const uploadMp3Async = async (uri: string, filename: string) => {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const fileRef = storage.ref(storage.getStorage(), filename);
  const result = await storage.uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await storage.getDownloadURL(fileRef);
}

export default UploadSong;
