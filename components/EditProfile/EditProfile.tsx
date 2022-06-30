import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import React from "react";
import { Pressable, View, Text, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateUserData } from "../Profile/Profile";
import UploadImage from "../UploadImage";
import styles from "./styles";

const EditProfile = ({navigation}: {navigation: any}) => {
    const user = getProfile() as any;
    const dispatch = useDispatch();
    return (
      <>
        <Formik 
          initialValues={{
            ...user,
          }}
          // validationSchema={}
          onSubmit={async (values) => {
            // updating profile
            console.log(`updating profile with: ${JSON.stringify(values)}`);
            console.log(user);
            await updateUserData(user.token, user.userId, values, dispatch);
          }}
          validateOnMount={true}
        >{({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <View style={styles.userInfoSection}>
              <View style={{flexDirection: 'row', marginTop:15}}>
                <UploadImage profileImage={user.profileImage} userId={user.userId}/>
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
                      (()=>{
                        if(values.username) {
                          return `@${user.email.split('@')[0]}`;
                        }
                        return values.username[0] != '@'? `@${values.username}`: values.username
                      })()
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