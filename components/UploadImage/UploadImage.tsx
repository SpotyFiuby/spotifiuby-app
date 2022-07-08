import React, { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';
import { storage } from '../../firebase';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { setProfileImage } from '../../store/actions/user.action';

const UploadImage = ({profileImage, userId}: {profileImage: string, userId: string}) => {
 const dispatch = useDispatch();
 const [image, setImage] = useState<string>(null);
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
      // TODO: upload image to server
      const filename = uuid.v4();
      const url = await uploadImageAsync(_image.uri, `users/${userId}/${filename as string}`);
      dispatch(setProfileImage(url));
   } else {
      console.log('cancelled');
      alert('cancelled');
   }
  };

  useEffect(() => {
    checkForCameraRollPermission()
    // console.log(profileImage);
    if(profileImage) setImage(profileImage);
  }, []);

  return (
    <View style={styles.container}>
    {
      image  && <Image source={{ uri: image, cache: 'force-cache' }} style={{ width: 110, height: 110 }} />
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

export const checkForCameraRollPermission = async () => {
  const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert("Please grant camera roll permissions inside your system's settings");
  } else {
    console.log('Media Permissions are granted')
  }
};

export const uploadImageAsync = async (uri: string, filename: string) => {
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

export default UploadImage;
