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
import { createPlaylist } from '../../../store/actions/userPlaylists.action';


const NewPlaylist = ({navigation}: {navigation: any}) => {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const user = useSelector((state: any) => state.user);

  
  const dispatch = useDispatch()
   
  const handleSubmit = async (userId: string) => {
    dispatch(createPlaylist(user.userId, title, description))
  }

  return (
      
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
        <Button title="Back" onPress={() => {
          return navigation.goBack();
        }} />
      </View>
      
      <Text style={styles.title}>NEW PLAYLIST</Text>
      
      <TextInput
        label="Playlist name"
        mode="flat"
        style={{ 
          margin: 10,
          marginTop: 50,
          width: 300,
        }}
        onChangeText={text => setTitle(text)}
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

      <View style={{ marginLeft: 250, flex: 1, flexDirection: 'row', marginTop: 50 }}>
          
        <Pressable onPress={() => {navigation.goBack()}}>
          <View style={{ flexDirection: 'column', justifyContent: "center", alignSelf: "center", marginEnd: 30 }}>
            <AntDesign name="closecircleo" size={30} color="white" />
            <Text style={{color: "white"}}>Cancel</Text>
          </View>
        </Pressable>

        <Pressable  disabled={(title.length <= 0) || (description.length <= 0) } onPress={async () => {
              await handleSubmit(user.userId);
              navigation.goBack();
            }}>
          
          <View style={{ flexDirection: 'column', justifyContent: "center", alignSelf: "center"}}>
            <AntDesign name="checkcircleo" size={30} color={((title.length <= 0) || (description.length <= 0)) ? 'grey' : 'white'}/>
            <Text style={((title.length <= 0) ||  (description.length <= 0) ) ? {color: "grey"} : {color: "white"}}>Save</Text>
          </View>
        </Pressable>

      </View>

    </SafeAreaView>
  );
};

export default NewPlaylist;