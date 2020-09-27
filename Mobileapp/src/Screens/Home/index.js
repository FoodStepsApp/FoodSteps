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
import LottieView from 'lottie-react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { scale, moderateScale, verticalScale } from '../../utils/Scale';
import BgView from "../../components/BgView"
import WhiteView from "../../components/WhiteView"
import Custom_Bottom from "../../components/Custom_Bottom";
import BellMenu from "../../components/BellMenu";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BgView>
        <View style={{ left: scale(16), right: scale(16), top: verticalScale(27), position: "absolute" }}>
          <View style={{ flexDirection: "row", }}>
            <View style={{ width: scale(38), height: scale(38), borderRadius: 10, backgroundColor: "#e8e8e8" }}>
              <Image style={{ width: scale(38), height: scale(38), borderRadius: 10 }}
                source={require('../../assets/icons/user.png')} />
            </View>
            <View style={{ right: 0, position: "absolute" }}>
              <BellMenu />
            </View>
          </View>
          <Text style={{ fontFamily: "Roboto-Regular", fontSize: scale(16), color: "#D8D8D8", top: verticalScale(5), }}>Welcome John Doe</Text>
          <Text style={{ fontFamily: "Roboto-Bold", fontSize: scale(20), color: "#D8D8D8", top: verticalScale(5), }}>FPS 65765765</Text>

          <View style={{ flexDirection: "row", top: verticalScale(16), justifyContent: "space-around", }}>
            <Custom_Bottom
              label="Create"
              backgroundColor="#FFDEDA"
              image={require('../../assets/icons/create.png')}
              onPress={() => this.props.navigation.navigate('Create_Shipment')} />
            <Custom_Bottom
              label="Receive"
              backgroundColor="#DFFCF4"
              image={require('../../assets/icons/Receive.png')} />
            <Custom_Bottom
              label="Track"
              backgroundColor="#EBF0FF"
              image={require('../../assets/icons/track.png')}
              image_style={{ width: scale(25.59), }} />
            <Custom_Bottom
              label="Add Waste"
              backgroundColor="#FFF7E5"
              image={require('../../assets/icons/Wastebag.png')}
              image_style={{ width: scale(27.568), }} />
          </View>
        </View>

        <WhiteView>
          <ScrollView showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {/* <Text onPress={() => this.props.navigation.navigate('Auth')}>Home</Text> */}
            <View style={{ marginRight: scale(16), marginLeft: scale(16), marginTop: verticalScale(25) }}>

              <View style={{ backgroundColor: "#FFFFFF", height: scale(80), borderRadius: 10, flexDirection: "row" }}>
                <View style={{ width: "50%" }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: scale(30), height: scale(30), borderRadius: 100, backgroundColor: "#DFFCF4", marginTop: verticalScale(10), marginLeft: scale(10), justifyContent: "center", alignItems: "center" }}>
                      <Image style={{ width: scale(20.07), height: scale(16.73) }}
                        source={require('../../assets/icons/Total_Shipment.png')} />
                    </View>
                    <View style={{ marginLeft: scale(10), marginTop: verticalScale(10), }}>
                      <Text style={{ color: "#707070", fontFamily: "Roboto-Regular", fontSize: scale(16), }}>Total Shipments</Text>
                      <Text style={{ color: "#008663", fontFamily: "Roboto-Bold", fontSize: scale(30), marginTop: verticalScale(10) }}>21</Text>

                    </View>
                  </View>
                </View>
                <View style={{ width: "50%" }}>
                  <LottieView source={require('../../assets/Json/chart.json')} autoPlay loop />
                </View>
              </View>

              <View style={{ marginTop: verticalScale(20), flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ width: "48%", height: scale(270), justifyContent: "space-between" }}>
                  <View style={{ width: "100%", height: "48%", backgroundColor: "#FFFFFF", borderRadius: 10, }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: scale(30), height: scale(30), borderRadius: 100, backgroundColor: "#EBF0FF", marginTop: verticalScale(10), marginLeft: scale(10), justifyContent: "center", alignItems: "center" }}>
                        <Image style={{ width: scale(20.07), height: scale(20.07) }}
                          source={require('../../assets/icons/Shipment_receives.png')} />
                      </View>
                      <View style={{ marginLeft: scale(10), marginTop: verticalScale(10), }}>
                        <Text style={{ color: "#707070", fontFamily: "Roboto-Regular", fontSize: scale(16), width: "90%" }}>Shipments Received</Text>
                        <Text style={{ color: "#154EA3", fontFamily: "Roboto-Bold", fontSize: scale(30), marginTop: verticalScale(20) }}>21</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ width: "100%", height: "48%", backgroundColor: "#FFFFFF", borderRadius: 10, }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: scale(30), height: scale(30), borderRadius: 100, backgroundColor: "#FFF7E5", marginTop: verticalScale(10), marginLeft: scale(10), justifyContent: "center", alignItems: "center" }}>
                        <Image style={{ width: scale(20.07), height: scale(20.07) }}
                          source={require('../../assets/icons/Shipment_Intransit.png')} />
                      </View>
                      <View style={{ marginLeft: scale(10), marginTop: verticalScale(10), }}>
                        <Text style={{ color: "#707070", fontFamily: "Roboto-Regular", fontSize: scale(16), width: "90%" }}>Shipments InTransit</Text>
                        <Text style={{ color: "#FF7600", fontFamily: "Roboto-Bold", fontSize: scale(30), marginTop: verticalScale(20) }}>12</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ width: "48%", height: scale(270), backgroundColor: "#FFFFFF", borderRadius: 10, }}>
                  <View style={{ marginTop: verticalScale(10), justifyContent: "center", alignItems: "center", height: scale(150) }}>
                    <AnimatedCircularProgress
                      size={scale(135)}
                      rotation={0}
                      width={scale(10)}
                      lineCap={'round'}
                      fill={1.3}
                      tintColor="#FF5C45"
                      backgroundColor="#fadfdb" />
                    <AnimatedCircularProgress
                      style={{ marginTop: verticalScale(-117), position: "absolute" }}
                      size={scale(105)}
                      rotation={0}
                      width={scale(10)}
                      lineCap={'round'}
                      fill={5.5}
                      tintColor="#3E6AFF"
                      backgroundColor="#d9e2fc" />
                    <AnimatedCircularProgress
                      style={{ marginTop: -109, position: "absolute" }}
                      size={scale(75)}
                      rotation={0}
                      width={scale(10)}
                      lineCap={'round'}
                      fill={0.3}
                      tintColor="#FFAC00"
                      backgroundColor="#fceed0" />
                  </View>
                  <View style={{ flexDirection: "row", marginTop: verticalScale(10), justifyContent: "space-between", alignItems: "center", marginLeft: scale(10), marginRight: scale(10) }}>
                    <View style={{ width: scale(10), height: scale(10), borderRadius: 100, backgroundColor: "#FF5C45", }} />
                    <Text style={{ fontFamily: "Roboto-Bold", fontSize: scale(10), color: "#969696", }}>AFSC Rice</Text>
                    <Text style={{ fontFamily: "Roboto-Bold", fontSize: scale(18), color: "#000000", }}>130</Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: verticalScale(10), justifyContent: "space-between", alignItems: "center", marginLeft: scale(10), marginRight: scale(10) }}>
                    <View style={{ width: scale(10), height: scale(10), borderRadius: 100, backgroundColor: "#3E6AFF", }} />
                    <Text style={{ fontFamily: "Roboto-Bold", fontSize: scale(10), color: "#969696", }}>FSC Rice</Text>
                    <Text style={{ fontFamily: "Roboto-Bold", fontSize: scale(18), color: "#000000", }}>55</Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: verticalScale(10), justifyContent: "space-between", alignItems: "center", marginLeft: scale(10), marginRight: scale(10) }}>
                    <View style={{ width: scale(10), height: scale(10), borderRadius: 100, backgroundColor: "#FFAC00", }} />
                    <Text style={{ fontFamily: "Roboto-Bold", fontSize: scale(10), color: "#969696", }}>AAP Rice</Text>
                    <Text style={{ fontFamily: "Roboto-Bold", fontSize: scale(18), color: "#000000", }}>30</Text>
                  </View>
                </View>


              </View>

              <View style={{ height: scale(100), backgroundColor: "transparent" }} />
              {/* <Text style={{ color: "#008663", fontFamily: "Roboto-Bold", fontSize: scale(30), marginTop: verticalScale(10) }}>21</Text>
              <Text style={{ color: "#008663", fontFamily: "Roboto-Bold", fontSize: scale(30), marginTop: verticalScale(10) }}>21</Text>
              <Text style={{ color: "#008663", fontFamily: "Roboto-Bold", fontSize: scale(30), marginTop: verticalScale(10) }}>21</Text>
              <Text style={{ color: "#008663", fontFamily: "Roboto-Bold", fontSize: scale(30), marginTop: verticalScale(10) }}>21</Text>
              <Text style={{ color: "#008663", fontFamily: "Roboto-Bold", fontSize: scale(30), marginTop: verticalScale(10) }}>21</Text>
              <Text style={{ color: "#008663", fontFamily: "Roboto-Bold", fontSize: scale(30), marginTop: verticalScale(10) }}>21</Text> */}
            </View>
          </ScrollView>
        </WhiteView>

      </BgView>
      // <View style={{height:scale(50),backgroundColor:"transparent"}} />


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

export default Home;


// </View>
      // <View style={{
      //   flex: 1,
      //   backgroundColor: "transparent",
      //   justifyContent: "center"
      // }}>
      //   <StatusBar hidden />
      //   <ImageBackground style={{
      //     width: '100%',
      //     height: '100%',
      //     flex: 1,
      //     position: 'absolute',
      //   }}
      //     resizeMode='stretch'
      //     source={require('../../assets/icons/background.png')}>
      //   </ImageBackground>

      //   <View style={{
      //     flex: 1,
      //     backgroundColor: "transparent",
      //     justifyContent: "center",
      //     marginTop: verticalScale(216), flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#FFFFFF"
      //   }}></View>
      // </View>
      //   <View style={styles.container}>
      //   <Text onPress={()=>this.props.navigation.navigate('Auth')}>Home</Text>
      // </View>