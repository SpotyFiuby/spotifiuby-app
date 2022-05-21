import React, {useState} from 'react';
import { View, Alert} from 'react-native';
import styles from './styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import firebase from '../../firebase';
import SignInForm from '../../components/LoginScreen/SignInForm';
import axios from 'axios';
// import { onFacebookButtonPress } from '../../components/LoginScreen/federatedAuth/FacebookAuth/facebook';

const SignInScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSignInPressed = async (email: string,password: string ) => {
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
            // get token from request
            const token = signInRes.data.token;
            console.debug(`Sign In successful with token: ${token}`);
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
    }
    
    const onForgotPasswordPressed = async (email: string) => {
        console.log(`Forgot Password, email: ${email}`);
        navigation.navigate('ForgotPasswordScreen', {
            email,
        });
    };

    const onSignUpPressed = () => {
        navigation.push('SignUpScreen')
    };

    const onSignInFacebook = async () => {
        console.warn('Sign in with Facebook pressed');
        // await onFacebookButtonPress();
    };

    const onSignInGoogle = () => {
        console.warn('Sign in with Google pressed');
    };

    const onSignInApple = () => {
        console.warn('Sign in with Apple pressed');
    };

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
                <View style={styles.federatedGoogleButton}>
                    <FontAwesome.Button
                        name="google"
                        backgroundColor="#DD4D44"
                        onPress={onSignInGoogle}
                    >
                        Sign in with Facebook
                    </FontAwesome.Button>
                </View>
                <View style={styles.federatedAppleButton}>
                    <FontAwesome.Button
                        name="apple"
                        backgroundColor="#363636"
                        onPress={onSignInApple}
                    >
                        Sign in with Facebook
                    </FontAwesome.Button>
                </View>
            </View>
            <View style={styles.signInFormContainer}>
                <SignInForm navigation={navigation} onSignIn={onSignInPressed} onForgotPassword={onForgotPasswordPressed} onSignUp={onSignUpPressed}/>
            </View>
        </View>
    )
}

export default SignInScreen;