import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { database, firestore } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { showPlayer } from '../../store/actions/musicPlayer.action';

export default function Chat({ navigation, route }:{ navigation: any, route: any }) {
  const [messages, setMessages] = useState<any>([]);
  const { to, from, toName } = route.params;
  const songs = useSelector((state: any) => state.musicPlayer.songs)
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch()

  const onSignOut = () => {
    console.log('pressed logging out');
  };

  const calculateIndex = (to: string, from: string) => {
    return parseInt(to) < parseInt(from)? `${to}-${from}`: `${from}-${to}`;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10
          }}
          onPress={onSignOut}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(showPlayer(false))
    const collectionRef = firestore.collection(database, calculateIndex(to, from));
    const q = firestore.query(collectionRef, firestore.orderBy('createdAt', 'desc'));

    const unsubscribe = firestore.onSnapshot(q, querySnapshot => {
      return setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      );
    });
  
    return () => unsubscribe();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0]; 
    
    firestore.addDoc(firestore.collection(database, calculateIndex(to, from)), {
      _id,
      createdAt,
      text,
      user
    });

    try {
      const response = await axios.put(`https://spotifiuba-usuario.herokuapp.com/users/newMessageNotification/${from}/${to}`,
      null);
    } catch(error) {
      console.error(error);
    }
  }, []);
    

  return (
    <>
    <View style={{ alignSelf: 'flex-start', marginRight: 30, marginTop: 50 }}>
      <Button title="Back" onPress={() => {
          if (songs)
            dispatch(showPlayer(true))
          return navigation.goBack();
      }} />
    </View>
    <View style={{ justifyContent: "center"}}>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: "white"}}>{toName}</Text>
    </View>
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.userId,
        avatar: user.profileImage
      }}
    />
    </>
  );
}