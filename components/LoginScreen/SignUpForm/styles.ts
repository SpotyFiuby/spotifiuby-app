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
    signUpButton: (isValid) => ({
        alignSelf: "center",
        borderRadius: 40,
        backgroundColor: isValid? '#3B71F3': '#A9BCEC',
        width: "40%",
    }),
});


export default styles;