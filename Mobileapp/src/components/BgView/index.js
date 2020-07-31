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

class BgView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: "transparent",
      }}>
        {/* <StatusBar hidden /> */}
        <ImageBackground style={{
          width: '100%',
          height: '100%',
          flex: 1,
          position: 'absolute',
        }}
          resizeMode='cover'
          source={require('../../assets/icons/background.png')}>
        </ImageBackground>
        {this.props.children}
        {/* <View style={{
          flex: 1,
          backgroundColor: "transparent",
          justifyContent: "center",
          marginTop: verticalScale(216), flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#FFFFFF"
        }}>
          {this.props.children}
        </View> */}
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
    backgroundColor: "#55efc4",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BgView;