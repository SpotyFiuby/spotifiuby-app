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


const EditPlaylist = ({navigation, route}: {navigation: any, route: any}) => {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user = useSelector((state: any) => state.user);
  const {playlist} = route.params;

  
   
  const handleSubmit = async (userId: string) => {

    /*let body = {
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
    }*/
  }

  return (
      
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
        <Button title="Back" onPress={() => {
          return navigation.goBack();
        }} />
      </View>
      
      <Text style={styles.title}>EDIT PLAYLIST</Text>
      
      <View style={{margin: 10, marginTop: 20,}}>

      </View>
      <TextInput
        label="Playlist title"
        mode="outlined"
        style={styles.textInputStyle}
        onChangeText={text => setTitle(text)}
        placeholder={playlist.title || 'Playlist Title'}
        placeholderTextColor='white'
        autoCapitalize= 'none'
        autoCorrect={false}
        textContentType= 'name'
        defaultValue={playlist.title }
        theme={{colors: {text: "white", placeholder: 'grey'}}}
        outlineColor="grey"
        activeOutlineColor='white'
      /> 


      <TextInput
        label="Description"
        mode="outlined"
        style={styles.textInputStyle}
        placeholder={playlist.description || 'Description'}
        placeholderTextColor='white'
        autoCapitalize= 'none'
        autoCorrect={false}
        textContentType= 'name'
        defaultValue={playlist.description }
        theme={{colors: {text: "white", placeholder: 'grey'}}}
        outlineColor="grey"
        activeOutlineColor='white'
        onChangeText={text => setDescription(text)}
      />

      <View style={{ marginLeft: 250, flex: 1, flexDirection: 'row', marginTop: 50 }}>
          
        <Pressable onPress={() => {navigation.goBack()}}>
          <View style={{ flexDirection: 'column', justifyContent: "center", alignSelf: "center", marginEnd: 30 }}>
            <AntDesign name="closecircleo" size={30} color="white" />
            <Text style={{color: "white"}}>Cancel</Text>
          </View>
        </Pressable>

        <Pressable  disabled={(title.length <= 0) && (description.length <= 0) } onPress={async () => {
              await handleSubmit(user.userId);
              navigation.goBack();
            }}>
          
          <View style={{ flexDirection: 'column', justifyContent: "center", alignSelf: "center"}}>
            <AntDesign name="checkcircleo" size={30} color={((title.length <= 0) && (description.length <= 0) ) ? 'grey' : 'white'}/>
            <Text style={((title.length <= 0) && (description.length <= 0) ) ? {color: "grey"} : {color: "white"}}>Save</Text>
          </View>
        </Pressable>

      </View>

    </SafeAreaView>
  );
};

export default EditPlaylist;