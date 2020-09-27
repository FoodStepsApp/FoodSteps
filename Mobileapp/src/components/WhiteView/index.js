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

class WhiteView extends React.Component {
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

            //   <View style={styles.container}>
            //   <Text onPress={()=>this.props.navigation.navigate('Auth')}>Home</Text>
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        marginTop: verticalScale(216), 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        backgroundColor: "#F5F7FA",
        // bottom:50,
    },
});

export default WhiteView;