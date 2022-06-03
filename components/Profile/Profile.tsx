import { Octicons } from "@expo/vector-icons";
import axios from "axios";
import React from "react";
import { Pressable, View, Text } from "react-native";
import { Avatar, Caption, Title } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setIsArtist, setUserFields } from "../../store/actions/user.action";
import styles from "./styles";

export const setProfile = async (token: string, userId: number) => {
  // getting user data for profile
  try {
    console.log(`getting user data from backend token userId: ${userId}`);
    const userDataRes = await axios.get(`https://spotifiuba-usuario.herokuapp.com/users/${userId}`);
    // set user fields in redux store
    const fields: any = {
        firstName: userDataRes.data.firstName,
        lastName: userDataRes.data.lastName,
        phone: userDataRes.data.phoneNumber,
        username: userDataRes.data.username,
        location: userDataRes.data.location,
        isPremium: userDataRes.data.isPremium,
        isArtist: userDataRes.data.isArtist,
        bio: userDataRes.data.biography,
    };
    if(userDataRes.data.profileImage) fields['photoURL'] = userDataRes.data.profileImage;
    return setUserFields(fields);
  } catch(error) {
    console.error(error);
    return setUserFields({});
  }
}

const updateUserIsArtist = async (token: string, userId: string, isArtist: any, dispatch: any) => {
  let body = {
    isArtist: isArtist
  };
  // setting user isArtist in backend
  try {
    console.log(`setting user isArtist data to backend userId: ${userId}`);
    const userDataRes = await axios.put(`https://spotifiuba-usuario.herokuapp.com/users/${userId}`,
    body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          },
      });
    dispatch(setIsArtist(isArtist));
  } catch(error) {
    console.error(error);
  }
}

export const getProfile = (user: any) => {
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
    // followers: "1.2k",
    // following: "430",
    isPremium: user.isPremium,
    isArtist: user.isArtist,
  };
  
  return user_;
};


const Profile = ({navigation}: {navigation: any}) => {
    const dispatch = useDispatch();
    // get user from redux state
    const user = useSelector((state: any) => state.user);
    const { firstName, lastName, profileImage, username, location, phone, email, biography, isPremium, isArtist } = getProfile(user);
    return (
        <>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop:15}}>
              <Avatar.Image
                source={{uri: `${profileImage}`,}}
                size={80}            
              />
              <View>
                { isArtist ?
                  <Caption style={{fontSize: 16, position: 'absolute', marginTop: 90, marginLeft: -60, color: 'yellow'}}>
                    Artist
                  </Caption>: null
                }
              </View>
              <View style={{marginLeft: 30}}>
                <Title style={[styles.title, {
                  marginTop: 15,
                  marginBottom:5,
                  color: 'white'
                }]}>
                  {`${firstName} ${lastName}`}
                </Title>
                <Caption style={[styles.caption, {color: 'white'}]}>
                  {username}
                </Caption>
                { isPremium ?
                <Caption style={[styles.caption, {marginTop: 8,color: 'yellow'}]}>
                  Premium User
                </Caption>:
                <View>
                  <Caption style={[styles.caption, {marginTop: 8, color: 'white'}]}>
                    <Text style={{color: 'white'}}>
                      want to be premium?
                    </Text>
                    <Pressable onPress={() => navigation.navigate('Premium')}>
                      <Text style={{marginLeft: 3,color: 'white'}}>click here</Text>
                    </Pressable>
                  </Caption>
                </View>
                }
              </View>
              <View style={{ position: 'absolute', marginLeft: 310, marginTop: -18 }}>
                <Pressable onPress={() => {
                  console.debug('Edit Profile button pressed');
                  navigation.navigate('EditProfile');
                }}>
                  <Octicons name="pencil" size={30} color="white" />
                </Pressable>
              </View>
            </View>
          </View>
          <View>
          { !isArtist ?
            <View>
              <Caption style={[styles.caption, {marginTop: 0, color: 'white', marginLeft: 30, marginBottom: 15}]}>
                <Text style={{color: 'white'}}>
                  Want to become and artist?
                </Text>
                <Pressable onPress={() => {
                  console.debug(`Become an artist button pressed`);
                  updateUserIsArtist('', user.userId, true, dispatch);
                }}>
                  <Text style={{marginLeft: 3,color: 'white'}}>click here</Text>
                </Pressable>
              </Caption>
            </View>: null
          }
          </View>
          <View>
            <View style={[styles.userInfoSection]}>
              <Text style={{color: "white"}}>{biography}</Text>
            </View>
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
          {/* <View style={styles.infoBoxWrapper}>
            <View style={styles.infoBox}>
              <Title style={{color:'white'}}>{followers}</Title>
              <Caption style={{color: 'grey'}}>Seguidores</Caption>
            </View>
            <View style={styles.infoBox}>
              <Title style={{color:'white'}}>{following}</Title>
              <Caption style={{color: 'grey'}}>Seguidos</Caption>
            </View>
          </View> */}
        </>
    );
};

export default Profile;


