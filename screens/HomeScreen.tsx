import { StyleSheet, Text, View } from 'react-native';

import { RootTabScreenProps } from '../types';

import AlbumCategory from '../components/AlmbumCategory';

const albumCategory = {
  id: '1',
  title: "Categoría",
  albums: [
    {
      id: '1',
      imageUri: 'https://i.scdn.co/image/ab67616d0000b273328e973ede81069ff83d552e',
      artistsHeadline: 'Los palmeras, enganchado 24 hs.'
    },
    {
      id: '2',
      imageUri: 'https://pxb.cdn.elchubut.com.ar/chubut/012022/1643586934016.jpg',
      artistsHeadline: 'Pablito Lescano, solos de teclado'
    },
    {
      id: '3',
      imageUri: 'https://i.scdn.co/image/ab6761610000e5eb91c4459dd3c179af1e99f08f',
      artistsHeadline: 'La Champions Liga'
    },
    {
      id: '4',
      imageUri: 'https://img5.yna.co.kr/etc/inner/SP/2021/06/16/ASP20210616002600883_01_i_P2.jpg',
      artistsHeadline: 'BTS'
    }
  ]
};

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <AlbumCategory title={albumCategory.title} albums={albumCategory.albums} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
