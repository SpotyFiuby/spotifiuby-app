import {View, Button, SafeAreaView} from 'react-native';
import styles from './styles';
import React from 'react';
import EditProfile from '../../components/EditProfile';

const EditProfileScreen =  ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
          <Button title="Back" onPress={() => {
              return navigation.goBack();
          }} />
      </View>
     <EditProfile navigation={navigation}/>
    </SafeAreaView>
  );
};
export default EditProfileScreen;