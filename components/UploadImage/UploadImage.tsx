import React, { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

const UploadImage = () => {
 const [image, setImage] = useState(null);
 const addImage = async () => {
  let _image = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4,3],
    quality: 1,
  });
  console.log(JSON.stringify(_image));

   if (!_image.cancelled) {
     setImage(_image.uri);
   }

   // TODO: upload image to server
  };

  useEffect(() => {
    checkForCameraRollPermission()
  }, []);

  return (
    <View style={styles.container}>
    {
      image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
    }
      <View style={styles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={styles.uploadBtn} >
          <Text>{image ? 'Edit' : 'Upload'} Image</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const checkForCameraRollPermission = async () => {
  const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert("Please grant camera roll permissions inside your system's settings");
  } else {
    console.log('Media Permissions are granted')
  }
};

export default UploadImage;
