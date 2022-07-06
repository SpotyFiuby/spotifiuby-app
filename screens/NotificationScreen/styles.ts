import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
      backgroundColor:'black'
    },
    notificationList:{
      marginTop:20,
      padding:10,
    },
    notificationBox: {
      padding:20,
      marginTop:5,
      marginBottom:5,
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      borderRadius:10,
      alignItems: "center",
    },
    icon:{
      marginRight: 10,
    },
    description:{
      fontSize:18,
      color: "black",
      marginLeft:10,
      marginRight: 5,
    },
    notificationTitle:{
        fontSize:18,
        color: "black",
        marginLeft:10,
        fontWeight: "bold"
    },
    title:{
        fontSize:30,
        color: "white",
        marginTop: 10,
        marginLeft: 20,
        fontWeight: "bold"
    },
    noNotificationsText:{
        fontSize:24,
        color: "white",
        marginTop: 10,
        marginLeft: 20,
    },
  });

export default styles;