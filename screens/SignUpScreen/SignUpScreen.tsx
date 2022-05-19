import react from 'react';
import { View, Text, Alert } from 'react-native';
import styles from './styles';
import SignUpForm from '../../components/LoginScreen/SignUpForm';
import axios from 'axios';
import { DeviceEventEmitter } from "react-native"
import firebase from 'firebase/compat';


const SignUpScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const onSignUp = async (username: string, email: string, password: string, phone: string) => {
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
            //TODO: set token for user with context
            console.log("Sign Up successful", res);
            
            // sign in in firebase to use the firebase.auth().onAuthStateChanged and change stacks
            await firebase.auth().signInWithEmailAndPassword(email,password);
            
        } catch(error) {
            console.error(error);
            Alert.alert(
                '⚠ Email already used', '',
                [
                    {text: 'OK', onPress: () => console.debug('User pressed modal button Ok'), style: 'cancel'},
                    {text: 'Forgot Password', onPress: () => {
                        return navigation.navigate('ForgotPasswordScreen');
                    }, style: 'cancel'}
                ],
            );
        }
    }
    DeviceEventEmitter.addListener("event.onSuccessfullWpVerify", 
    (eventData) => {
        onSignUp(
            eventData.username,
            eventData.email,
            eventData.password,
            eventData.phoneNumber,
        ); // event callback onSignUp has already params binded to it
    });
    let signInData = { email: '', password: ''};
    if(route?.params) {
        const { email, password } = route?.params;
        signInData = { email, password};
    }
    return (
        <View style={styles.root}>
            <SignUpForm navigation={navigation} signInData={signInData}/>
        </View>
    )
};

export default SignUpScreen;
