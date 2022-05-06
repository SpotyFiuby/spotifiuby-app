import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        width: "100%",
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
        marginBottom: 10,
    },
    passwordContainer: {
        flexDirection: "row",
    },
    passwordInputStyle: {
        flex: 1,
    },
    sendMailRecoveryButton: (isValid: boolean) => ({
        marginTop: 15,
        alignSelf: "center",
        borderRadius: 40,
        backgroundColor: isValid? '#3B71F3': '#A9BCEC',
        width: "50%",
    }),
    signInCtn: {
        flexDirection: "row",
        justifyContent: "center",
    },
    signInText: {
        alignSelf: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    signInLink: {
        alignSelf: "center",
        padding: 5,
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: "#3B71F3",
    }
});


export default styles;