import React, {useState} from 'react';
import { View, Text, Pressable } from 'react-native';
import CustomButton from '../../components/CustomButton';
import styles from './styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { auth } from '../../firebase';
import SignInForm from '../../components/LoginScreen/SignInForm';


const SignInScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSignInPressed = (email, password) => {
        console.warn('Sign in pressed');
       
        // TODO: make request to backend to check auth
        // const authRes = await axios.get('https://jsonplaceholder.typicode.com/users');
        // console.warn(authRes);
        // if(authRes.code == 200) {
        //     navigation.navigate('Home');
        // }
        // .catch(() => {
        //     console.warn('Sign in failed');
        // });
    };

    const onForgotPasswordPressed = () => {
        console.warn('Forgot password pressed');
    };

    const onSignUpPressed = () => {
        console.warn('Sign up pressed');
    };

    const onSignInFacebook = () => {
        console.warn('Sign in with Facebook pressed');
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
                <SignInForm navigation={navigation} onSignIn={onSignInPressed}/>
            </View>
        </View>
    )
}

export default SignInScreen;