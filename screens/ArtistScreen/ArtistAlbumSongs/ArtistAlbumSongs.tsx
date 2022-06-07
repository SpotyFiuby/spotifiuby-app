import { SafeAreaView, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../../../components/Themed';
import styles from './styles';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import albumHeaderStyles from '../../../components/AlbumHeader/styles'
import albumDetails from "../../../data/albumDetails";


const ArtistAlbumSongs = ({navigation}: {navigation: any}) => {
    
    const album={albumDetails}
    
  return (
      
    <SafeAreaView style={styles.safeAreaContainer}>
      
      <View style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
        <Button title="Back" onPress={() => {
          return navigation.goBack();
        }} />
      </View>
        
      <View style={albumHeaderStyles.container}>
        <Image source={{uri: album.albumDetails.imageUri}} style={albumHeaderStyles.image} />
        <Text style={albumHeaderStyles.name}>{album.albumDetails.name}</Text>
      </View>

      <FlatList
        data={album.albumDetails.songs}
        renderItem={({item}) => (
          <View style={styles.albumContainer}>
            <Image source={{uri: item.imageUri}}  style={styles.image} />
            <View style={styles.rightContainer}>
              <Text style={styles.songTitle}>{item.title}</Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addSongButton} onPress={() => {navigation.navigate('UploadSong');}}>
        <Text>Add new Song  </Text>
        <MaterialCommunityIcons name="music-note-plus" size={24} color="white" />
      </TouchableOpacity>

    </SafeAreaView>

  );
};

export default ArtistAlbumSongs;
