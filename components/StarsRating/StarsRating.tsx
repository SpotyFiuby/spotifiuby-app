import React from "react";
import { View } from "react-native";
import styles from "./styles";
import StarRating from 'react-native-star-rating-widget';


const StarsRating = ({score, readOnly, onChanged}: {score: number, readOnly: boolean, onChanged: any }) => {  
  return (
    <View>
      <StarRating
        rating={score}
        maxStars={5}
        enableHalfStar={true}
        starSize={26}
        onChange={(rating) => {
          if(readOnly) return;
          onChanged(rating);
        }}
      />
    </View>
  );
};

export default StarsRating;
