import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { theme } from "../core/theme";

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: "#F67F00",
    fontWeight: "bold",
    paddingVertical: 12,

  },
});
