import react, {useState} from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';
import CustomButton from '../../CustomButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
const MIN_PASSWORD_LEN = 6;

const SignInForm = ({navigation}) => {
    const loginFormSchema = Yup.object().shape({
        email: Yup.string().email()
            .required('Email is required'),
        password: Yup.string().required()
            .min(MIN_PASSWORD_LEN, `Password must be at least ${MIN_PASSWORD_LEN} characters`)
    });


    return(
        <View style={styles.container}>
            <Formik 
                initialValues={{email: '', password: ''}}
                validationSchema={loginFormSchema}
                onSubmit={(values) => {
                    console.log(values);
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
                                autocapitalize= 'none'
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
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor='#444'
                                autocapitalize= 'none'
                                secureTextEntry= {true}
                                autoCorrect= {false}
                                textContentType= 'password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>

                        <View style={styles.forgotPasswordCtn}> 
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </View>

                        <CustomButton onPress={handleSubmit} text="Sign In" style={styles.signInButton(isValid)}/>

                        <View style={styles.signUpCtn}>
                            <Text style={{color: "grey"}}>_____________________________________</Text>
                            <Text style={styles.signUpAccountText}>Don't have an account?</Text>
                            <CustomButton 
                                onPress={() => navigation.push('SignUpScreen')}
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