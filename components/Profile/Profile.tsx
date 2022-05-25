import { Octicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View, Text } from "react-native";
import { Avatar, Caption, Title } from "react-native-paper";
import styles from "./styles";

const getProfile = () => {
  return {
    name: "John Doe",
    avatarUrl: "https://cdn0.iconfinder.com/data/icons/body-parts-glyph-silhouettes/300/161845119Untitled-3-512.png",
    caption: "@johndoe",
    location: "Buenos Aires, Argentina",
    phone: "+54 911223344",
    bio: "I am a huge fan of the new music. I love to listen to new music and I love to share it with my friends.",
    email: "johndoe@gmail.com",
    followers: "1.2k",
    following: "430",
  };
};


const Profile = ({navigation}: {navigation: any}) => {
    const { name, avatarUrl, caption, location, phone, email, bio, followers, following } = getProfile();
    return (
        <>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop:15}}>
              <Avatar.Image
                source={{uri: `${avatarUrl}`,}}
                size={80}            
              />
              <View style={{marginLeft: 30}}>
                <Title style={[styles.title, {
                  marginTop: 15,
                  marginBottom:5,
                  color: 'white'
                }]}>
                  {name}
                </Title>
                <Caption style={[styles.caption, {color: 'white'}]}>
                  {caption}
                </Caption>
              </View>
              <View style={{ marginLeft: 90}}>
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
            <View style={[styles.userInfoSection, { alignSelf: 'center'}]}>
              <Text style={{color: "white"}}>{bio}</Text>
            </View>
          </View>
          <View style={styles.userInfoSection}>
            <View style= {styles.row}>
              <Text style={{color:"#777777", marginLeft: 20}}>{location}</Text>
            </View>
            <View style= {styles.row}>
              <Text style={{color:"#777777", marginLeft: 20}}>{phone}</Text>
            </View>
            <View style= {styles.row}>
              <Text style={{color:"#777777", marginLeft: 20}}>{email}</Text>
            </View>
          </View> 
          <View style={styles.infoBoxWrapper}>
            <View style={styles.infoBox}>
              <Title style={{color:'white'}}>{followers}</Title>
              <Caption style={{color: 'grey'}}>Seguidores</Caption>
            </View>
            <View style={styles.infoBox}>
              <Title style={{color:'white'}}>{following}</Title>
              <Caption style={{color: 'grey'}}>Seguidos</Caption>
            </View>
          </View>
        </>
    );
};

export default Profile;