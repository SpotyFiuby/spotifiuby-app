import react from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import SignUpForm from '../../components/LoginScreen/SignUpForm';

const SignUpScreen = ({ navigation, route }) => {
    let signInData = { email: '', password: ''};
    if(route.params) {
        const { email, password } = route?.params;
        signInData = { email, password };
    }
    return (
        <View style={styles.root}>
            <SignUpForm navigation={navigation} signInData={signInData}/>
        </View>
    )
};

export default SignUpScreen;
