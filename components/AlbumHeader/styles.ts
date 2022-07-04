import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        margin: 15,
    },
    name: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    creatorContainer: {
        flexDirection: 'column',
        margin: 10,
        alignItems: 'center',
    },
    creator: {
        color: 'lightgray',
        margin: 5,
        fontSize: 20,
    },
    rating: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    ratingPressable: {
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '30%',
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 5,
    },
    ratingEditText: {
        color: 'white',
        fontSize: 10,
        margin: 5,
    },
    likes: {
        marginTop: 10,
        color: 'lightgray',
        margin: 5,
        fontSize: 20,
    },
    button: {
        backgroundColor: '#1CD05D',
        height: 60,
        width: 175,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    //
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "black",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "lightgray",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalButton: {
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonModalCancel: {
        backgroundColor: "red",
        marginLeft: 10,
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: "white"
      }
});

export default styles;