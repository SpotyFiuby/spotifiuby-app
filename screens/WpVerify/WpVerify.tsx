import React, { useState } from "react";
import { SafeAreaView, Button, Text } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { checkVerification, sendWhatsappVerification } from "../../components/LoginScreen/verify/verify";
import styles from "./styles";
import { DeviceEventEmitter } from "react-native"


const WpVerify = ({ route, navigation }: {route: any, navigation: any}) => {
 const {
    phone: phoneNumber,
    countryCode,
    username,
    email,
    password,
} = route.params;
 const [invalidCode, setInvalidCode] = useState(false);
 const [clearInput, setclearInput] = useState(false)
 const [code, setCode] = useState('');

  const _handlerVerifyWp = (code: string) => {
        checkVerification(phoneNumber, code).then(async (success) => {
          if (!success) {
            console.debug("Invalid code");  
            setInvalidCode(true);
          } else {
            console.debug("Valid code, emitting event: onSuccessfullWpVerify");
            DeviceEventEmitter.emit("event.onSuccessfullWpVerify", {
                phoneNumber,
                countryCode,
                username,
                email,
                password,
            });
          }
        });
  };

 return (
   <SafeAreaView style={styles.wrapper}>
     <Text style={styles.prompt}>Enter the code we sent you to</Text>
     <Text style={styles.prompt}>{phoneNumber}</Text>
     <Button
       title="Change phone number"
       onPress={() => navigation.goBack()}
     />
     <OTPInputView
        style={{ 
          width: "80%",
          height: 200,
        }}
        placeholderTextColor="black"
        pinCount={6}
        code={code}
        onCodeChanged={(code)=>{
          setCode(code);
          setclearInput(false);
        }}
        clearInputs={clearInput}
        onCodeFilled={(code)=>_handlerVerifyWp(code)}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
     />
     <Button title="Resend code" onPress={() => {
       setclearInput(true);
        console.log(phoneNumber);
        console.debug(`resend code to ${phoneNumber}`);
        sendWhatsappVerification(phoneNumber).then((sent) => {
            if(sent) {
                setInvalidCode(false);
            }
        });
     }} />
     {invalidCode && 
     (
        <>
            <Text style={styles.error}>Incorrect code.</Text>
        </>
    )}
   </SafeAreaView>
 );
};

export default WpVerify;