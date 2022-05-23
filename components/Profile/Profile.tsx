import { Octicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View, Text } from "react-native";
import { Avatar, Caption, Title } from "react-native-paper";
import styles from "./styles";

const Profile = ({navigation}: {navigation: any}) => {
    return (
        <>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop:15}}>
              <Avatar.Image
                source={{uri:'https://cdn0.iconfinder.com/data/icons/body-parts-glyph-silhouettes/300/161845119Untitled-3-512.png',}}
                size={80}            
              />
              <View style={{marginLeft: 20}}>
                <Title style={[styles.title, {
                  marginTop: 15,
                  marginBottom:5,
                  color: 'white'
                }]}>
                  Fan de Palmeras
                </Title>
                <Caption style={[styles.caption, {color: 'white'}]}>
                  @palmerasFan99
                </Caption>
              </View>
              <View style={{ marginLeft: 20}}>
                <Pressable onPress={() => {
                  console.debug('Edit Profile button pressed');
                  navigation.navigate('EditProfile');
                }}>
                  <Octicons name="pencil" size={30} color="white" />
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.userInfoSection}>
            <View style= {styles.row}>
              <Text style={{color:"#777777", marginLeft: 20}}>Buenos Aires, Argentina</Text>
            </View>
            <View style= {styles.row}>
              <Text style={{color:"#777777", marginLeft: 20}}>+54-64207868</Text>
            </View>
            <View style= {styles.row}>
              <Text style={{color:"#777777", marginLeft: 20}}>palmeraaaas@gmail.com</Text>
            </View>
          </View> 
          <View style={styles.infoBoxWrapper}>
            <View style={styles.infoBox}>
              <Title style={{color:'white'}}>420</Title>
              <Caption style={{color: 'grey'}}>Seguidores</Caption>
            </View>
            <View style={styles.infoBox}>
              <Title style={{color:'white'}}>14</Title>
              <Caption style={{color: 'grey'}}>Seguidos</Caption>
            </View>
          </View>
        </>
    );
};

export default Profile;