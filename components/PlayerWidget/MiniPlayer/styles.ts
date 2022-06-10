import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: '#131313',
        bottom: 50,
        width: '100%',
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
    },
    image: {
        width: 65,
        height: 65,
        marginRight: 10,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 100,
        justifyContent: 'space-around',
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
    },
    artist: {
        color: 'lightgray',
        fontSize: 18,
    },
    slider: {
        backgroundColor: '#131313',
        borderWidth: 0,
    },
    sliderContainer: {
        bottom: 115,
        position: 'absolute',
        width: '100%'
    },
})

export default styles;