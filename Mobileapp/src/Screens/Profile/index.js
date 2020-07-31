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
import { scale, moderateScale, verticalScale } from '../../utils/Scale';
import BgView from "../../components/BgView"
import WhiteView from "../../components/WhiteView"
import BellMenu from "../../components/BellMenu";
import Custom_View from "../../components/Custom_View";
import Icon_View from "../../components/Icon_View";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
  handleBackButtonClick () {
    this.props.navigation.navigate('HOME');
    return true;
  }

  render() {
    return (
      <BgView>
        <View style={{ left: scale(16), right: scale(16), top: verticalScale(27), position: "absolute" }}>
          <View style={{ right: 0, position: "absolute" }}>
            <BellMenu />
          </View>
          <View style={{ flexDirection: "row", }}>
            <View style={{ width: scale(47), height: scale(47), borderRadius: 10, backgroundColor: "#e8e8e8", justifyContent: "center", alignItems: "center" }}>
              <Image style={{ width: scale(38), height: scale(38), borderRadius: 10 }}
                source={require('../../assets/icons/user.png')} />
            </View>
            <View style={{ marginLeft: scale(15) }}>
              <Text style={{ fontFamily: "Roboto-Bold", fontSize: scale(24), color: "#FFFFFF", top: verticalScale(15), }}>John Doe</Text>
              <Text style={{ fontFamily: "Roboto-Regular", fontSize: scale(18), color: "#D8D8D8", top: verticalScale(30), }}>FPS -Siddipet Urban</Text>
            </View>
          </View>

          <Custom_View style={{ top: verticalScale(60), height: scale(51) }}>
            <View style={{ left: scale(12), right: scale(12), flexDirection: "row", flex: 1, position: "absolute" }}>
              <Text style={{ fontSize: scale(16), fontFamily: "Roboto-Regular", color: "#4A4A4A" }}>Wallet ID:</Text>
              <Text style={{ fontSize: scale(16), fontFamily: "Roboto-Regular", color: "#154EA3", left: scale(8), width: "76%" }} numberOfLines={1}>E7f6iugx67E7f6iugx67E7f6iugx67E7f6iugx67</Text>
            </View>
          </Custom_View>
        </View>

        <WhiteView>
          <ScrollView showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
          <View style={{ marginRight: scale(16), marginLeft: scale(16), }}>

            <Custom_View style={{ marginTop: verticalScale(25), }}>
              <View style={{ marginRight: scale(7), marginLeft: scale(7), flexDirection: "row", alignItems: "center", }}>
                <Icon_View image={require('../../assets/icons/UserID.png')}
                  image_style={{ width: scale(20), height: scale(20) }} />
                <View style={{ marginLeft: scale(16) }}>
                  <Text style={{ color: "#707070", fontFamily: "Roboto-Regular", fontSize: scale(14), }}>User ID</Text>
                  <Text style={{ color: "#154EA3", fontFamily: "Roboto-Bold", fontSize: scale(16), marginTop: verticalScale(3), }}>4398758479</Text>
                </View>
              </View>
            </Custom_View>

            <Custom_View style={{ marginTop: verticalScale(25), }}>
              <View style={{ marginRight: scale(7), marginLeft: scale(7), flexDirection: "row", alignItems: "center", }}>
                <Icon_View image={require('../../assets/icons/FPSID.png')} />
                <View style={{ marginLeft: scale(16) }}>
                  <Text style={{ color: "#707070", fontFamily: "Roboto-Regular", fontSize: scale(14), }}>FPS ID</Text>
                  <Text style={{ color: "#154EA3", fontFamily: "Roboto-Bold", fontSize: scale(16), marginTop: verticalScale(3), }}>3803002</Text>
                </View>
              </View>
            </Custom_View>

            <Custom_View style={{ marginTop: verticalScale(25), }}>
              <View style={{ marginRight: scale(7), marginLeft: scale(7), flexDirection: "row", alignItems: "center", }}>
                <Icon_View image={require('../../assets/icons/FPSName.png')} />
                <View style={{ marginLeft: scale(16) }}>
                  <Text style={{ color: "#707070", fontFamily: "Roboto-Regular", fontSize: scale(14), }}>FPS Name</Text>
                  <Text style={{ color: "#154EA3", fontFamily: "Roboto-Bold", fontSize: scale(16), marginTop: verticalScale(3), }}>Siddipet Urban</Text>
                </View>
              </View>
            </Custom_View>

            <Custom_View style={{ marginTop: verticalScale(25), }}>
              <View style={{ marginRight: scale(7), marginLeft: scale(7), flexDirection: "row", alignItems: "center", }}>
                <Icon_View image={require('../../assets/icons/FPSAddress.png')} />
                <View style={{ marginLeft: scale(16), flex: 1, }}>
                  <Text style={{ color: "#707070", fontFamily: "Roboto-Regular", fontSize: scale(14), }}>FPS Address</Text>
                  <Text style={{ color: "#154EA3", fontFamily: "Roboto-Bold", fontSize: scale(16), marginTop: verticalScale(3), }} numberOfLines={1}>Hno: 7-10, Durga colony, Siddipet HOHno: 7-10, Durga colony, Siddipet HO</Text>
                </View>
              </View>
            </Custom_View>

            <Custom_View style={{ marginTop: verticalScale(25), }}>
              <View style={{ marginRight: scale(7), marginLeft: scale(7), flexDirection: "row", alignItems: "center", }}>
                <Icon_View image={require('../../assets/icons/Mobile.png')}
                  image_style={{ width: scale(13.55), height: scale(20) }} />
                <View style={{ marginLeft: scale(16) }}>
                  <Text style={{ color: "#707070", fontFamily: "Roboto-Regular", fontSize: scale(14), }}>Mobile Number</Text>
                  <Text style={{ color: "#154EA3", fontFamily: "Roboto-Bold", fontSize: scale(16), marginTop: verticalScale(3), }}>+91 9898980909</Text>
                </View>
              </View>
            </Custom_View>
            <View style={{height:scale(70),backgroundColor:"transparent"}} />
          </View>
          </ScrollView>
        </WhiteView>
      </BgView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
})

export default Profile;