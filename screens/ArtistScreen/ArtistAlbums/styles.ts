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
    createAlbumButton: {
        borderWidth: 1,
        borderColor: '#293133',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 250,
        height:60,
        backgroundColor:'#1CD05D',
        borderRadius:10,
        marginLeft: 50,
        marginTop: 20,
    }
});


export default styles;
