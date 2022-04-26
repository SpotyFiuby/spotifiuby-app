import react, {useState} from 'react';
import { View, Text, TextInput, Button, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import CustomButton from '../../CustomButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
const MIN_PASSWORD_LEN = 6;
import firebase from '../../../firebase';


const SignUpForm = ({ navigation }) => {
    const signUpFormSchema = Yup.object().shape({
        email: Yup.string().email()
            .required('Email is required'),
        username: Yup.string().required()
            .min(2, 'Username must be at least 2 characters'),
        password: Yup.string().required()
            .min(MIN_PASSWORD_LEN, `Password must be at least ${MIN_PASSWORD_LEN} characters`)
    });

    const onSignUp = async (email, password) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email,password);
            console.log("Firebase Sign Up successful", email, password);
        } catch(error) {
            Alert.alert(error.message);
        }
    }

    const [hidePass, setHidePass] = useState(true);

    return(
        <>
        <View style={{ alignSelf: 'flex-start', marginRight: 10 }}>
                <Button title="Back" onPress={() => {
                    return navigation.goBack();
                }} />
        </View>
        <View style={styles.container}>
            <Formik 
                initialValues={{email: '',username: '', password: ''}}
                validationSchema={signUpFormSchema}
                onSubmit={(values) => {
                    onSignUp(values.email, values.password)
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
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInputStyle}
                                    placeholder='Password'
                                    placeholderTextColor='#444'
                                    autoCorrect={false}
                                    autocapitalize= 'none'
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
                        <CustomButton onPress={handleSubmit} text="Sign Up" style={styles.signUpButton(isValid)}/>

                        <View style={styles.signInCtn}>
                            <Text style={styles.signInText}>Already got an account?</Text>
                            <Text style={styles.signInLink} onPress={() => {
                                return navigation.navigate('SignInScreen');
                            }
                            }>Sign In</Text>
                        </View>
                    </>
                )}
            </Formik>
        </View>
        </>
    )
}

export default SignUpForm;