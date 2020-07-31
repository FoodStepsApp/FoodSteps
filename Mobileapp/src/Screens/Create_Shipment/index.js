import React from "react";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

// export const Create_Shipment= ({ navigation }) => {
//   let nav = navigation;
//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         //alert('You clicked back. Now Screen will move to ThirdPage');
//         nav.navigate('HOMEPAGE')
//         return true;
//       };

//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       return () =>
//         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//     }, [])
//   );
//   return (
//     <View style={styles.container}>
//       <Text>Create_Shipment</Text>
//     </View>
//   );
// };

class Create_Shipment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
      this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.props.navigation.navigate('HOMEPAGE');
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Create_Shipment</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
})

export default Create_Shipment;