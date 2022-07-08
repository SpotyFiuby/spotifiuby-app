import * as React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import { RootTabScreenProps } from '../types';

import AlbumCategory from '../components/AlbumCategory';
import albumCategories from '../data/albumCategories';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

  const [data, setData] = useState([[]])
  const [refreshing, setRefreshing] = useState(false);
  const [recomendedAlbums, setRecomendedAlbums] = useState([[]])
  const user = useSelector((state: any) => state.user);
  
  const getAlbums = async () => {
    // getting albums 
    try {
      const response = await axios.get(`https://spotifiuba-contenido.herokuapp.com/albums/`);
      setRefreshing(false)
      setData([response.data])
    } catch(error) {
      console.error(error);
      setData([[]])
    }
  }

  const getRecomendedAlbums = async () => {
    // getting albums 
    try {
      const response = await axios.get(`https://spotifiuba-contenido.herokuapp.com/albums/recommended/?user_id=${user.userId}`);
      setRefreshing(false)
      setRecomendedAlbums([response.data])
    } catch(error) {
      console.error(error);
      setRecomendedAlbums([[]])
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await getAlbums()
    await getRecomendedAlbums()
  }

  useEffect(() => {
    getAlbums()
    getRecomendedAlbums()
  },[])

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={data}
        keyExtractor={(item, index)=> index}
        renderItem={({item}) => (
          <View>
            <AlbumCategory 
              title={"Album"}
              albums={data[0]}
            />
            <AlbumCategory 
              title={"Recomended Albums"}
              albums={recomendedAlbums[0]}
            />
          </View>
          
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


