import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

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
import EditAlbum from '../screens/ArtistScreen/EditAlbum';
import LikedSongsScreen from '../screens/Library/LikedSongsScreen';
import LibraryScreen from '../screens/Library/LibraryScreen';
import SearchScreen from '../screens/SearchScreen';
import Premium from '../screens/Premium';
import ProfileViewerScreen from '../screens/ProfileViewerScreen';
import NewPlaylist from '../screens/PlaylistScreens/CreatePlaylist';
import PlaylistScreen from '../screens/PlaylistScreens/PlaylistScreen';
import EditPlaylist from '../screens/PlaylistScreens/EditPlaylist';
import AddToPlaylist from '../screens/PlaylistScreens/AddToPlaylist';
import NotificationScreen from '../screens/NotificationScreen/NotificationScreen';
import ChatScreen from '../screens/ChatScreen';


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
        <Stack.Screen name="ArtistAlbumSongs" component={ArtistAlbumSongs} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="UploadSong" component={UploadSong} />
        <Stack.Screen name="NewAlbum" component={NewAlbum} />
        <Stack.Screen name="NewPlaylist" component={NewPlaylist} />
        <Stack.Screen name="EditAlbum" component={EditAlbum} />
        <Stack.Screen name="LikedSongsScreen" component={LikedSongsScreen} />
        <Stack.Screen name="Premium" component={Premium} />
        <Stack.Screen name="ProfileViewerScreen" component={ProfileViewerScreen} />
        <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
        <Stack.Screen name="EditPlaylist" component={EditPlaylist} />
        <Stack.Screen name="AddToPlaylist" component={AddToPlaylist} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
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
  