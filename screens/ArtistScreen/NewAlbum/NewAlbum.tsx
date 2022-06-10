import { SafeAreaView, Button, Pressable } from 'react-native';
import { Text, View } from '../../../components/Themed';
import styles from './styles';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import axios from 'axios';


const NewAlbum = ({navigation}: {navigation: any}) => {
  
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const user = useSelector((state: any) => state.user);

  const handleSubmit = async (userId: string) => {

    let body = {
      description: title,
      genre: genre,
      artistId: userId,
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
      // console.log(response)
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

      <TextInput
        label="Genre"
        mode="flat"
        style={{ 
          margin: 10,
          width: 300,
        }}
        onChangeText={text => setGenre(text)}
      />


      <View style={{ marginLeft: 250, flex: 1, flexDirection: 'row', marginTop: 50 }}>
          
        <Pressable onPress={() => {navigation.goBack()}}>
          <View style={{ flexDirection: 'column', justifyContent: "center", alignSelf: "center", marginEnd: 30 }}>
            <AntDesign name="closecircleo" size={30} color="white" />
            <Text style={{color: "white"}}>Cancel</Text>
          </View>
        </Pressable>

        <Pressable  disabled={(title.length <= 0) || (genre.length <= 0)} onPress={async () => {
              await handleSubmit(user.userId);
              navigation.goBack();
            }}>
          
          <View style={{ flexDirection: 'column', justifyContent: "center", alignSelf: "center"}}>
            <AntDesign name="checkcircleo" size={30} color={((title.length <= 0) || (genre.length <= 0)) ? 'grey' : 'white'}/>
            <Text style={((title.length <= 0) || (genre.length <= 0)) ? {color: "grey"} : {color: "white"}}>Save</Text>
          </View>
        </Pressable>

      </View>

    </SafeAreaView>
  );
};

export default NewAlbum;