import { SafeAreaView, Button, Pressable, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../../../components/Themed';
import styles from './styles';
import React, { useEffect, useState } from 'react';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
//import UploadImage from '../../../components/UploadImage';
import axios from 'axios';
import { checkForCameraRollPermission, uploadImageAsync } from '../../../components/UploadImage/UploadImage';
import imagePickerStyles from '../../../components/UploadImage/'
import SelectDropdown from 'react-native-select-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { showPlayer } from '../../../store/actions/musicPlayer.action';


const NewAlbum = ({navigation}: {navigation: any}) => {
  
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const user = useSelector((state: any) => state.user);
  const [genres, setGenres] = useState({})
  const [premium, setPremium] = useState(false);
  const songs = useSelector((state: any) => state.musicPlayer.songs)
  const [imageUri, setImageUri] = useState<string>(null);
  const dispatch = useDispatch()
  
  
  const getGenres = async () => {
    try {
      const response = await axios.get(`https://spotifiuba-contenido.herokuapp.com/albums/genres_dict/`);
      setGenres(Object.keys(response.data).map((key) => [response.data[key]]))
    } catch(error) {
      console.error(error);
      setGenres({})
    }
  }

  const addImage = async () => {
   let _image = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.Images,
     allowsEditing: true,
     aspect: [4,3],
     quality: 1,
   });
   console.log(JSON.stringify(_image));
 
    if (!_image.cancelled) {
      setImageUri(_image.uri);
       // TODO: upload image to server
       const filename = uuid.v4();
       const url = await uploadImageAsync(_image.uri, `content/album/images/${filename as string}`);
       setImage(url)
    } else {
       console.log('cancelled');
       alert('cancelled');
    }
   };
 
   useEffect(() => {
      dispatch(showPlayer(false))
     checkForCameraRollPermission()
     getGenres()
   }, []);
   
  const handleSubmit = async (userId: string) => {

    let body = {
      title: title,
      description: description,
      genre: genre,
      artistId: userId,
      cover: image,
      premium: premium,
    };

    try {
      const response = await axios.post(`https://spotifiuba-contenido.herokuapp.com/albums/`,
      body,
        {
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
            },
        });
    } catch(error) {
      console.error(error);
    }
  }

  return (
      <ScrollView>
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
            <Button title="Back" onPress={() => {
              if (songs)
                dispatch(showPlayer(true))
              return navigation.goBack();
            }} />
          </View>
          
          <Text style={styles.title}>NEW ALBUM</Text>
          
          <TextInput
            label="Album title"
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
            label="Description"
            mode="flat"
            style={{ 
              margin: 10,
              width: 300,
            }}
            onChangeText={text => setDescription(text)}
          />

          

        <View style={styles.container}>
        {
          imageUri  && <Image source={{ uri: imageUri}} style={{ width: 200, height: 200 }} />
        }
          <View style={styles.uploadBtnContainer}>
            <TouchableOpacity onPress={addImage} style={styles.uploadBtn} >
              <Text>{imageUri ? 'Edit' : 'Upload'} Image</Text>
              <AntDesign name="camera" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.premiumContainer} onPress={() => setPremium(!premium)}>
              <MaterialCommunityIcons name="crown" size={30} color={premium ? "gold" : "gray"} />
              <Text style={premium ? {color: "gold"} : {color: "gray"}}>Premium</Text>
        </TouchableOpacity>



          <View style={{ marginLeft: 250, flex: 1, flexDirection: 'row', marginTop: 30 }}>
              
            <Pressable onPress={() => {
              if (songs)
                dispatch(showPlayer(true))
              navigation.goBack()}}>
              <View style={{ flexDirection: 'column', justifyContent: "center", alignSelf: "center", marginEnd: 30 }}>
                <AntDesign name="closecircleo" size={30} color="white" />
                <Text style={{color: "white"}}>Cancel</Text>
              </View>
            </Pressable>

            <Pressable  disabled={(title.length <= 0) || (genre.length <= 0)|| (description.length <= 0) || (image.length <= 0)} onPress={async () => {
                  await handleSubmit(user.userId);
                  if (songs)
                    dispatch(showPlayer(true))
                  navigation.goBack();
                }}>
              
              <View style={{ flexDirection: 'column', justifyContent: "center", alignSelf: "center"}}>
                <AntDesign name="checkcircleo" size={30} color={((title.length <= 0) || (genre.length <= 0)|| (description.length <= 0) || (image.length <= 0)) ? 'grey' : 'white'}/>
                <Text style={((title.length <= 0) || (genre.length <= 0) || (description.length <= 0) || (image.length <= 0)) ? {color: "grey"} : {color: "white"}}>Save</Text>
              </View>
            </Pressable>

          </View>

        </SafeAreaView>
      </ScrollView>
    
  );
};

export default NewAlbum;