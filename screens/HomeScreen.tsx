import { StyleSheet, Text, View } from 'react-native';

import { RootTabScreenProps } from '../types';

import Album from '../components/Album';

const album = {
  id: '1',
  imageUri: 'https://i.scdn.co/image/ab67616d0000b273328e973ede81069ff83d552e',
  artistsHeadline: 'Los palmeras, enganchado 24 hs.'
}

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Album album={album} />
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
