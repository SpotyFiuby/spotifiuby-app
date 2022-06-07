import React, {useState} from 'react';
import { View, Alert} from 'react-native';
import styles from './styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { firebase } from '../../firebase';
import SignInForm from '../../components/LoginScreen/SignInForm';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setEmail, setToken, setUserId } from '../../store/actions/user.action';
import { setProfile } from '../../components/Profile/Profile';
import { onFacebookButtonPress } from '../../components/LoginScreen/federatedAuth/FacebookAuth/facebook';

const SignInScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();

  const onSignInPressed = async (email: string,password: string ) => {  
      let token = '';
      let userId = undefined;          
      try {
          console.debug(`Firebase SingIn successful with email: ${email}`);
          // TODO: ADD bearer token to axios headers
          const signInRes = await axios.post(`https://spotifiuba-usuario.herokuapp.com/login/signin`, {
              email,
              password
              }, {
                  headers: {
                      'Content-Type': 'application/json',
                      'accept': 'application/json'
                      },
                  }
          );
          token = signInRes.data.token;
          userId = signInRes.data.userId;
          // set token and userId in redux store
          dispatch(setToken(token));
          dispatch(setUserId(userId));
          dispatch(setEmail(email));
          console.debug(`Sign In successful with token: ${token}, userId: ${userId}`);
          await firebase.auth().signInWithEmailAndPassword(email,password);
      } catch(error) {
          console.error(error);
          Alert.alert(
              '⚠ Incorrect username or password.', '',
              [
                  {text: 'OK', onPress: () => console.debug('User pressed modal button Ok'), style: 'cancel'},
                  {text: 'Sign Up', onPress: () => {
                      console.debug('User pressed modal button Sign Up');
                      return navigation.navigate('SignUpScreen', {
                          email,
                          password,
                          });
                  }},
              ],
          );
      }
      
      // setting user profile on sign in
      dispatch(await setProfile(token, userId));
  }
  
  const onForgotPasswordPressed = async (email: string) => {
      console.log(`Pressed Forgot Password, email: ${email}`);
      navigation.navigate('ForgotPasswordScreen', {
          email,
      });
  };

  const onSignUpPressed = () => navigation.push('SignUpScreen');

  const checkUserExists = async (email: string) => {
    let apiRes = null;
    try {
      apiRes = await axios.get(`https://spotifiuba-usuario.herokuapp.com/users/email/${email}`);
    } catch (error) {
      apiRes = (error as any).response;
    } finally {
      if (apiRes && apiRes.status === 404) {
        return false;
      }
      if(apiRes && apiRes.status === 200) {
        return true;
      } else {
        throw new Error('Error checking if user exists');
      }
    }
  };
  
  const onSignUpFederated = async (username: string, email: string, password: string, phone: string, dispatch: any) => {
    try {
        const res = await axios.post(`https://spotifiuba-usuario.herokuapp.com/login/signup`, {
            firstName: username,
            lastName: '',
            email,
            password,
            phoneNumber: phone
        }, {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
                }
        });
        // get token from request
        const token = res.data.token;
        const userId = res.data.userId;
        const userDataRes = await axios.get(`https://spotifiuba-usuario.herokuapp.com/users/${res.data.userId}`);
        console.log(userDataRes.data);
        // set token and userId in redux store
        dispatch(setToken(token));
        dispatch(setUserId(userId));
        
        // sign in in firebase to use the firebase.auth().onAuthStateChanged and change stacks
        await firebase.auth().signInWithEmailAndPassword(email,password);
  
        // set user profile on sign up
        dispatch(await setProfile(token, userId));
      } catch(error) {
          console.error(error);
          Alert.alert('Error', 'Error signing up');
      }
  };

  const onSignInFacebook = async () => {
    const userData = await onFacebookButtonPress(navigation);
    const { id, name, email } = userData;
    // check if user exists in the db with that email
    const exists = await checkUserExists(email);
    if (exists) {
      // user exists, log them in
      // sign in user backend and navigate to home
      console.debug(`Federated User exists, signing in with email: ${email}`);
      onSignInPressed(email, `${id}-${email}`);
    } else {
      // user does not exist, create them
      console.debug(`Federated Facebook User does not exist, creating user with email: ${email}`);
      onSignUpFederated(name, email, `${id}-${email}`, '', dispatch);
    }
  };

  // const onSignInGoogle = () => {
  //     console.warn('Sign in with Google pressed');
  // };

  // const onSignInApple = () => {
  //     console.warn('Sign in with Apple pressed');
  // };

  return(
      <View style={styles.root}>
          <View style={styles.federatedContainer}>
              <View style={styles.federatedFacebookButton}>
                  <FontAwesome.Button
                      name="facebook"
                      backgroundColor="#3b5998"
                      onPress={onSignInFacebook}
                  >
                  Sign in with Facebook
                  </FontAwesome.Button>
              </View>
              {/* <View style={styles.federatedGoogleButton}>
                  <FontAwesome.Button
                      name="google"
                      backgroundColor="#DD4D44"
                      onPress={onSignInGoogle}
                  >
                      Sign in with Google
                  </FontAwesome.Button>
              </View>
              <View style={styles.federatedAppleButton}>
                  <FontAwesome.Button
                      name="apple"
                      backgroundColor="#363636"
                      onPress={onSignInApple}
                  >
                      Sign in with Apple
                  </FontAwesome.Button>
              </View> */}
          </View>
          <View style={styles.signInFormContainer}>
              <SignInForm navigation={navigation} onSignIn={onSignInPressed} onForgotPassword={onForgotPasswordPressed} onSignUp={onSignUpPressed}/>
          </View>
      </View>
  )
}

export default SignInScreen;
