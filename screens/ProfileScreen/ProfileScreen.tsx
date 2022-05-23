import { SafeAreaView, FlatList, Button, Pressable } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View, } from '../../components/Themed';
import AlbumCategory from '../../components/AlbumCategory';
import albumCategories from '../../data/profilePlaylists';
import styles from './styles';
import React from 'react';
import { Octicons } from '@expo/vector-icons';
import Profile from '../../components/Profile';

const ProfileScreen = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
          <Button title="Back" onPress={() => {
              return navigation.goBack();
          }} />
      </View>
     
     <Profile navigation={navigation}/>
      <View style={styles.container}>
      <FlatList
        data={albumCategories}
        renderItem={({item}) => (
          <AlbumCategory 
            title={item.title}
            albums={item.albums}
            keyExtractor={(item: any) => item.id}
          />
        )}
      />
      </View>
      
    </SafeAreaView>
  );
};

export default ProfileScreen;