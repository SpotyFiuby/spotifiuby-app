import { StatusBar } from 'expo-status-bar';
import { firebase } from "./firebase";
import { useEffect } from 'react';
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

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}


const App = () => {
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