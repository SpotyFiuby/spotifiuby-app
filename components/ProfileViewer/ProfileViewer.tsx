import axios from "axios";
import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Caption, Title } from "react-native-paper";
import styles from "./styles";


export const getProfile = async (userId: string) => {
  const res = await axios.get(`https://spotifiuba-usuario.herokuapp.com/users/${userId}`);
  const user = res.data;
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
    userId: user.userId,
  };
  
  return user_;
};


const ProfileViewer = ({navigation, userId}: {navigation: any, userId: string}) => {
    const [viewUser, setViewUser] = React.useState({});

    useEffect( () => {
      getProfile(userId).then(user => {
        setViewUser(user);
      });
    }, []);

    if (Object.keys(viewUser).length === 0) {
      return null;
    }

    const { firstName, lastName, profileImage, username, location, phone, email, biography, isPremium, isArtist } = viewUser as any;
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


