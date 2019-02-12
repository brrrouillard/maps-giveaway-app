import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import Header from "./Header";

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Header />
        <Text> Profile </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });