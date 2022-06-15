import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        alignItems: "center",
    },
    title: {
        color: "white",
        fontSize: 30,
        fontWeight: 'bold',
    },
    uploadSongButton: {
        borderWidth:1,
        borderColor:'#293133',
        alignItems:'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: 300,
        height:65,
        backgroundColor:'#1aa7ec',
        borderRadius:40,
        marginTop: 10,
        marginBottom: 50,
        
        }
});


export default styles;