import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Scan= () => {
  return (
    <View style={styles.container}>
      <Text>Scan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
