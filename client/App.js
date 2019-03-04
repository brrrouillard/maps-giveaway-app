import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import Map from "./components/Map";

import MyItems from "./components/MyItems";

const TabNavigator = createBottomTabNavigator(
  {
    Map,
    MyItems
  },
  {
    tabBarOptions: {
      activeTintColor: "#fff",
      activeBackgroundColor: "#ead2ac",
      inactiveTintColor: "#ead2ac",
      labelStyle: {
        fontWeight: "bold",
        marginBottom: 10,
        fontSize: 24
      }
    }
  }
);

export default createAppContainer(TabNavigator);
