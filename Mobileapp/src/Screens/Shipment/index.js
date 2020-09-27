import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";


export const Shipment = () => {
  return (
    <View style={styles.container}>
      <Text>Shipment</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#55efc4",
    alignItems: "center",
    justifyContent: "center",
  },
});