import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, Button } from "react-native";

const CustomButton = () => {

    const navigation = useNavigation()
    
    return (
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <View style={{ alignSelf: 'flex-start', marginLeft: 20, flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="angle-left" size={20} color="blue" />
                <Button title="Back" onPress={() => {
                    return navigation.goBack();
                }} />
            </View>
        </TouchableOpacity>
    );
};

export default CustomButton;



