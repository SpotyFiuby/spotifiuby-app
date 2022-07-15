import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 80,
        marginBottom: 10,
        color: "#1CD05D",
        textAlign: "center",
    },
    benefitText: {
      fontSize: 20,
      fontWeight: "200",
      color: "white",
    },
    price: {
      fontSize: 30,
      marginBottom: 10,
      color: "white",
      fontWeight: "normal",
      textAlign: "center",
      marginTop: 40,
    },
    bennefitContainer: {
      flexDirection: "row",
      marginLeft: -20,
      marginTop: 30,
    },
    upgradeToPremiumButton: {
      marginTop: 20,
      borderWidth: 1,
      borderColor: '#293133',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      width: 200,
      height:60,
      backgroundColor:'#1CD05D',
      borderRadius:40,
      
    },
    upgradeToPremiumButtonText: {
      fontSize: 20,
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
  });
  
  export default styles;