import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { RootTabParamList, RootTabScreenProps, TabOneParamList } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { Pressable } from 'react-native';
import * as React from 'react';
import { FontAwesome, FontAwesome5, Entypo, EvilIcons } from '@expo/vector-icons';
import AlbumScreen from '../screens/AlbumScreen';

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
      initialRouteName="TabOne"
      >
        
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
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
        component={TabTwoScreen}
        options={{
          title: 'Premium',
          tabBarIcon: ({ color }) => <FontAwesome5 name="spotify" size={30} style={{ marginBottom: -3}} color={color} />,
        }}
      />

      <BottomTab.Screen
        name= "Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <FontAwesome5 name="spotify" size={30} style={{ marginBottom: -3}} color={color} />,
        }}
      />

    </BottomTab.Navigator>
  );
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: 'Home' }}
      />

      <TabOneStack.Screen
        name="AlbumScreen"
        component={AlbumScreen}
        options={{ headerTitle: 'Album' }}
      />
    </TabOneStack.Navigator>
  );
}

/**
* You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
*/
const TabBarIcon = (props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) => {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
