import { SafeAreaView, Button, Pressable, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../../../components/Themed';
import styles from './styles';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
//import UploadImage from '../../../components/UploadImage';
import axios from 'axios';
import { checkForCameraRollPermission, uploadImageAsync } from '../../../components/UploadImage/UploadImage';
import imagePickerStyles from '../../../components/UploadImage/'


const EditAlbum = ({navigation, route}: {navigation: any, route: any}) => {
  
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const user = useSelector((state: any) => state.user);
  const {album} = route.params;

  const [imageUri, setImageUri] = useState<string>(null);
  
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
        setImageUri(album.cover)
     checkForCameraRollPermission()
   }, []);
   
  const handleSubmit = async (userId: string) => {

    let body = {
      title: (title.length <= 0) ? album.title : title,
      description: (description.length <= 0) ? album.description : description,
      genre: (genre.length <= 0) ? album.genre : genre,
      artistId: userId,
      cover: (image .length <= 0) ? album.cover : image,
      premium: album.premium,
    };

    console.log(body)
    try {
      const response = await axios.put(`https://spotifiuba-contenido.herokuapp.com/albums/${album.id}`,
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
      
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
        <Button title="Back" onPress={() => {
          return navigation.goBack();
        }} />
      </View>
      
      <Text style={styles.title}>EDIT ALBUM</Text>
      
      <View style={{margin: 10, marginTop: 20,}}>

      </View>
      <TextInput
        label="Album title"
        mode="outlined"
        style={styles.textInputStyle}
        onChangeText={text => setTitle(text)}
        placeholder={album.title || 'Album Title'}
        placeholderTextColor='white'
        autoCapitalize= 'none'
        autoCorrect={false}
        textContentType= 'name'
        defaultValue={album.title }
        theme={{colors: {text: "white", placeholder: 'grey'}}}
        outlineColor="grey"
        activeOutlineColor='white'
      /> 

      <TextInput
        label="Genre"
        mode="outlined"
        style={styles.textInputStyle}
        onChangeText={text => setGenre(text)}
        placeholder={album.genre || 'Genre'}
        placeholderTextColor='white'
        autoCapitalize= 'none'
        autoCorrect={false}
        textContentType= 'name'
        defaultValue={album.genre }
        theme={{colors: {text: "white", placeholder: 'grey'}}}
        outlineColor="grey"
        activeOutlineColor='white'
      />

      <TextInput
        label="Description"
        mode="outlined"
        style={styles.textInputStyle}
        placeholder={album.description || 'Description'}
        placeholderTextColor='white'
        autoCapitalize= 'none'
        autoCorrect={false}
        textContentType= 'name'
        defaultValue={album.description }
        theme={{colors: {text: "white", placeholder: 'grey'}}}
        outlineColor="grey"
        activeOutlineColor='white'
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



      <View style={{ marginLeft: 250, flex: 1, flexDirection: 'row', marginTop: 50 }}>
          
        <Pressable onPress={() => {navigation.goBack()}}>
          <View style={{ flexDirection: 'column', justifyContent: "center", alignSelf: "center", marginEnd: 30 }}>
            <AntDesign name="closecircleo" size={30} color="white" />
            <Text style={{color: "white"}}>Cancel</Text>
          </View>
        </Pressable>

        <Pressable  disabled={(title.length <= 0) && (genre.length <= 0)&& (description.length <= 0) && (image.length <= 0)} onPress={async () => {
              await handleSubmit(user.userId);
              navigation.goBack();
            }}>
          
          <View style={{ flexDirection: 'column', justifyContent: "center", alignSelf: "center"}}>
            <AntDesign name="checkcircleo" size={30} color={((title.length <= 0) && (genre.length <= 0)&& (description.length <= 0) && (image.length <= 0)) ? 'grey' : 'white'}/>
            <Text style={((title.length <= 0) && (genre.length <= 0)&& (description.length <= 0) && (image.length <= 0)) ? {color: "grey"} : {color: "white"}}>Save</Text>
          </View>
        </Pressable>

      </View>

    </SafeAreaView>
  );
};

export default EditAlbum;