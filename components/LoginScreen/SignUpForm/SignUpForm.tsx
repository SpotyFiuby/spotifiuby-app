import react, {useState} from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './styles';
import CustomButton from '../../CustomButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
const MIN_PASSWORD_LEN = 6;

const SignUpForm = ({navigation}) => {
    const signUpFormSchema = Yup.object().shape({
        email: Yup.string().email()
            .required('Email is required'),
        username: Yup.string().required()
            .min(2, 'Username must be at least 2 characters'),
        password: Yup.string().required()
            .min(MIN_PASSWORD_LEN, `Password must be at least ${MIN_PASSWORD_LEN} characters`)
    });


    return(
        <>
        <View style={{ alignSelf: 'flex-start', marginRight: 10 }}>
                <Button title="Back" onPress={() => {
                    console.debug("Back button pressed");
                    console.debug(this);
                    return navigation.goBack();
                }} />
        </View>
        <View style={styles.container}>
            <Formik 
                initialValues={{email: '',username: '', password: ''}}
                validationSchema={signUpFormSchema}
                onSubmit={(values) => {
                    console.log(values); // DO SOMETHING WITH VALUES HERE TO SIGN UP
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
                                borderColor: 1 > values.username.length || values.username.length >= 2 ? '#ccc' : 'red',
                            }
                        ]}>
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor='#444'
                                autocapitalize= 'none'
                                textContentType= 'username'
                                autoFocus= {true}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
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
                        <CustomButton onPress={handleSubmit} text="Sign Up" style={styles.signUpButton(isValid)}/>
                    </>
                )}
            </Formik>
        </View>
        </>
    )
}

export default SignUpForm;