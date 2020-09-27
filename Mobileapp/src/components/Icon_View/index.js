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

class Icon_View extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (


            <View style={{
                ...styles.container, ...this.props.style
            }}>
                <Image style={{...styles.image, ...this.props.image_style}}
                        source={this.props.image}
                        resizeMode='cover' />
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
        justifyContent: "center",
        alignItems:"center",
        height:scale(30),width:scale(30),
        borderRadius:10, 
        backgroundColor: "#F6F7F9",
        // bottom:50,
    },
    image:{
        width:scale(30),height:scale(30)
    }
});

export default Icon_View;