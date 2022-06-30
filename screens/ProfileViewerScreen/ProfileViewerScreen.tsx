import { SafeAreaView, Button } from 'react-native';
import { View } from '../../components/Themed';
import styles from './styles';
import React from 'react';
import ProfileViewer from '../../components/ProfileViewer';

const ProfileViewerScreen = ({navigation, route}: {navigation: any, route: any}) => {
  const userId = route.params.userId;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
          <Button title="Back" onPress={() => {
              return navigation.goBack();
          }} />
      </View>
     
     <ProfileViewer navigation={navigation} userId={userId}/>
      <View style={styles.container}>
      </View>
      
    </SafeAreaView>
  );
};

export default ProfileViewerScreen;