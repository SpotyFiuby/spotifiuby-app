import { StatusBar } from 'expo-status-bar';
import firebase from "./firebase";
import { useEffect, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MiniPlayer from './components/PlayerWidget/MiniPlayer';
import Player from './components/PlayerWidget/Player';
import Layout from './constants/Layout';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';


const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  const sharedValue = useSharedValue(Layout.window.height)

  const [currentUser, setCurrentUser] = useState(null);
  const userHandler = user => 
      user ? setCurrentUser(user) : setCurrentUser(null);
  useEffect(
      () => firebase.auth().onAuthStateChanged(user => userHandler(user)),
      []
  )

  const showPlayerWidget = () => {
    if (currentUser){
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

export default App;