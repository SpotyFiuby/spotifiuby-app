import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { RootTabParamList, RootTabScreenProps, TabOneParamList } from '../types';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { Pressable, Text, View } from 'react-native';
import * as React from 'react';
import { FontAwesome, FontAwesome5, Entypo, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AlbumScreen from '../screens/AlbumScreen';
import { Octicons } from '@expo/vector-icons'; 
import ArtistAlbums from '../screens/ArtistScreen/ArtistAlbums';
import { useSelector } from 'react-redux';
import LibraryScreen from '../screens/Library/LibraryScreen';
import SearchScreen from '../screens/SearchScreen';
import Premium from '../screens/Premium';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
*/
const BottomTab = createBottomTabNavigator<RootTabParamList>();

// Exporting function that returns the component BottomTabNavigator
export default (props: RootTabScreenProps) => {
  const colorScheme = useColorScheme();
  const user = useSelector((state: any) => state.user);
  const isArtist = user.isArtist;
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
        component={SearchScreen}
        options={{
          headerShown: false,
          title: 'Buscar',
          tabBarIcon: ({ color }) => <EvilIcons name="search" size={30} style={{ marginBottom: -3}} color={color} />,
        }}
      />

      <BottomTab.Screen
        name= "Library"
        component={LibraryScreen}
        options={{
          title: 'Tu Biblioteca',
          tabBarIcon: ({ color }) => <FontAwesome name="bars" size={30} style={
            { marginBottom: -3,
              transform: [{ rotate: '90deg'}]
            }
          } color={color} />,
        }}
      />

      { isArtist?
        <BottomTab.Screen
          name= "Upload"
          component={ArtistAlbums}
          options={{
            headerShown: false,
            title: 'upload',
            tabBarIcon: ({ color }) => <FontAwesome5 name="cloud-upload-alt" size={30} style={{ marginBottom: -3}} color={color} />,
          }}
        />: null
      }
      <BottomTab.Screen
          name= "Premium"
          component={Premium}
          options={{
            headerShown: false,
            title: 'premium',
            tabBarIcon: ({ color }) => <FontAwesome5 name="spotify" size={30} style={{ marginBottom: -3}} color={color} />,
          }}
      />
    </BottomTab.Navigator>
  );
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function HomeNavigator({navigation}: {navigation: any}) {
  const notifications_status = useSelector((state: any) => state.notifications.unreadNotifications);

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
          marginRight: 100,
        }}>
          <Text style={{ fontSize: 18, color: 'white' }}>Home</Text>
        </View>
        <View style={{
          marginRight: 20,
        }}>
        <Pressable onPress={() => {
          console.debug('Profile gear pressed');
          navigation.navigate('Profile');
        } }>
          <Octicons name="gear" size={30} color="white" />
        </Pressable>
        
        </View>
        <View style={{
        }}>
        <Pressable onPress={() => {
          navigation.navigate('NotificationScreen');
        } }>
          {
            notifications_status ?
            <MaterialCommunityIcons name="bell-alert" size={30} color="red" /> :
            <MaterialCommunityIcons name="bell" size={30} color="white" />
              
          }
          
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
