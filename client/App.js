import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import Home from "./components/Home";

import Profile from "./components/Profile";

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Profile
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
