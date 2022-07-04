
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
    },
    starRating: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
    },
    text: {
        fontSize: 14,
        color: 'white',
    },
    myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
    },
    myEmptyStarStyle: {
        color: 'white',
    }
 })

 export default styles;