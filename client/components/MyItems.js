import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import Header from "./Header";

export default class MyItems extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Header />
        <Text> My Items </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });