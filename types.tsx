/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: NavigatorScreenParams<RootTabParamList> | undefined;
  Profile: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  ForgotPasswordScreen: undefined;
  WpVerify: undefined;
  Login: undefined
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Search: undefined;
  Library: undefined;
  Premium: undefined;
  AlbumScreen: undefined;
  Profile: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
  AlbumScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type Album = {
  id: string;
  name: string;
  by: string;
  numberOfLikes: number;
  imageUri: string;
  artistsHeadline: string;
  songs: [Song];
}

export type Song = {
  id: string,
  imageUri: string,
  title: string,
  artist: string,
  album: string,
  mp3: NodeRequire,
}

export type Profile = {
  id: string;
}
/*
export type TabOneParamList = {
  TabOneScreen: undefined;
  AlbumScreen: undefined;
};



export type Album = {
  id: string;
  imageUri: string;
  artistsHeadline: string;
  name: string;
  by: string;
  numberOfLikes: number;
}

export type Song = {
  id: string,
  imageUri: string,
  title: string,
  artist: string,
}*/

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
