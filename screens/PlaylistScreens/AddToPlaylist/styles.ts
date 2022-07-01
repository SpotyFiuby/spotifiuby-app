import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginTop: 70
    },
    title: {
        color: "white",
        fontSize: 30,
        fontWeight: 'bold',
    },
    songTitle: {
        color: 'white',
        fontSize: 20,
    },
    albumContainer: {
        flexDirection: 'row',
        margin: 10,
        alignItems: "center",
    },
    image: {
        width: 75,
        height: 75,
    },
    rightContainer: {
        justifyContent: 'space-around',
        marginLeft: 10,
    },
});


export default styles;