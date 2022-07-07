import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Caption, Title } from "react-native-paper";
import { useSelector } from "react-redux";
import styles from "./styles";


export const getProfile = async (userId: string) => {
  const res = await axios.get(`https://spotifiuba-usuario.herokuapp.com/users/${userId}`);
  const user = res.data;
  // console.log(user);
  // get user data
  const user_ = {
    firstName: user.firstName? user.firstName : user.email,
    lastName: user.lastName,
    profileImage: user.profileImage,
    username: user.username? user.username : `@${user.email.split('@')[0]}`,
    location: user.location? user.location : "Location Not Set",
    phone: user.phone? user.phone : "Phone Not Set",
    biography: user.biography? user.biography : "User Bio, click edit to write a new awesome bio.",
    email: user.email,
    isPremium: user.isPremium,
    isArtist: user.isArtist,
    token: user.token,
    userId: user.id,
  };
  
  return user_;
};


const ProfileViewer = ({navigation, userId}: {navigation: any, userId: string}) => {
    const [viewUser, setViewUser] = React.useState({});
    const user_ = useSelector((state: any) => state.user);

    useEffect( () => {
      getProfile(userId).then(user => {
        setViewUser(user);
      });
    }, []);

    if (Object.keys(viewUser).length === 0) {
      return null;
    }

    const { firstName, lastName, profileImage, username, location, phone, email, biography, isPremium, isArtist, userId: userViewId } = viewUser as any;
    return (
        <>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop:15}}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: profileImage, cache: 'default' }} style={{ width: 90, height: 90 }} />
              </View>
              <View>
                { isArtist ?
                  <Caption style={{fontSize: 16, position: 'absolute', marginTop: 95, marginLeft: -65, color: 'yellow'}}>
                    Artist
                  </Caption>: null
                }
              </View>
              <View style={{marginLeft: 30}}>
                <View style={{ flexDirection: "row"}}>
                  <Title style={[styles.title, {
                    marginTop: 15,
                    marginBottom:5,
                    color: 'white'
                  }]}>
                    {`${firstName} ${lastName}`}
                  </Title>
                  <View style={{ marginLeft: 10}}>
                    <Pressable onPress={() => {
                      console.debug(`clicked chatscreen for user: ${user_.userId} to chat to user: ${userViewId}`);
                      navigation.navigate('ChatScreen', { to: userViewId, from: user_.userId, toName: username });
                    }}>
                      <Entypo name="chat" size={28} color="white" />
                    </Pressable>
                  </View>
                </View>
                <Caption style={[styles.caption, {color: 'white'}]}>
                  {username}
                </Caption>
                { isPremium ?
                <Caption style={[styles.caption, {marginTop: 8,color: 'yellow'}]}>
                  Premium User
                </Caption>: null
                }
              </View>
            </View>
          </View>
          <View>
          </View>
          <View style={[styles.userInfoSection, { marginTop: 20 }]}>
            <Text style={{color: "white"}}>{biography}</Text>
          </View>
          <View style={styles.userInfoSection}>
            <View style= {styles.row}>
              <Text style={{color:"#777777"}}>{location}</Text>
            </View>
            <View style= {styles.row}>
              <Text style={{color:"#777777"}}>{phone}</Text>
            </View>
            <View style= {styles.row}>
              <Text style={{color:"#777777"}}>{email}</Text>
            </View>
          </View>
        </>
    );
};

export default ProfileViewer;


