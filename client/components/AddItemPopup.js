import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default AddItemPopup = props => {
  return <View styles={styles.container}><Text style={styles.test}>{props.coordinates.latitude}</Text></View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    test: {
        fontSize: 24
    }
})

