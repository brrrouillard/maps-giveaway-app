import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { MapView } from "expo";
import axios from "axios";

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
      itemsMarkers: [
      ],
      loading: true
    };
  }

  getUserLocation = async () => {
    await navigator.geolocation.getCurrentPosition(async position => {
      // First we get user location
      await this.setState({
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
      });
    });
    
    await axios
      .get(`localhost:8080/api/items/`)
      .then(items => {
        this.setState({ itemsMarker: items });
      })
      .catch(err => console.log(err));
    await this.setState({ loading: false });
  };

 componentDidMount() {
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
          <Text></Text>
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
