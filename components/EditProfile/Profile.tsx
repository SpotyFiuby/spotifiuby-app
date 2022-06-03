import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { Pressable, View, Text, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUserFields } from "../../store/actions/user.action";
import { getProfile } from "../Profile/Profile";
import UploadImage from "../UploadImage";
import styles from "./styles";

const updateUserData = async (token: string, userId: string, userData: any, dispatch: any) => {
  let body = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    userName: userData.username,
    location: userData.location,
    biography: userData.biography,
    profileImage: userData.profileImage || 'https://cdn0.iconfinder.com/data/icons/body-parts-glyph-silhouettes/300/161845119Untitled-3-512.png',
  };
  // setting user data in backend
  try {
    console.log(`setting user data to backend userId: ${userId}`);
    const userDataRes = await axios.put(`https://spotifiuba-usuario.herokuapp.com/users/${userId}`,
    body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          },
      });
    dispatch(setUserFields(userData));
  } catch(error) {
    console.error(error);
  }
}

const EditProfile = ({navigation}: {navigation: any}) => {
    const profile = getProfile();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    return (
      <>
        <Formik 
          initialValues={{
            ...profile,
          }}
          // validationSchema={}
          onSubmit={async (values) => {
            // updating profile
            await updateUserData(user.token, user.userId, values, dispatch);
          }}
          validateOnMount={true}
        >{({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <View style={styles.userInfoSection}>
              <View style={{flexDirection: 'row', marginTop:15}}>
                <UploadImage />
                {/* <Avatar.Image
                  source={{uri: `${values.profileImage}`,}}
                  size={80}           
                /> */}
                <View style={{marginLeft: 30, width: '60%'}}>
                  <TextInput
                    style={[styles.title, {
                      marginTop: 15,
                      marginBottom:5,
                      color: 'white',
                      borderWidth: 0.5,
                      borderColor: 'grey',
                    }]}
                    placeholder={values.firstName || 'first name'}
                    placeholderTextColor='#444'
                    autoCapitalize= 'none'
                    autoCorrect={false}
                    keyboardType= 'name-phone-pad'
                    textContentType= 'name'
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                  />
                  <TextInput
                    style={[styles.title, {
                      marginTop: 5,
                      marginBottom:5,
                      color: 'white',
                      borderWidth: 0.5,
                      borderColor: 'grey',
                    }]}
                    placeholder={values.lastName || 'last name'}
                    placeholderTextColor='#444'
                    autoCapitalize= 'none'
                    autoCorrect={false}
                    keyboardType= 'name-phone-pad'
                    textContentType= 'name'
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                  />
                  <TextInput
                    style={[styles.caption, {
                      color: 'white',
                      borderWidth: 0.5,
                      borderColor: 'grey',
                      marginTop: 5,
                    }]}
                    placeholder={values.username || 'username'}
                    placeholderTextColor='#444'
                    autoCapitalize= 'none'
                    autoCorrect={false}
                    keyboardType= 'name-phone-pad'
                    textContentType= 'name'
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={
                      values.username[0] != '@'? `@${values.username}`: values.username
                    }
                  />
                </View>
              </View>
            </View>
            <View>
              <View style={[styles.userInfoSection]}>
                <TextInput
                    style={[styles.caption, {
                      color: 'white',
                      width: '100%',
                      borderWidth: 0.5,
                      borderColor: 'grey',
                      marginTop: 5,
                    }]}
                    placeholder={values.biography || 'biography'}
                    placeholderTextColor='#444'
                    autoCapitalize= 'none'
                    autoCorrect={false}
                    keyboardType= 'name-phone-pad'
                    textContentType= 'name'
                    onChangeText={handleChange('biography')}
                    onBlur={handleBlur('biography')}
                    value={values.biography}
                  />
              </View>
            </View>
            <View style={styles.userInfoSection}>
              <View style= {[styles.row]}>
                <TextInput
                    style={[styles.caption, {
                      color: 'white',
                      width: '100%',
                      borderWidth: 0.5,
                      borderColor: 'grey',
                      marginTop: 5,
                    }]}
                    placeholder={values.location || 'location'}
                    placeholderTextColor='#444'
                    autoCapitalize= 'none'
                    autoCorrect={false}
                    keyboardType= 'name-phone-pad'
                    textContentType= 'name'
                    onChangeText={handleChange('location')}
                    onBlur={handleBlur('location')}
                    value={values.location}
                  />
              </View>
              <View style= {styles.row}>
                <Text style={{color:"#777777"}}>{values.phone}</Text>
              </View>
              <View style= {styles.row}>
                <Text style={{color:"#777777"}}>{values.email}</Text>
              </View>
            </View>
            <View style={{ marginLeft: 250, flex: 1, flexDirection: 'row'}}>
              <Pressable onPress={() => {
                console.debug('Cancel edit profile button pressed');
                navigation.goBack();
              }}>
                <View style={{ flexDirection: 'column', justifyContent: "center", alignSelf: "center", marginEnd: 30 }}>
                  <AntDesign name="closecircleo" size={30} color="white" />
                  <Text style={{color: "white"}}>Cancel</Text>
                </View>
              </Pressable>
              <Pressable onPress={async () => {
                await handleSubmit();
                navigation.goBack();
              }}>
                <View style={{ flexDirection: 'column', justifyContent: "center", alignSelf: "center" }}>
                  <AntDesign name="checkcircleo" size={30} color="white" />
                  <Text style={{color: "white"}}>Save</Text>
                </View>
              </Pressable>
            </View>
          </>
        )}
        </Formik>
      </>
    );
};

export default EditProfile;