import { StyleSheet } from "react-native";
import { white } from "react-native-paper/lib/typescript/styles/colors";

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    title: {
        color: "white",
        fontSize: 30,
        fontWeight: 'bold',
    },
    text: {
        marginTop: 20,
        alignSelf: 'center',
        fontSize: 20,
        color: 'white',
    },
    createPlaylistButton: {
        borderWidth: 1,
        borderColor: '#293133',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 250,
        height:60,
        backgroundColor:'#1CD05D',
        borderRadius:10,
        marginLeft: 25,
        marginTop: 20,
        color: '#1CD05D',
    },
});

export default styles;