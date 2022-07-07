import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { database, firestore } from '../../firebase';
import { useSelector } from 'react-redux';

export default function Chat({ navigation, route }:{ navigation: any, route: any }) {
  const [messages, setMessages] = useState<any>([]);
  const { to, from, toName } = route.params;

  const user = useSelector((state: any) => state.user);

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

  const onSend = useCallback((messages = []) => {
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
  }, []);
    

  return (
    <>
    <View style={{ alignSelf: 'flex-start', marginRight: 30, marginTop: 50 }}>
      <Button title="Back" onPress={() => {
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