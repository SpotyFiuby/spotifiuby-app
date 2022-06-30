import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import WpVerify from '../screens/WpVerify';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ArtistAlbumSongs from '../screens/ArtistScreen/ArtistAlbumSongs';
import UploadSong from '../screens/ArtistScreen/UploadSong';
import NewAlbum from '../screens/ArtistScreen/NewAlbum';
import SearchScreen from '../screens/SearchScreen';
import Premium from '../screens/Premium';
import ProfileViewerScreen from '../screens/ProfileViewerScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();
const screenOptions = {
  headerShown: false,
};

export const SignedInStack = () => (
    <Stack.Navigator
        initialRouteName="Home"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Screen name="ArtistAlbumSongs" component={ArtistAlbumSongs} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="UploadSong" component={UploadSong} />
        <Stack.Screen name="NewAlbum" component={NewAlbum} />
        <Stack.Screen name="Premium" component={Premium} />
        <Stack.Screen name="ProfileViewerScreen" component={ProfileViewerScreen} />
      </Stack.Navigator>
  )
  
  export const SignedOutStack = () => (
    <Stack.Navigator
        initialRouteName="SignInScreen"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="WpVerify" component={WpVerify} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      </Stack.Navigator>
  )
  