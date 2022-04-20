import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        width: "100%",
        // alignItems: "center",
    },
    inputField: {
        alignSelf: "center",
        backgroundColor: "white",
        width: "90%",
        borderColor: "#e8e8e8",
        padding: 12,
        borderWidth: 2,
        borderRadius: 4,
        paddingHorizontal: 10,
        // marginVertical: 5,
        marginBottom: 10,
    },
    signInButton: (isValid) => ({
        alignSelf: "center",
        borderRadius: 40,
        backgroundColor: isValid? '#3B71F3': '#A9BCEC',
        width: "40%",
    }),
    forgotPasswordCtn: {
        alignItems: 'flex-end',
        marginTop: 2,
        marginBottom: 15,
        marginRight: 15,
    },
    forgotPasswordText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    signUpCtn: {
        alignItems: 'center',
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
});


export default styles;