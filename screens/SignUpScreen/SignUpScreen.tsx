import react from 'react';
import { View, Text, Alert } from 'react-native';
import styles from './styles';
import SignUpForm from '../../components/LoginScreen/SignUpForm';
import axios from 'axios';
import { DeviceEventEmitter } from "react-native"
import { firebase } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setToken, setUserId } from '../../store/actions/user.action';
import { setProfile } from '../../components/Profile/Profile';

const getCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
}


const SignUpScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const dispatch = useDispatch();
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

            try {
                const res = await axios.post(`https://spotifiuba-metricas.herokuapp.com/metrics/standardsignup`, {
                    date: getCurrentDate(),
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                        }
                });
            }
            catch(error) {
                console.error(error);
            }
            
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
