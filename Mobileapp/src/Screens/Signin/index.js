import React from 'react';
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
} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from 'react-native-animatable';

import { scale, moderateScale, verticalScale } from '../../utils/Scale';
import { TypingAnimation } from 'react-native-typing-animation';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get("screen").width;
class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typing_email: false,
      typing_password: false,
      email: '',
      password: '',
      animation_login: new Animated.Value(width - 40),
      enable: true,
      hidePassword: true,
    }
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }
  _foucus(value) {
    if (value == "email") {
      this.setState({
        typing_email: true,
        typing_password: false
      })
    }
    else {
      this.setState({
        typing_email: false,
        typing_password: true
      })
    }
  }
  _blur(value) {
    if (value == "email") {
      this.setState({
        typing_email: false,

      })
    }
    else {
      this.setState({
        typing_password: false
      })
    }
  }
  _typing() {
    return (
      <TypingAnimation
        dotColor="#154EA3"
        dotRadius={3.5}
        dotMargin={5}
        style={{ marginRight: scale(25), marginBottom: verticalScale(20) }}
      />
    )
  }

  set() {
    this.setState({
      enable: false,
      typing_email: false,
      typing_password: false
    })
  }

  setPasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  render() {
    
    return (
      <View style={{
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center"
      }}>
        <ImageBackground style={{
          width: '100%',
          height: '100%',
          flex: 1,
          position: 'absolute',
        }}
          resizeMode='stretch'
          source={require('../../assets/icons/background.png')}>
          <Image style={{ width: scale(298), height: scale(36), top: verticalScale(108), alignSelf: "center" }}
            source={require('../../assets/icons/logo1.png')} />
          <View style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "center",
            marginTop: verticalScale(216), flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#FFFFFF"
          }}>

            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <Text style={{ fontFamily: "Roboto-Bold", fontSize: scale(24), marginTop: verticalScale(27), marginLeft: scale(31) }}>Log In</Text>

              <View style={{ marginLeft: scale(15), marginRight: scale(15), marginTop: verticalScale(46) }}>

                <View style={{ height: scale(70), backgroundColor: "#F6F7FC", borderRadius: 10, flexDirection: "row" }}>
                  <View style={{ width: "18%", justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ width: scale(23.62), height: scale(25.34), }}
                      source={require('../../assets/icons/user.png')} />
                  </View>
                  <View style={{ width: "70%", }}>
                    <Text style={{ fontFamily: "Roboto-Bold", fontSize: scale(16), marginTop: verticalScale(13), color: "#154EA3", marginLeft: scale(3) }}>USER ID</Text>
                    <TextInput style={{ backgroundColor: "transparent", fontSize: scale(16), fontFamily: "Roboto-Regular" }}
                      placeholder="Enter User ID"
                      onChangeText={(email) => this.setState({ email })}
                      value={this.state.email}
                      keyboardType="email-address"
                      onBlur={() => this._blur("email")}
                      onFocus={() => this._foucus("email")}
                    />
                  </View>
                  {/* <View style={{ width: "12%", justifyContent: "center", alignItems: "center", }}>
                    {this.state.typing_email ?
                      this._typing()
                      : null}

                  </View> */}

                </View>

                <View style={{ height: scale(70), backgroundColor: "#F6F7FC", borderRadius: 10, flexDirection: "row", marginTop: verticalScale(20) }}>
                  <View style={{ width: "18%", justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ width: scale(19.01), height: scale(25.34), }}
                      source={require('../../assets/icons/password.png')} />
                  </View>
                  <View style={{ width: "70%", }}>
                    <Text style={{ fontFamily: "Roboto-Bold", fontSize: scale(16), marginTop: verticalScale(13), color: "#154EA3", marginLeft: scale(3) }}>PASSWORD</Text>
                    <TextInput style={{ backgroundColor: "transparent", fontSize: scale(16), fontFamily: "Roboto-Regular" }}
                      placeholder="Enter User ID"
                      onChangeText={(password) => this.setState({ password })}
                      value={this.state.password}
                      secureTextEntry={this.state.hidePassword}
                      onBlur={() => this._blur("password")}
                      onFocus={() => this._foucus("password")}
                    />
                  </View>
                  <View style={{ width: "12%", justifyContent: "center", }}>
                    <TouchableOpacity activeOpacity={0.8} style={{
                      height: scale(17.35),
                      width: scale(29.74),
                      
                    }} onPress={this.setPasswordVisibility}>
                      <Image source={(this.state.hidePassword) ? require('../../assets/icons/show_Password.png') : require('../../assets/icons/hide_Password.png')} style={{
                        resizeMode: 'contain',
                        height: '100%',
                        width: '100%',
                      }} />
                    </TouchableOpacity>
                    {/* {this.state.typing_password ?
                      this._typing()
                      : null} */}

                  </View>

                </View>

                <Text style={{fontFamily: "Roboto-Regular", fontSize: scale(16), marginTop: verticalScale(10), color: "#707070",alignSelf:"flex-end"}}>Forgot Password</Text>

                <TouchableOpacity
                  //onPress={() => this._animation()}
                  onPress={() => this.props.navigation.navigate('HomeScreen')}
                  style={{ width: "100%", height: scale(55), borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: verticalScale(42) }}
                // disabled={this.state.email && this.state.password ? false : true}
                >
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#3E6AFF', '#154EA3']}
                    style={{ width: "100%", height: scale(55), borderRadius: 10, justifyContent: "center", alignItems: "center", opacity: this.state.email && this.state.password ? 1 : 0.5 }}>
                    <Text style={{ fontSize: scale(22), fontFamily: "Roboto-Bold", color: "#FFFFFF", }}>LOG IN</Text>
                  </LinearGradient>
                </TouchableOpacity>

              </View>
              <View style={{height:scale(50),backgroundColor:"transparent"}} />
            </ScrollView>
            
          </View>
        </ImageBackground>
      </View>

    );
  }
}

var styles = StyleSheet.create({

  animation: {
    backgroundColor: '#154EA3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Signin;