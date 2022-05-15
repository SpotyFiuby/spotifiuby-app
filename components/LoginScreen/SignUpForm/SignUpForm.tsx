import react, {useRef, useState} from 'react';
import { View, Text, TextInput, Button, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import CustomButton from '../../CustomButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
const MIN_PASSWORD_LEN = 6;
import firebase from '../../../firebase';
import PhoneInput from 'react-native-phone-number-input';


const SignUpForm = ({ navigation, signInData = { email: '', password: ''} }) => {
    const signUpFormSchema = Yup.object().shape({
        email: Yup.string().email()
            .required('Email is required'),
        username: Yup.string().required()
            .min(2, 'Username must be at least 2 characters'),
        password: Yup.string().required()
            .min(MIN_PASSWORD_LEN, `Password must be at least ${MIN_PASSWORD_LEN} characters`),
        phone: Yup.string().required()
            .min(10, 'Phone number must be at least 10 characters'),
    });

    const onSignUp = async (email: string, password: string, phone: string) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email,password);
            console.log("Firebase Sign Up successful", email, phone);
        } catch(error) {
            Alert.alert((error as any).message);
        }
    }
    const { email, password } = signInData;
    const [hidePass, setHidePass] = useState(true);
    const [phoneFormattedNumber, setphoneFormattedNumber] = useState('');
    const [phoneCountryCode, setphoneCountryCode] = useState('');
    const phoneInput = useRef<PhoneInput>(null);

    return(
        <>
        <View style={{ alignSelf: 'flex-start', marginRight: 10 }}>
                <Button title="Back" onPress={() => {
                    return navigation.goBack();
                }} />
        </View>
        <View style={styles.container}>
            <Formik 
                initialValues={{email,username: '', password, phone: ''}}
                validationSchema={signUpFormSchema}
                onSubmit={(values) => {
                    console.log(phoneFormattedNumber);
                    // onSignUp(values.email, values.password, phoneFormattedNumber)
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
                        <View style={[
                            styles.inputField,
                            {
                                borderColor: 1 > values.username.length || values.username.length >= 2 ? '#ccc' : 'red',
                            }
                        ]}>
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor='#444'
                                autoCapitalize= 'none'
                                textContentType= 'username'
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>
                        <View 
                            style={[
                                styles.phoneInputField,
                                {
                                    borderColor: 
                                    
                                    values.phone == '' || phoneInput.current?.isValidNumber(values.phone) ? '#ccc' : 'red',
                                }
                            ]}>
                            <PhoneInput
                                ref={phoneInput}
                                defaultValue={values.phone}
                                defaultCode="AR"
                                layout="first"
                                onChangeText={handleChange('phone')}
                                onChangeFormattedText={(text) => {
                                setphoneFormattedNumber(text);
                                setphoneCountryCode(phoneInput.current?.getCountryCode() || '');
                                }}
                                countryPickerProps={{withAlphaFilter:true}}
                                withDarkTheme
                                withShadow
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
                        <CustomButton onPress={handleSubmit} text="Sign Up" style={styles.signUpButton(
                            isValid && phoneInput.current?.isValidNumber(phoneFormattedNumber)
                        )}/>

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