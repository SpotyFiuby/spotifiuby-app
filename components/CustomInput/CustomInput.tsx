import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./styles";

const CustomInput = ({ value='', setValue, placeholder='', secureTextEntry=false }) => {
    return (
    <View style={styles.container}>
        <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.input} 
            secureTextEntry={secureTextEntry}
        />
    </View>
    );
};

export default CustomInput;