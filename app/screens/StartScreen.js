import React, { useRef, useEffect } from "react";
import { StyleSheet, Animated } from "react-native";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function StartScreen({ navigation }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(-30)).current;

  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-20)).current;
  const headerColor = useRef(new Animated.Value(0)).current; // Color animation

  const paragraphOpacity = useRef(new Animated.Value(0)).current;
  const paragraphTranslateY = useRef(new Animated.Value(10)).current;

  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: 0,
          duration: 600,
          delay: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(headerTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(headerColor, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false, // Color animation cannot use native driver
        }),
      ]),
      Animated.parallel([
        Animated.timing(paragraphOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(paragraphTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(buttonTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  // Interpolating the header color based on the animated value
  const interpolatedColor = headerColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000', '#F67F00'], // Transition from black to orange
  });

  return (
    <Background>
      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: logoOpacity, transform: [{ translateY: logoTranslateY }] },
        ]}
      >
        <Logo />
      </Animated.View>
      <Animated.View
        style={[
          styles.headerContainer,
          { opacity: headerOpacity, transform: [{ translateY: headerTranslateY }] },
        ]}
      >
        <Animated.Text style={[styles.header, { color: interpolatedColor }]}>
          Welcome to Veto pet shop
        </Animated.Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.paragraphContainer,
          { opacity: paragraphOpacity, transform: [{ translateY: paragraphTranslateY }] },
        ]}
      >
        <Paragraph>Register or Login below!</Paragraph>
      </Animated.View>
      <Animated.View
        style={[
          styles.buttonContainer,
          { opacity: buttonOpacity, transform: [{ translateY: buttonTranslateY }] },
        ]}
      >
        <Button
          mode="contained"
          onPress={() => navigation.navigate("LoginScreen")}
          style={[styles.button, { backgroundColor: '#F67F00' }]} // Set button color here
        >
          Log in
        </Button>
        <Button
           mode="outlined"
            onPress={() => navigation.navigate("RegisterScreen")}
            style={styles.button}
             labelStyle={{ color: '#F67F00', fontWeight: "bold" }} // Set color and bold text here
>
              Create an account
              </Button>

      </Animated.View>
    </Background>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  header: {
    fontSize: 24, // Adjusted font size for visibility
    fontWeight: "bold",
  },
  paragraphContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: 350,
  },
  button: {
    width: "100%",      // Standardize button width
    height: 50,         // Ensure uniform button height
    alignSelf: "center",
    marginVertical: 10,
    justifyContent: "center", // Center text vertically
    paddingHorizontal: 10,    // Adjust padding for text alignment
  },
});
