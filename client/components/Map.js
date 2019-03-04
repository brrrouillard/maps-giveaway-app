import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { MapView } from "expo";

import Header from "./Header";

export default class Map extends Component {
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
      itemsMarkers: [],
      isLoaded: false,
      showAddItemPopup: false, 
      addItemCoordinates: {} // Stores coordinates needed to add a new item
    };
  }

  /**
   * Used to synchronize state with user's view
   */

  onRegionChange(region) {
    this.setState({ region });
  }

  /**
   * Get current user location and store it in the state
   */

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      // First we get user location
      this.setState({
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
  };

  /**
   * Get nearby items and store them in the state
   */

  getNearItems() {
    fetch("http://10.70.0.48:8080/api/items/")
      .then(res => res.json())
      .then(data => this.setState({ itemsMarkers: data, isLoaded: true }));
  }

  /**
   * Render every markers in the itemsMarkers state array
   */

  renderMarkers() {
    return this.state.itemsMarkers.map((item, index) => (
      <MapView.Marker
        key={index}
        title={item.name}
        coordinate={{
          latitude: item.location.coordinates[1],
          longitude: item.location.coordinates[0]
        }}
        description={item.description}
      />
    ));
  }

  handleMapPress(e) {
    const coordinates = {
      latitude: e.coordinate.latitude,
      longitude: e.coordinate.longitude
    };
    this.setState({ showAddItemPopup: true, addItemCoordinates: coordinates });
    
  }

  componentDidMount() {
    this.getUserLocation();
    this.getNearItems();
  }

  render() {
    if (!this.state.isLoaded) {
      // Loading screen
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
            region={this.state.userPosition}
            onPress={e => this.handleMapPress(e.nativeEvent)}
          >
            {this.renderMarkers()}
            {this.state.showAddItemPopup && this.renderAddItemMarker()}
          </MapView>
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
