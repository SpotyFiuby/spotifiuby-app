import { StatusBar } from 'expo-status-bar';
import { firebase } from "./firebase";
import { useEffect, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MiniPlayer from './components/PlayerWidget/MiniPlayer';
import Player from './components/PlayerWidget/Player';
import Layout from './constants/Layout';
import store from './store';
import { Provider, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from './store/actions/auth.action';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { setUserFollows } from './store/actions/userFollows.action';

import * as Notifications from "expo-notifications"
import * as Location from 'expo-location';
import * as React from "react"
import * as ImagePicker from 'expo-image-picker';
import { addNotifications, setNotifications, unreadNotifications } from './store/actions/notifications.action';
import axios from 'axios';


export const setNotificationsToken = async (userId: number, token: string) => {
  try {
      const response = await axios.put(`https://spotifiuba-usuario.herokuapp.com/users/user_notification/${userId}`,
      null,
        {
          params: {
            user_token_notification: token,
            },
        });
    } catch(error) {
      console.error(error);
    }
      
}


const registerForPushNotificationsAsync = async (userId: number) => {

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
      alert("You can grant notifications permissions inside your system's settings");
    return;
  
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;

  setNotificationsToken(userId, token)
  return token
};


class AppWrapper extends React.Component {
   
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

const App = () => {

  const [notifications, setPrevNotifications] = useState([])

  //const [token, setToken] = useState("")

  const getNotifications = async () => {
    const prev = (await Notifications.getPresentedNotificationsAsync())
    if (prev.length > 0 ) {
      dispatch(setNotifications(prev))
      dispatch(unreadNotifications())
    }
  }


  React.useEffect(() => {
    getNotifications()
    const subscription = Notifications.addNotificationReceivedListener(response => {
      dispatch(unreadNotifications())
      dispatch(addNotifications(response))
    });
  }, []);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const showPlayer = useSelector(state => state.musicPlayer.showPlayer)
  

  const sharedValue = useSharedValue(Layout.window.height)

  
  const userHandler = user => {
    if (user)
      dispatch(setUser(user))
      
  }

  
  useEffect(
      () => firebase.auth().onAuthStateChanged(user => userHandler(user)),
      []
  )

  useEffect(() => {
    if (currentUser.userId){
      dispatch(setUserFollows(currentUser.userId))
      registerForPushNotificationsAsync(currentUser.userId)
    }
      
  }, [currentUser.userId]);

  const showPlayerWidget = () => {
    if (showPlayer){
      return(
        <>
          <MiniPlayer sharedValue={sharedValue}></MiniPlayer>
          <Player sharedValue={sharedValue}></Player>
        </>
      )
    }
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          {showPlayerWidget()}
          <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default AppWrapper;