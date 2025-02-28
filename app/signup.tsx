import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [retypePasswordTouched, setRetypePasswordTouched] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    setUsernameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setRetypePasswordTouched(true);

    if (username && validateEmail(email) && validatePassword(password) && validateRetypePassword(password, retypePassword)) {
      // No authentication, just navigate to the setup page
      router.push('/setup');
    }
  };

  const validateEmail = (email: string) => {
    return email.endsWith('.edu');
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateRetypePassword = (password: string, retypePassword: string) => {
    return password === retypePassword;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.innerContainer}>
        {/* <Image source={require('../assets/images/logo.png')} style={styles.logo} /> */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={text => {
            setUsername(text);
            setUsernameTouched(true);
          }}
          onFocus={() => setUsernameTouched(true)}
        />
        {usernameTouched && !username && <Text style={styles.errorText}>Field cannot be empty</Text>}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={text => {
            setEmail(text);
            setEmailTouched(true);
          }}
          onFocus={() => setEmailTouched(true)}
        />
        {emailTouched && !validateEmail(email) && <Text style={styles.errorText}>Email not valid</Text>}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={text => {
            setPassword(text);
            setPasswordTouched(true);
          }}
          secureTextEntry
          onFocus={() => setPasswordTouched(true)}
        />
        {passwordTouched && !validatePassword(password) && <Text style={styles.errorText}>Must contain 8 characters</Text>}
        <TextInput
          style={styles.input}
          placeholder="Retype Password"
          placeholderTextColor="#888"
          value={retypePassword}
          onChangeText={text => {
            setRetypePassword(text);
            setRetypePasswordTouched(true);
          }}
          secureTextEntry
          onFocus={() => setRetypePasswordTouched(true)}
        />
        {retypePasswordTouched && !validateRetypePassword(password, retypePassword) && <Text style={styles.errorText}>Passwords must match</Text>}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
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
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#000',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#227E75',
    alignItems: 'center',
    marginVertical: 10,
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
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    fontSize: 12,
  },
});
