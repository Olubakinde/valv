import { Stack } from 'expo-router';
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false, gestureEnabled: false}} />
        <Stack.Screen name="info" options={{ headerShown: false, gestureEnabled: false}} />
        <Stack.Screen name="signup" options={{ headerShown: false, gestureEnabled: false}} />
        <Stack.Screen name="login" options={{ headerShown: false, gestureEnabled: false}} />
        <Stack.Screen name="setup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
    </ThemeProvider>
  );
}
