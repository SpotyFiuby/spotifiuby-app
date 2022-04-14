import React, {useState} from 'react';
import { View, Text, Pressable } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import styles from './styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSignInPressed = () => {
        console.warn('Sign in pressed');
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
            <View style={styles.signInForm}>
                <CustomInput placeholder="username" value={username} setValue={setUsername}/>
                <CustomInput placeholder="password" value={password} setValue={setPassword} secureTextEntry/>
            </View>
            <CustomButton 
                text="Forgot Password ?"
                onPress={onForgotPasswordPressed}
                bgColor="transparent"
                fgColor="#FFFFFF"
            />
            <CustomButton onPress={onSignInPressed} text="Sign In" style={styles.signInButton}/>

            <Text style={{color: "grey"}}>_____________________________________</Text>
            <Text style={styles.signUpAccountText}>Don't have an account?</Text>
            <CustomButton 
                onPress={onSignUpPressed}
                text="SIGN UP FOR SPOTIFIUBY"
                style={styles.signUpButton}
                styleText={styles.signUpText}
            />

        </View>
    )
}

export default SignInScreen;