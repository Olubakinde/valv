import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function Splash() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const theme = useTheme();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.push('/info');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <Animated.View style={{ ...styles.logoContainer, opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        <Image source={theme === 'dark' ? require('../assets/images/logo.png') : require('../assets/images/logo_dark.png')} style={styles.logo} />
      </Animated.View>
      <Text style={[styles.text, theme === 'dark' ? styles.darkText : styles.lightText]}>Valv</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkContainer: {
    backgroundColor: '#25292e',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40, // Adjust this value to position the text closer to the bottom
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
});
