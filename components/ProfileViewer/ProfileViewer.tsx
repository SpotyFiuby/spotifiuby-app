import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Caption, Title } from "react-native-paper";
import styles from "./styles";
import { SimpleLineIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { followArtist, unfollowArtist } from "../../store/actions/userFollows.action";



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
    const dispatch = useDispatch()
    const [viewUser, setViewUser] = React.useState({});
    const followedArtists = useSelector(state =>  state.userFollows.followedArtists)
    const currentUser = useSelector((state: any) => state.user);

    const _followArtist= async (artistId: number, userId: number) => {
      dispatch(followArtist(artistId,userId)) 
    }

    const _unfollowArtist = async (artistId: number, userId: number) => {
        dispatch(unfollowArtist(artistId,userId)) 
    }

    useEffect( () => {
      getProfile(userId).then(user => {
        setViewUser(user);
      });
    }, []);

    useEffect( () => {
      console.log(followedArtists)
    }, [followedArtists]);



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
                      console.debug(`clicked chatscreen for user: ${currentUser.userId} to chat to user: ${userViewId}`);
                      navigation.navigate('ChatScreen', { to: userViewId, from: currentUser.userId, toName: username });
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
                { isArtist ?
                  (
                    followedArtists.includes(userId) ?
                    (
                      <TouchableOpacity style={{flexDirection: 'row', alignSelf:"left", borderColor: "red", borderWidth: 1, borderRadius: 10, marginTop: 10, padding: 5}}
                        onPress={() =>  _unfollowArtist(userId, currentUser.userId)}
                      >
                        <Text style={{color: "red", marginRight: 10, fontSize: 20, marginLeft: 5}}>Unfollow</Text>
                        <SimpleLineIcons name="user-unfollow" size={20} color="red" style={{marginRight: 5}}/>
                      </TouchableOpacity> 
                    ) : 
                    (
                      <TouchableOpacity style={{flexDirection: 'row', alignSelf:"left", borderColor: "white", borderWidth: 1, borderRadius: 10, marginTop: 10, padding: 5}}
                        onPress={() => _followArtist(userId, currentUser.userId)}
                      >
                        <Text style={{color: "white", marginRight: 10, fontSize: 20, marginLeft: 5}}>Follow</Text>
                        <SimpleLineIcons name="user-follow" size={20} color="white" style={{marginRight: 5}}/>
                      </TouchableOpacity> 
                    )
                  ) : null
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


