import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    songsContainer: {
        flexDirection: 'row',
        margin: 10,
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
    },
    image: {
        width: 75,
        height: 75,
    },
    rightContainer: {
        justifyContent: 'space-around',
        marginLeft: 10,
    },
    addSongButton: {
        borderWidth:1,
        borderColor:'#293133',
        alignItems:'center',
        justifyContent:'center',
        flexDirection: 'row',
        width: 300,
        height:65,
        backgroundColor:'#1CD05D',
        borderRadius:10,
        marginLeft: 55,
        marginTop: 20,
        padding: 20,
        marginBottom: 20,
    },
});


export default styles;