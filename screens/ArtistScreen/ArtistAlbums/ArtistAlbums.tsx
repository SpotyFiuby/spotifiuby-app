import { FlatList, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../../../components/Themed';
import styles from './styles';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import albums from '../../../data/albums';


const ArtistAlbums = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Albums</Text>

      <FlatList
        data={albums}
        renderItem={({item}) => (
        <TouchableOpacity onPress={() => { navigation.navigate('ArtistAlbumSongs');}}>
          <View style={styles.albumContainer}>
            <Image source={{uri: item.imageUri}}  style={styles.image} />
            <View style={styles.rightContainer}>
              <Text style={styles.songTitle}>{item.artistsHeadline}</Text>
            </View>
          </View>
        </TouchableOpacity>
        )}
      />


      <TouchableOpacity style={styles.createAlbumButton}>
        <Text>Create new Album  </Text>
        <MaterialCommunityIcons name="folder-plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};



export default ArtistAlbums;

