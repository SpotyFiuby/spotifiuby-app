import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList, RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { Pressable } from 'react-native';
import * as React from 'react';
import { FontAwesome, AntDesign, Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

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
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Inicio',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={30} style={{ marginBottom: -3}} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={TabTwoScreen}
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color }) => <MaterialIcons name="search" size={30} style={{ marginBottom: -3}} color={color} />,
        }}
      />

      <BottomTab.Screen
        name= "Library"
        component={TabTwoScreen}
        options={{
          title: 'Tu Biblioteca',
          tabBarIcon: ({ color }) => <Ionicons name="library-outline" size={30} style={{ marginBottom: -3}} color={color} />,
        }}
      />

      <BottomTab.Screen
        name= "Premium"
        component={TabTwoScreen}
        options={{
          title: 'Premium',
          tabBarIcon: ({ color }) => <FontAwesome5 name="star" size={30} style={{ marginBottom: -3}} color={color} />,
        }}
      />

    </BottomTab.Navigator>
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
