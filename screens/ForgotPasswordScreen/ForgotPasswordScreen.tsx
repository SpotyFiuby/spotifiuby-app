import react from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import ForgotPasswordForm from '../../components/LoginScreen/ForgotPasswordForm';
import React from 'react';

const ForgotPasswordScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    let forgotPasswordData = { email: ''};
    if(route?.params) {
        const { email } = route?.params;
        forgotPasswordData = { email };
    }
    return (
        <View style={styles.root}>
            <ForgotPasswordForm navigation={navigation} forgotPasswordData={forgotPasswordData}/>
        </View>
    )
};

export default ForgotPasswordScreen;
