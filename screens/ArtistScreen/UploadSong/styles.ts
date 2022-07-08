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
});


export default styles;
