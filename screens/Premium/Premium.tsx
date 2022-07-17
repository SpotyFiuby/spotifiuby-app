import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import { Entypo } from '@expo/vector-icons';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsPremium } from "../../store/actions/user.action";

const Premium = ({ navigation }: { navigation: any }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const upgradeToPremium = async (amount: string) => {
        if(amount === "0") {
            throw new Error("Amount cannot be 0");
        }
        const res = await axios.put(`https://spotifiuba-usuario.herokuapp.com/users/premium_suscribe/${user.userId}?amount_to_deposit=${amount}`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status === 200) {
            Alert.alert(
                "Successfully upgraded to premium",
                "You can now enjoy all the features of the app",
                [
                    
                  {
                    text: "Continue",
                    onPress: () => {
                        dispatch(setIsPremium(true));
                        return navigation.navigate('home');
                    },
                    style: "default",
                  },
                ],
                {
                  cancelable: true,
                }
              )                
        } else {
            Alert.alert(
                "cannot upgrade to premium",
                "Contact suppport",
                [
                    
                  {
                    text: "Return to home",
                    onPress: () => {
                        return navigation.navigate('home');
                    },
                    style: "default",
                  },
                  {
                    text: "Continue",
                    style: "cancel",
                  }
                ],
                {
                  cancelable: true,
                }
              )
        }        
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Spotifiuby Premium</Text>
            
            <View style={{flexDirection: 'row', alignItems: 'center', margin: 20}}>
                <View style={{flex: 1, height: 1, backgroundColor: '#808080'}} />
                    <View>
                        <Text style={{width: 100, textAlign: 'center', color: "#808080", fontSize: 20}}>BENEFITS</Text>
                    </View>
                <View style={{flex: 1, height: 1, backgroundColor: '#808080',}} />
            </View>


            <View style={styles.bennefitContainer}>
                <Entypo name="check" style={{marginRight: 20}} size={24} color="#1CD05D" />
                <Text style={styles.benefitText}>Access to exclusive albums</Text>
            </View>
            <View style={styles.bennefitContainer}>
                <Entypo name="check" style={{marginRight: 20}} size={24} color="#1CD05D" />
                <Text style={styles.benefitText}>Access to exclusive songs</Text>
            </View>


            <View style={{flexDirection: 'row', alignItems: 'center', marginTop:50, marginLeft: 20, marginRight: 20,}}>
                <View style={{flex: 1, height: 1, backgroundColor: '#808080'}} />
            </View>

            <Text style={styles.price}>$9.99</Text>

            <TouchableOpacity style={styles.upgradeToPremiumButton}  onPress={() => {
                console.log("pressed premium button");
                upgradeToPremium("0.000011");
            }}>
                <Text style={styles.upgradeToPremiumButtonText}>UPGRADE</Text>
            </TouchableOpacity>

        </View>
    );
};

export default Premium;