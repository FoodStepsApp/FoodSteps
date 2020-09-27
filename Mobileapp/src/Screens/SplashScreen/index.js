import React from 'react';
import { Button, View, Text, StyleSheet, ImageBackground, Image, StatusBar, Animated } from 'react-native';
import { scale, moderateScale, verticalScale } from '../../utils/Scale';
import AsyncStorage from '@react-native-community/async-storage';
import MaskedView from '@react-native-community/masked-view';

class ImageLoader extends React.Component {
    state = {
        opacity: new Animated.Value(0),
    }

    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }

    render() {
        return (
            <Animated.Image
                onLoad={this.onLoad}
                {...this.props}
                style={[
                    {
                        opacity: this.state.opacity,
                        transform: [
                            {
                                scale: this.state.opacity.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.85, 1],
                                })
                            }
                        ]
                    },
                    this.props.style,
                ]}
            />
        )
    }
}

class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            springVal: new Animated.Value(0.8),
            fadeVal: new Animated.Value(1)
        }
    }

    componentDidMount = async () => {
        
        setTimeout(() => {
            console.log("splash_Screen");
            // this.spring()
            this.props.navigation.navigate('Auth')
        }, 5000);
    }

    // spring() {
    //     Animated.sequence([
    //         Animated.spring(this.state.springVal, {
    //           toValue: 0.6,
    //           friction: 7,
    //           tension: 20
    //         }),
    //         Animated.parallel([
    //           Animated.spring(this.state.springVal, {
    //             toValue: 17.5,
    //             friction: 7,
    //             tension: 5
    //           }),
    //           Animated.timing(this.state.fadeVal, {
    //             toValue: 0,
    //             duration: 200
    //           })
    //         ])
    //       ]).start();
    //   }

    render() {
        return (
            <ImageBackground style={styles.imgBackground}
                resizeMode='cover'
                source={require('../../assets/icons/splash_screen_background.png')}>
                <StatusBar hidden />

                <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: 'transparent', }}>
                <ImageLoader
                        style={{ width: scale(298), height: scale(36), }}
                        source={require("../../assets/icons/logo2.png")}
                        resizeMode='contain'
                    />
                   
                </View>

                {/* <View style={styles.container}>
                <ImageLoader
                    style={{ width: scale(298), height: scale(36), marginBottom: "70%" }}
                    source={require("../../assets/VACCINELEDGER.png")}
                    resizeMode='contain'
                />

                <View style={{ alignItems: "center", marginBottom: "10%" }}>
                    <View style={{ alignItems: 'center', }}>
                        <Text style={{ fontSize: scale(14), color: '#707070',fontFamily:"Roboto-Regular" }}>Powered By</Text>
                        <Image
                            style={{ width: scale(140), height: scale(24), borderWidth: 0,marginTop:verticalScale(8) }}
                            source={require("../../assets/STATWIGLogo.png")}
                            resizeMode='contain'
                        />
                    </View>
                    <Text style={{ color: "#707070", fontSize: scale(14),fontFamily:"Roboto-Regular",marginTop:verticalScale(8) }}>Version 1.00.200527.01</Text>
                </View>

            </View> */}
            </ImageBackground>
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

export default SplashScreen;