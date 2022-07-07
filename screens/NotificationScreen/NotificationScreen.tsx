import { View, Text, SafeAreaView } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import GoBackButton from '../../components/Buttons/GoBackButton';
import { AntDesign } from '@expo/vector-icons';
import * as Notifications from "expo-notifications"
import { addNotifications, allNotificationsReaded } from '../../store/actions/notifications.action';



  
const NotificationScreen =  () => {
    const dispatch = useDispatch()

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
                            <View style={styles.notificationBox}>
                                <AntDesign name="exclamationcircleo" style={styles.icon} color="red" size={24} />
                                <View>
                                    <Text style={styles.notificationTitle}>{item.request.content.title}</Text>
                                    <Text style={styles.description}>{item.request.content.body}</Text>
                                </View>
                                
                            </View>
                    )}}/>
                    ) : <Text style={styles.noNotificationsText}>You don't have any notification</Text>
                }
                
            </View>
        </SafeAreaView>
    )
};

export default NotificationScreen;
