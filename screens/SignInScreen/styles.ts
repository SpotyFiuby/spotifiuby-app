import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        paddingTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    signInForm: {
        marginTop: 30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInButton: {
        borderRadius: 40,
        width: "40%"
    },
    signUpAccountText: {
        marginTop: 15,
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
    },
    signUpButton: {
        marginTop: 15,
        width: "70%",
        borderRadius: 60,
    },
    signUpText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    federatedFacebookButton: {
        marginTop: 15,
        width: "100%",
    },
    federatedGoogleButton: {
        marginTop: 15,
        width: "100%",
    },
    federatedAppleButton: {
        marginTop: 15,
        width: "100%",
    },

});

export default styles;