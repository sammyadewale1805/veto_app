import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";

import { theme } from "../core/theme";

export default function TextInput({ label, errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        label={label}
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        activeOutlineColor={theme.colors.primary}
        theme={{ roundness: 15 }} // Sets the border radius
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
    height: 60,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
