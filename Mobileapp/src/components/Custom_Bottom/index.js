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

class Custom_Bottom extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{justifyContent:"center",alignItems:"center",}}>
                <TouchableOpacity style={{ width: scale(46), height: scale(46), backgroundColor: this.props.backgroundColor, borderRadius: 10, justifyContent: "center", alignItems: "center" }}
                onPress={this.props.onPress}
                activeOpacity={1}>
                    <Image style={{ ...styles.image, ...this.props.image_style }}
                        source={this.props.image} />
                </TouchableOpacity>
                <Text style={{ fontFamily: "Roboto-Regular", fontSize: scale(14), color: "#FFFFFF", top: verticalScale(5), }}>{this.props.label}</Text>
            </View>

// <TouchableOpacity style={{ top: verticalScale(5), width: scale(46), height: scale(46), backgroundColor: "#fff", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
// <Image style={{ width: scale(31.64), height: scale(31.64) }}
//   source={require('../../assets/icons/user.png')} />
// </TouchableOpacity>
// <Text style={{ fontFamily: "Roboto-Regular", fontSize: scale(16), color: "#D8D8D8", top: verticalScale(5), }}>Welcome John Doe</Text>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: scale(31.64), height: scale(31.64)
    },
});

export default Custom_Bottom;