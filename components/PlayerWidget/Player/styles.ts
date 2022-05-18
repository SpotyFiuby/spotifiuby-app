import { StyleSheet } from "react-native";
import Layout from "../../../constants/Layout";

const styles = StyleSheet.create({

    mainContainer: {
      position: 'absolute',
      backgroundColor: '#131313',
      height: Layout.window.height,
      width: Layout.window.width,
    },
    container: {
      margin: 20,
      marginTop: 30,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 16,
    },
    button: {
      padding: 16
    },
    title: {
      color: "white",
      fontSize: 16,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 16,
    },
    cover: {
      width: 375,
      height: 360,
    },
    metadata: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    song: {
      fontSize: 32,
      fontWeight: "bold",
      color: "white"
    },
    artist: {
      color: "white"
    },
    slider: {
      width : 375,
      height: 20,
      marginTop: 25,
      flexDirection: 'row',
    },
    controls: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
    },
    progressLevelDuration: {
      width: 370,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 25,
    },
    progressLabelText: {
      color: '#fff',
      fontWeight: '500',
    }
})

export default styles;