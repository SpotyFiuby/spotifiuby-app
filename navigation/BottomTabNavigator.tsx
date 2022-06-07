import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { RootTabParamList, RootTabScreenProps, TabOneParamList } from '../types';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { Pressable, Text, View } from 'react-native';
import * as React from 'react';
import { FontAwesome, FontAwesome5, Entypo, EvilIcons } from '@expo/vector-icons';
import AlbumScreen from '../screens/AlbumScreen';
import { Octicons } from '@expo/vector-icons'; 
import ArtistAlbums from '../screens/ArtistScreen/ArtistAlbums';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
*/
const BottomTab = createBottomTabNavigator<RootTabParamList>();

// Exporting function that returns the component BottomTabNavigator
export default (props: RootTabScreenProps) => {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      >
        
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <Entypo name="home" size={30} style={{ marginBottom: -3 }} color={color} />,
          headerShown: false,
        }}
      />
      
      <BottomTab.Screen
        name="Search"
        component={TabTwoScreen}
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color }) => <EvilIcons name="search" size={30} style={{ marginBottom: -3}} color={color} />,
        }}
      />

      <BottomTab.Screen
        name= "Library"
        component={TabTwoScreen}
        options={{
          title: 'Tu Biblioteca',
          tabBarIcon: ({ color }) => <FontAwesome name="bars" size={30} style={
            { marginBottom: -3,
              transform: [{ rotate: '90deg'}]
            }
          } color={color} />,
        }}
      />

      <BottomTab.Screen
        name= "Premium"
        component={ArtistAlbums}
        options={{
          title: 'Premium',
          tabBarIcon: ({ color }) => <FontAwesome5 name="spotify" size={30} style={{ marginBottom: -3}} color={color} />,
        }}
      />

    </BottomTab.Navigator>
  );
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function HomeNavigator({navigation}: {navigation: any}) {
  const headerHome = () => {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
      }}>
        <View style={{
          marginRight: 120,
        }}>
          <Text style={{ fontSize: 18, color: 'white' }}>Home</Text>
        </View>
        <View style={{
          marginRight: 10,
        }}>
        <Pressable onPress={() => {
          console.debug('Profile gear pressed');
          navigation.navigate('Profile');
        } }>
          <Octicons name="gear" size={30} color="white" />
        </Pressable>
        </View>
      </View>
    );
  };
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: headerHome }}
      />

      <TabOneStack.Screen
        name="AlbumScreen"
        component={AlbumScreen}
        options={{ headerTitle: 'Album' }}
      />
    </TabOneStack.Navigator>
  );
}
