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
    cover: {
      marginVertical: 16,
      width: 375,
      height: 375
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
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      width: Layout.window.width - 32,
      borderRadius: 2,
      height: 4,
      marginVertical: 16
    },
    controls: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
    },
})

export default styles;