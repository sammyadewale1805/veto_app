import React, { useRef, useEffect } from "react";
import { StyleSheet, Image, Dimensions, Text, View, TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Import Material Icons for the arrow icon
import Swiper from "react-native-swiper";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";

// Set dimensions
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const OnboardingScreens = () => {
  const navigation = useNavigation();
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(0)).current; // Initialize opacity
  const swiperRef = useRef(null); // Reference for Swiper

  // Load custom fonts
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  // Pulsing animation effect for the button
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Fade-in animation
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [scaleValue, opacityValue]);

  // Show a loading indicator or return null until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  // Navigate to next slide or start screen
  const handleArrowPress = (index) => {
    if (index === 3) { // Last slide
      navigation.navigate("StartScreen");
    } else {
      swiperRef.current.scrollBy(1); // Move to next slide
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: opacityValue }]}>
      <Swiper
        ref={swiperRef} // Attach reference to Swiper
        loop={false} // Disable looping
        showsButtons={false} // Hides default navigation buttons
        paginationStyle={styles.pagination}
        activeDotColor="#000000"
        dotColor="#998FA2"
      >
        {/* Slide 1 */}
        <View style={styles.slide}>
          <Image source={require('../../assets/vet2.avif')} style={styles.img} />
          <Text style={styles.title}>We Care</Text>
          <Text style={styles.text}>
            We view animals not merely as creatures but as cherished friends and loyal companions who enrich our lives. Their presence brings joy, comfort, and an unspoken bond, fostering empathy and a sense of responsibility.
          </Text>
          {/* Forward Arrow Button */}
          <TouchableOpacity onPress={() => handleArrowPress(0)} style={styles.arrowButton}>
            <MaterialIcons name="arrow-forward" size={40} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Slide 2 */}
        <View style={styles.slide}>
          <Image source={require('../../assets/vet1.jpg')} style={styles.img} />
          <Text style={styles.title}>Meet Our Vet</Text>
          <Text style={styles.text}>
            Dr. Alex Morgan, DVM - Veterinarian with over 10 years of experience in animal care, specializing in preventative medicine, surgery, and emergency care. Dr. Morgan is dedicated to providing compassionate, personalized treatment for pets and their families.
          </Text>
          {/* Forward Arrow Button */}
          <TouchableOpacity onPress={() => handleArrowPress(1)} style={styles.arrowButton}>
            <MaterialIcons name="arrow-forward" size={40} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Slide 3 */}
        <View style={styles.slide}>
          <Image source={require('../../assets/studding.jpeg')} style={styles.img} />
          <Text style={styles.title}>Our Studding Services</Text>
          <Text style={styles.text}>
            Our veterinary clinic provides expert studding services, ensuring healthy breeding practices, superior genetic qualities, and compassionate care for each animal involved.
          </Text>
          {/* Forward Arrow Button */}
          <TouchableOpacity onPress={() => handleArrowPress(2)} style={styles.arrowButton}>
            <MaterialIcons name="arrow-forward" size={40} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Slide 4 - Welcome Slide */}
        <View style={styles.slide}>
          <Image source={require('../../assets/familtadopt.jpg')} style={styles.img} />
          <Text style={styles.title}>Welcome to Veta</Text>
          <Text style={styles.text}>
            Veta offers a haven for pets, embodying hope, companionship, and warmth. Here, pets and people connect, creating lasting, joyful bonds.
          </Text>
          {/* Forward Arrow Button */}
          <TouchableOpacity onPress={() => handleArrowPress(3)} style={styles.arrowButton}>
            <MaterialIcons name="arrow-forward" size={40} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </Swiper>
    </Animated.View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    paddingTop: 80,
    marginHorizontal: 30,
  },
  img: {
    alignSelf: "center",
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 80,
    height: h * 0.5,
    width: w * 0.9,
  },
  title: {
    fontFamily: "Montserrat_700Bold",
    marginTop: 60,
    marginHorizontal: 10,
    fontSize: 32,
  },
  text: {
    color: "#767676",
    fontFamily: "Montserrat_400Regular",
    marginTop: 20,
    fontSize: 16,
    lineHeight: 25,
    marginLeft: 10,
  },
  pagination: {
    marginRight: w * 0.7,
    marginBottom: h * 0.02,
  },
  arrowButton: {
    position: 'absolute',
    right: 20, // Aligns the arrow to the far right
    bottom: 20, // Adjusts the bottom margin
    backgroundColor: "#F67F00",
    borderRadius: 30,
    padding: 10,
  },
});

export default OnboardingScreens;
