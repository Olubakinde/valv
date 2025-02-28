import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // No authentication, just navigate to the tabs
    router.push('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.innerContainer}>
        {/* <Image source={require('../assets/images/logo.png')} style={styles.logo} /> */}
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to Continue!</Text>
        <TouchableOpacity style={[styles.socialButton, styles.socialButtonBackground]}>
          <FontAwesome name="google" size={20} color="#000" style={styles.socialLogo} />
          <Text style={styles.socialButtonText}>Log in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.socialButtonBackground]}>
          <FontAwesome name="apple" size={20} color="#000" style={styles.socialLogo} />
          <Text style={styles.socialButtonText}>Log in with Apple</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>Or</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.line} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.line} />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/forgot-password')}>
          <Text style={styles.link}><Text style={{textDecorationLine: 'none'}}>Forgot Password?</Text></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.link}>Don't have an account?<Text style={{color: "red", textDecorationLine: 'none'}}>Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '101%',
    padding: 5,
    marginVertical: 10,
    borderRadius: 10,
    color: '#000',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#227E75',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    textDecorationLine: 'underline',
    color: '#000',
  },
  socialButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButtonBackground: {
    backgroundColor: '#f0f0f0',
  },
  socialLogo: {
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 10,
    fontSize: 14,
    paddingVertical: 35,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});
