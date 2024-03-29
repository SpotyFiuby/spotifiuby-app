import {useState} from 'react';
import { View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import CustomButton from '../../Buttons/CustomButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
import React from 'react';
const MIN_PASSWORD_LEN = 6;

const SignInForm = ({navigation, onSignIn, onForgotPassword, onSignUp}:{navigation: any, onSignIn: any, onForgotPassword: any, onSignUp: any}) => {
    const loginFormSchema = Yup.object().shape({
        email: Yup.string().email()
            .required('Email is required'),
        password: Yup.string().required()
            .min(MIN_PASSWORD_LEN, `Password must be at least ${MIN_PASSWORD_LEN} characters`)
    });

    const [hidePass, setHidePass] = useState(true);

    return(
        <View style={styles.container}>
            <Formik 
                initialValues={{email: '', password: ''}}
                validationSchema={loginFormSchema}
                onSubmit={(values) => {
                    onSignIn(values.email,values.password);
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
                                placeholder="Username or email"
                                placeholderTextColor='#444'
                                autoCapitalize= 'none'
                                autoCorrect={false}
                                keyboardType= 'email-address'
                                textContentType= 'emailAddress'
                                autoFocus= {true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View style={[
                            styles.inputField,
                            {
                                borderColor: 1 > values.password.length || values.password.length >= MIN_PASSWORD_LEN ? '#ccc' : 'red',
                            }
                        ]}>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInputStyle}
                                    placeholder='Password'
                                    placeholderTextColor='#444'
                                    autoCorrect={false}
                                    autoCapitalize= 'none'
                                    autoCompleteType="password"
                                    secureTextEntry={hidePass ? true : false}
                                    textContentType= 'password'
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    />
                                <Icon
                                    name={hidePass ? 'eye' : 'eye-slash'}
                                    color='#000'
                                    onPress={() => setHidePass(!hidePass)}
                                    size={14}
                                />
                            </View>
                        </View>

                        <View style={styles.forgotPasswordCtn}> 
                            <Text style={styles.forgotPasswordText} onPress={() => onForgotPassword(values.email)}>Forgot Password?</Text>
                        </View>

                        <CustomButton onPress={handleSubmit} text="Sign In" style={styles.signInButton(isValid)}/>

                        <View style={styles.signUpCtn}>
                            <Text style={{color: "grey"}}>_____________________________________</Text>
                            <Text style={styles.signUpAccountText}>Don't have an account?</Text>
                            <CustomButton 
                                onPress={onSignUp}
                                text="SIGN UP FOR SPOTIFIUBY"
                                style={styles.signUpButton}
                                styleText={styles.signUpText}
                            />
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

export default SignInForm;