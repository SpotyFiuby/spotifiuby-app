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
    container:{
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:0,
        overflow:'hidden',
        marginTop: 20,
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:10,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    },
    textInputStyle: {
        width: 300,
        borderWidth: 0.5,
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: "black",
        marginTop: 10
    }
});


export default styles;