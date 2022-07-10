import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import GoBackButton from '../../components/Buttons/GoBackButton';
import { AntDesign } from '@expo/vector-icons';
import * as Notifications from "expo-notifications"
import { addNotifications, allNotificationsReaded } from '../../store/actions/notifications.action';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';



  
const NotificationScreen =  () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    
    const getNewNotifications = async () => {
      const prev = (await Notifications.getPresentedNotificationsAsync())
      for (var i=0; i < prev.length; i++) {
        dispatch(addNotifications(prev[i]))
      }
    }
    
    React.useEffect(() => {
      getNewNotifications()
      Notifications.dismissAllNotificationsAsync()
      dispatch(allNotificationsReaded())
    }, []);


    //navigation.navigate('ProfileViewerScreen', { userId: 1})}
    const notifications = useSelector((state: any) => state.notifications.notifications);
    return (
        <SafeAreaView>
            <GoBackButton/>
            <View style={styles.container}>
                <Text style={styles.title}>NOTIFICATIONS</Text>
                {
                    notifications.length ? (
                    <FlatList 
                        style={styles.notificationList} 
                        enableEmptySections={true}
                        data={notifications}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                          <View style={{marginBottom: 200,}}/>
                        }
                        renderItem={({item}) => {
                            return (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('ProfileViewerScreen', { userId: item.request.content.data.userAdresseeId});
                              }}>
                              <View style={styles.notificationBox}>
                                <AntDesign name="exclamationcircleo" style={styles.icon} color="red" size={24} />
                                <View>
                                    <Text style={styles.notificationTitle}>{item.request.content.title}</Text>
                                    <Text style={styles.description}>{item.request.content.body}</Text>
                                </View>
                                
                            </View>
                            </TouchableOpacity>
                            
                    )}}/>
                    ) : <Text style={styles.noNotificationsText}>You don't have any notification</Text>
                }
                
            </View>
        </SafeAreaView>
    )
};

export default NotificationScreen;

