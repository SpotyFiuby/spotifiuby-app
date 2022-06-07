import { SafeAreaView, Button, TouchableOpacity, Pressable } from 'react-native';
import { Text, View } from '../../../components/Themed';
import styles from './styles';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { storage } from "../../../firebase";



const UploadSong = ({navigation}: {navigation: any}) => {
  
  const [song, setSong] = useState(null);
  
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
      const url = await uploadMp3Async(song.uri, `content/album/songs/${song.name as string}`);
      console.log(url)
    }
  }

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
      /> 

      <TextInput
        label="Genre"
        mode="flat"
        style={{ 
          margin: 10,
          width: 300,
        }}
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

        <Pressable  disabled={song === null} onPress={async () => {
              await handleSubmit();
              navigation.goBack();
            }}>
          
          <View style={{ flexDirection: 'column', justifyContent: "center", alignSelf: "center" }}>
            <AntDesign name="checkcircleo" size={30} color={(song === null) ? 'grey' : 'white'}/>
            <Text style={(song === null) ? {color: "grey"} : {color: "white"}}>Save</Text>
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


