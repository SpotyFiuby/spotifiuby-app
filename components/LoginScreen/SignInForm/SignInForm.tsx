import react, {useState} from 'react';
import { View, Text, TextInput, Switch, Alert, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import CustomButton from '../../CustomButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
const MIN_PASSWORD_LEN = 6;
import firebase from '../../../firebase';

const SignInForm = ({navigation}:{navigation: any}) => {
    const loginFormSchema = Yup.object().shape({
        email: Yup.string().email()
            .required('Email is required'),
        password: Yup.string().required()
            .min(MIN_PASSWORD_LEN, `Password must be at least ${MIN_PASSWORD_LEN} characters`)
    });
    const onSignIn = async (email: string,password: string ) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email,password)
            console.debug(`Firebase SingIn successful with email: ${email}`);
        } catch(error) {
            Alert.alert(
                '⚠ Incorrect username or password.', '',
                [
                  {text: 'OK', onPress: () => console.debug('User pressed modal button Ok'), style: 'cancel'},
                  {text: 'Sign Up', onPress: () => {
                        console.debug('User pressed modal button Sign Up');
                        return navigation.navigate('SignUpScreen', {
                            email,
                            password,
                          });
                    }},
                ],
            );
        }
    }

    const onForgotPassword = async (email: string) => {
        console.log(`Forgot Password, email: ${email}`);
        navigation.navigate('ForgotPasswordScreen', {
            email,
        });
    };

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