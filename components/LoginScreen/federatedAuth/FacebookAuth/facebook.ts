import axios from 'axios';
import * as Facebook from 'expo-facebook';

const onFacebookButtonPress = async ({navigation}: {navigation: any}) => {
    console.log('Facebook log in pressed');
    try {
        await Facebook.initializeAsync({
          appId: '748827406144650',
        });
        const res: any =
          await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email'],
          });
        const { type, token, expirationDate, permissions, declinedPermissions } = res;
        if (type === 'success') {
          try {
            const userData = await getFacebookProfile(token);            
            return (userData);
          } catch (error) {
            navigation.navigate('Login');
          }
        } else {
          alert('Facebook login failed');
          navigation.navigate('Login');
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
};

const getFacebookProfile = async (token: string) => {
    try {
      const res = await axios.get(`https://graph.facebook.com/me?access_token=${token}`);
      const { id } = res.data;
      const userData = await axios.get(`https://graph.facebook.com/${id}?fields=id,name,email,picture&access_token=${token}`);
      return userData.data;
    } catch (err) {
      console.log(err);
      throw new Error('Cant get user data from facebook');
    }
};


export { onFacebookButtonPress };