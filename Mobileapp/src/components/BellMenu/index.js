import React from "react";
import {
    Button,
    View,
    Text,
    StyleSheet,
    TextInput,
    ImageBackground,
    Image,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    TouchableOpacity,
    PermissionsAndroid,
    Platform,
    Keyboard,
    Switch,
    Alert,
    Animated,
    BackHandler,
    StatusBar
} from "react-native";
import { scale, moderateScale, verticalScale } from '../../utils/Scale';

class BellMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                <TouchableOpacity style={{ }} onPress={()=>alert("hi")}>
                    <Image style={{width:scale(19.13),height:scale(21.05) }}
                        source={require('../../assets/icons/Bell.png')}
                        resizeMode='cover' />
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent:"center",alignItems:"center",marginLeft:scale(10),width:scale(20),height:scale(21.05), }} onPress={()=>alert("hi")}>
                    <Image style={{width:scale(4),height:scale(21.05) }}
                        source={require('../../assets/icons/Menu.png')}
                        resizeMode='cover' />
                </TouchableOpacity>
            </View>
        )
    }
}

export default BellMenu;