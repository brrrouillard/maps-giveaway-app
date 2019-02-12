import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { MapView } from "expo";

import Header from "./Header";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      userPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      region: {
        latitude: 0,
        longitude: 0
      },
      loading: true
    };
  }

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      // First we get user location
      this.setState(
        {
          userPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          },
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        },
        () => {
          this.setState({
            loading: false
          });
        }
      );
    });
  };

  componentWillMount() {
    this.getUserLocation();
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Header />
          <View style={styles.containerLoading}>
            <Text style={styles.textLoading}>Loading...</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Header />
          <MapView style={{ flex: 1 }} region={this.state.userPosition} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textLoading: {
    fontSize: 64
  }
});
