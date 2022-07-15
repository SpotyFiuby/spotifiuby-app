import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "axios";
import { useSelector } from "react-redux";

const Premium = ({ navigation }: { navigation: any }) => {

    const user = useSelector((state: any) => state.user);
    const upgradeToPremium = async (amount: string) => {
        if(amount === "0") {
            throw new Error("Amount cannot be 0");
        }
        // const res = await axios.put(`https://spotifiuba-usuario.herokuapp.com/users/premium_suscribe/${userId}?amount_to_deposit=${amount}`, {}, {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });
        // if (res.status === 200) {
        //     navigation.navigate("Home");
        // }
        // update user with new premium status
        const res_ = await axios.post(`https://spotifiuba-usuario.herokuapp.com/users/${user.userId}`, {
            isPremium: true,
            ...user,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(res_);
        if (res_.status === 200) {
            navigation.navigate("Home");
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
                upgradeToPremium("9.99");
            }}>
                <Text style={styles.upgradeToPremiumButtonText}>UPGRADE</Text>
            </TouchableOpacity>

        </View>
    );
};

export default Premium;