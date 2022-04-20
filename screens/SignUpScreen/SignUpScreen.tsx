import react from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import SignUpForm from '../../components/LoginScreen/SignUpForm';

const SignUpScreen = () => {
    return (
        <View style={styles.root}>
            <SignUpForm />
        </View>
    )
};

export default SignUpScreen;
