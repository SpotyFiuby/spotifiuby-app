import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
   
    borderStyleBase: {
      width: 30,
      height: 45,
    },
   
    borderStyleHighLighted: {
      borderColor: "#03DAC6",
    },
   
    underlineStyleBase: {
      width: 30,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
      color: "white",
      fontSize: 20,
    },
   
    underlineStyleHighLighted: {
      borderColor: "#03DAC6",
      color: "white",
    },
   
    prompt: {
      fontSize: 24,
      paddingHorizontal: 30,
      paddingBottom: 20,
      color: "white",
    },
   
    message: {
      fontSize: 16,
      paddingHorizontal: 30,
    },
   
    error: {
      color: "red",
    },
   });

   export default styles;