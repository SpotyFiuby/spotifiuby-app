import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const Premium = ({ navigation }: { navigation: any }) => {
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

            <TouchableOpacity style={styles.upgradeToPremiumButton}  onPress={() => {console.log("PREMIUM")}}>
                <Text style={styles.upgradeToPremiumButtonText}>UPGRADE</Text>
            </TouchableOpacity>

        </View>
    );
};

export default Premium;