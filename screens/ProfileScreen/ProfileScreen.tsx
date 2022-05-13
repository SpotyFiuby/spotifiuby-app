import { Button, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View, } from '../../components/Themed';
import AlbumCategory from '../../components/AlbumCategory';
import albumCategories from '../../data/profilePlaylists';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop:15}}>
          <Avatar.Image
            source={{uri:'https://cdn0.iconfinder.com/data/icons/body-parts-glyph-silhouettes/300/161845119Untitled-3-512.png',}}
            size={80}            
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop: 15,
              marginBottom:5,
              color: 'white'
            }]}>
              Fan de Palmeras
            </Title>
            <Caption style={[styles.caption, {color: 'white'}]}>
              @palmerasFan99
            </Caption>
          </View>
        </View>
      </View>
      <View style={styles.userInfoSection}>
            <View style= {styles.row}>
              <Text style={{color:"#777777", marginLeft: 20}}>Buenos Aires, Argentina</Text>
            </View>
            <View style= {styles.row}>
              <Text style={{color:"#777777", marginLeft: 20}}>+54-64207868</Text>
            </View>
            <View style= {styles.row}>
              <Text style={{color:"#777777", marginLeft: 20}}>palmeraaaas@gmail.com</Text>
            </View>
      </View> 

      <View style={styles.infoBoxWrapper}>
            <View style={styles.infoBox}>
              <Title style={{color:'white'}}>420</Title>
              <Caption style={{color: 'grey'}}>Seguidores</Caption>
            </View>
            <View style={styles.infoBox}>
              <Title style={{color:'white'}}>14</Title>
              <Caption style={{color: 'grey'}}>Seguidos</Caption>
            </View>
      </View>

      <View style={styles.container}>
      <FlatList
        data={albumCategories}
        renderItem={({item}) => (
          <AlbumCategory 
            title={item.title}
            albums={item.albums}
            keyExtractor={(item) => item.id}
          />
        )}
      />
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal:30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
