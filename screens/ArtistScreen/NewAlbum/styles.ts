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
        marginTop: 10,
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
    dropdown1BtnStyle: {
    width: 300,
    height: 65,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1,
    borderColor: '#444',
    marginTop: 2,
    },
    dropdown1BtnTxtStyle: {color: 'grey', textAlign: 'left', marginLeft: 2,},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: 'black', textAlign: 'left'},
    dropdown1SelectedRowStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
    dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    },
    premiumContainer: {
        marginTop: 20,
        flexDirection:'row',
        display: "flex",
        flex : 1,
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#2a2a2a",
        padding: 3,
    }
});


export default styles;