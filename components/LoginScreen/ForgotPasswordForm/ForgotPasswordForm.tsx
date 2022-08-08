import { View, TextInput, Button, Alert} from 'react-native';
import styles from './styles';
import CustomButton from '../../Buttons/CustomButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
import { firebase } from '../../../firebase';
import React from 'react';
import axios from 'axios';


const getCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
}

const ForgotPasswordForm = ({ navigation, forgotPasswordData = { email: '' } }) => {
    const ForgotPasswordFormSchema = Yup.object().shape({
        email: Yup.string().email()
            .required('Email is required'),
    });

    const { email } = forgotPasswordData;

    const sendMailRecovery = async (email: string) => {
        try {
            await firebase.auth().sendPasswordResetEmail(email);

            try {
                const res = await axios.post(`https://spotifiuba-metricas.herokuapp.com/metrics/resetpassword`, {
                    date: getCurrentDate(),
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                        }
                });
            }
            catch(error) {
                console.error(error);
            }
            
            Alert.alert(
                '✔ Email sent', '',
                [
                    {text: 'OK', onPress: () => {
                        console.debug('User pressed modal button Ok');
                        return navigation.navigate('SignInScreen');
                    }, style: 'cancel'},
                ],
            );

            

        } catch(error) {
            Alert.alert(
                '⚠ Email not found', '',
                [
                    {text: 'OK', onPress: () => console.debug('User pressed modal button Ok'), style: 'cancel'},
                    {text: 'Sign In', onPress: () => {
                        console.debug('User pressed modal button Sign In');
                        return navigation.navigate('SignInScreen');
                    }, style: 'cancel'}
                ],
            );
        }
    };

    return(
        <>
        <View style={{ alignSelf: 'flex-start', marginRight: 10 }}>
                <Button title="Back" onPress={() => {
                    return navigation.goBack();
                }} />
        </View>
        <View style={styles.container}>
            <Formik
                initialValues={{ email }}
                validationSchema={ForgotPasswordFormSchema}
                onSubmit={(values) => {
                    sendMailRecovery(values.email)
                }}
                validateOnMount={true}
            >{({handleChange, handleBlur, handleSubmit, values, isValid}) => (
                    <>
                        <View style={[
                            styles.inputField,
                            {
                                borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red',
                            }
                        ]}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor='#444'
                                autoCapitalize= 'none'
                                keyboardType= 'email-address'
                                textContentType= 'emailAddress'
                                autoFocus= {true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <CustomButton onPress={handleSubmit} text="Send mail recovery" style={styles.sendMailRecoveryButton(isValid)}/>

                        {/* <View style={styles.signInCtn}>
                            <Text style={styles.signInText}>Already got an account?</Text>
                            <Text style={styles.signInLink} onPress={() => {
                                return navigation.navigate('SignInScreen');
                            }
                            }>Sign In</Text>
                        </View> */}
                    </>
                )}
            </Formik>
        </View>
        </>
    )
}

export default ForgotPasswordForm;