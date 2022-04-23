import React from "react";
import { Text, Pressable } from "react-native";
import styles from "./styles";

const CustomButton = ({ onPress, text='', bgColor, fgColor, style={}, styleText={} }) => {
    return (
        <Pressable
            onPress={onPress}
            style={
                [{...styles.container, ...style},
                    bgColor ? {backgroundColor: bgColor} : {},
                ]
            }
        >
            <Text 
                style={
                    {...styles.text, ...styleText},
                    fgColor ? {color: fgColor} : {}
                }
            >{text}</Text>
        </Pressable>
    );
};

export default CustomButton;