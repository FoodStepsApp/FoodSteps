import React from "react";
import { View,Image,Text } from "react-native";
import { blue, grey } from "./styles";
import Icon from 'react-native-vector-icons/AntDesign';
import { scale, moderateScale, verticalScale } from '../../utils/Scale';

type Props = {
  iconName: string;
  isCurrent?: boolean;
};

export const BottomMenuItem = ({ iconName, isCurrent }: Props) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop:verticalScale(-5)
      }}
    >

      <Image
            style={{ width:iconName === "HOME"?  scale(19.41) : 
            iconName === "PROFILE"?  scale(17.77) : 
            iconName === "SHIPMENT"?  scale(26.55) : 
            iconName === "INVENTORY"?  scale(20) : null, 
            height: scale(18)}}
            source={iconName === "HOME" ? isCurrent
              ? require('../../assets/icons/home.png') : require('../../assets/icons/home_disable.png')
            : iconName === "PROFILE" ? isCurrent
            ? require('../../assets/icons/profile.png') : require('../../assets/icons/profile_disable.png') 
            : iconName === "SHIPMENT" ? isCurrent
            ? require('../../assets/icons/Shipment.png') : require('../../assets/icons/Shipment_disable.png')
          :iconName === "INVENTORY" ? isCurrent
          ? require('../../assets/icons/Inventory.png') : require('../../assets/icons/Inventory_disable.png')
        :null }
            resizeMode='contain' />

    <Text style={{ color: isCurrent ? grey : null ,fontFamily:"Roboto-Regular",fontSize:scale(10)}}>{isCurrent ? iconName: null}</Text>
        {/* <Icon
        name={iconName}
        size={32}
        style={{ color: isCurrent ? blue : grey }}
      /> */}
    </View>
  );
};