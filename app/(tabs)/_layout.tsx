import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#25292e',
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
          paddingBottom: 4,
          paddingTop: 10, // Add more space between the icon and the border
        },
        tabBarLabelStyle: {
          fontSize: 12,
          top: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search-sharp' : 'search-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'scan-sharp' : 'scan-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'videocam-sharp' : 'videocam-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="action"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'albums-sharp' : 'albums-outline'} color={color} size={30} />
          ),
        }}
      />
    </Tabs>
  );
}
