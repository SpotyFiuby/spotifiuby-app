import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      // backgroundColor: 'white',
    },
    itemStyle: {
      padding: 10,
    },
    albumCtn: {
      marginTop: 10,
    },
    profileCtn: {
      marginTop: 10,
    },
    text: {
      fontSize: 20,
      color: 'white',
    },
    title: {
      color: "white",
      fontSize: 30,
      fontWeight: 'bold',
  },
  dropdown1BtnStyle: {
  width: 150,
  height: 55,
  backgroundColor: '#2a2a2a',
  borderRadius: 20,
  borderWidth: 2,
  borderColor: '#6a6a6a',
  marginTop: 20,
  },
  dropdown1BtnTxtStyle: {color: 'white', textAlign: 'center', marginLeft: 2,},
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
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      backgroundColor: "#2a2a2a",
      padding: 3,
      width: 150,
      height: 55,
      borderColor: '#6a6a6a',
      borderWidth: 2,
      marginLeft: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: "center"
  }
});

export default styles;