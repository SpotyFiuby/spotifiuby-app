import * as React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import { RootTabScreenProps } from '../types';

import AlbumCategory from '../components/AlbumCategory';
import albumCategories from '../data/albumCategories';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

  const [data, setData] = useState([[]])
  const [refreshing, setRefreshing] = useState(false);

  
  const getAlbums = async () => {
    // getting albums 
    try {
      console.log(`getting artist albums`);
      const response = await axios.get(`https://spotifiuba-contenido.herokuapp.com/albums/`);
      setRefreshing(false)
      setData([response.data])
    } catch(error) {
      console.error(error);
      setData([[]])
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await getAlbums()
  }

  useEffect(() => {
    getAlbums()
  },[])

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={data}
        keyExtractor={(item, index)=> index}
        renderItem={({item}) => (
          <AlbumCategory 
            title={"Album"}
            albums={item}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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


