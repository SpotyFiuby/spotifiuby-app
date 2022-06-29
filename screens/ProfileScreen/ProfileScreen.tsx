import { SafeAreaView, FlatList, Button } from 'react-native';
import { View } from '../../components/Themed';
import AlbumCategory from '../../components/AlbumCategory';
import albumCategories from '../../data/profilePlaylists';
import styles from './styles';
import React from 'react';
import Profile from '../../components/Profile';

const ProfileScreen = ({navigation, userId}: {navigation: any, userId: string}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
          <Button title="Back" onPress={() => {
              return navigation.goBack();
          }} />
      </View>
     
     <Profile navigation={navigation} userId={userId}/>
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