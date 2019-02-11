import React, { Component } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Vide-Grenier</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#eaba6b",
    marginTop: StatusBar.currentHeight,
    height: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#fff",
    fontSize: 48,
  }
});
