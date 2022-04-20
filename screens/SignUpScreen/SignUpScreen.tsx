import react from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import SignUpForm from '../../components/LoginScreen/SignUpForm';

const SignUpScreen = ({ navigation }) => {
    return (
        <View style={styles.root}>
            <SignUpForm navigation={navigation}/>
        </View>
    )
};

export default SignUpScreen;
