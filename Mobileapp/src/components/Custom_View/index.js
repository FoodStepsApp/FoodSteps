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

class Custom_View extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                ...styles.container, ...this.props.style
            }}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:scale(60),
        justifyContent: "center",
        //alignItems:"center",
        borderRadius:10,
        backgroundColor: "#FFFFFF",
        // bottom:50,
    },
});

export default Custom_View;