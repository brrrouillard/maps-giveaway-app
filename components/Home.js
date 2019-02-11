import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { MapView } from "expo";

import Header from "./Header";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      userPosition: {
        lat: 0,
        lon: 0
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
            lat: position.coords.latitude,
            lon: position.coords.longitude
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
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: this.state.userPosition.lat,
              longitude: this.state.userPosition.lon,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          />
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
    alignItems: "center",
    
  },
  textLoading: {
    fontSize: 64
  }
});
