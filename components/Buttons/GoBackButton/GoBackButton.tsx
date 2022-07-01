import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, Pressable, TouchableOpacity, View } from "react-native";

const CustomButton = () => {

    const navigation = useNavigation()
    
    return (
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <View style={{marginTop: 10, marginLeft: 10, flexDirection: "row", alignItems: "center"}} >
                <FontAwesome name="angle-left" size={40} color="blue" />
                <Text style={{color: "blue", fontSize: 25, marginLeft: 10}}> Back</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CustomButton;



