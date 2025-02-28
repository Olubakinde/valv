import { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, RefreshControl, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: "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", 
});

const resources = [
  { id: '1', name: 'Library', description: 'Access books, journals, and study spaces.', location: { latitude: 39.6800, longitude: -75.7550 } },
  { id: '2', name: 'Counseling Center', description: 'Get support for mental health and well-being.', location: { latitude: 39.6785, longitude: -75.7520 } },
  { id: '3', name: 'Career Services', description: 'Find internships, jobs, and career advice.', location: { latitude: 39.6775, longitude: -75.7510 } },
  // Add more resources as needed
];

const questionPrompts = [
  'Tell me about the Library',
  'What services does the Counseling Center offer?',
  'How can Career Services help me?',
  'Map me to the Library',
  'Where is the Counseling Center?',
];

export default function AboutScreen() {
  const [messages, setMessages] = useState<{ id: string; text: string; sender: 'user' | 'bot'; location?: { latitude: number, longitude: number } }[]>([]);
  const [input, setInput] = useState('');
  const [typingMessage, setTypingMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSend = async (message?: string) => {
    const userInput = message || input;
    if (userInput.trim()) {
      const userMessage: { id: string; text: string; sender: 'user' | 'bot' } = { id: Date.now().toString(), text: userInput, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInput('');
      setShowPrompts(false);
      setShowPlaceholder(false);

      // Simulate bot response with typing effect
      setTimeout(async () => {
        const resource = resources.find(res => userInput.toLowerCase().includes(res.name.toLowerCase()));
        let botMessage = resource ? `${resource.name}: ${resource.description}` : '';
        let location = resource ? resource.location : undefined;

        if (!botMessage) {
          const completion = await openai.chat.completions.create({ 
            model: "gpt-4o-mini", 
            store: true, 
            messages: [{ "role": "user", "content": userInput }],
          });

          botMessage = completion.choices[0].message.content ?? '';
        }

        let index = 0;
        typingIntervalRef.current = setInterval(() => {
          setTypingMessage(botMessage.slice(0, index + 1));
          index++;
          if (index === botMessage.length) {
            clearInterval(typingIntervalRef.current!);
            typingIntervalRef.current = null;
            const finalBotMessage: { id: string; text: string; sender: 'user' | 'bot'; location?: { latitude: number, longitude: number } } = { id: Date.now().toString(), text: botMessage, sender: 'bot', location };
            setMessages(prevMessages => [...prevMessages, finalBotMessage]);
            setTypingMessage('');
          }
        }, 50);
      }, 1000);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setMessages([]);
    setTypingMessage('');
    setInput('');
    setShowPrompts(true);
    setShowPlaceholder(true);
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages, typingMessage]);

  const playAudio = (text: string) => {
    Speech.speak(text);
  };

  const renderItem = ({ item }: { item: { id: string; text: string; sender: 'user' | 'bot'; location?: { latitude: number, longitude: number } } }) => (
    <View style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
      {item.sender === 'bot' && (
        <TouchableOpacity onPress={() => playAudio(item.text)} style={styles.microphoneButton}>
          <Ionicons name="mic-outline" size={24} color={"white"} />
        </TouchableOpacity>
      )}
      {item.location && (
        <View style={styles.mapPreviewContainer}>
          <MapView
            style={styles.mapPreview}
            initialRegion={{
              latitude: item.location.latitude,
              longitude: item.location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={item.location}
              title="Location"
              description={item.text}
            />
          </MapView>
          <TouchableOpacity style={styles.mapButton} onPress={() => router.push({ pathname: '/map', params: { latitude: item.location.latitude, longitude: item.location.longitude } })}>
            <Text style={styles.mapButtonText}>Show on Map</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Valv</Text>
      </View>
      {showPlaceholder && messages.length === 0 && (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>What do you need help with?</Text>
        </View>
      )}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.chat}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {typingMessage ? (
        <View style={[styles.message, styles.botMessage]}>
          <Text style={styles.messageText}>{typingMessage}</Text>
          <TouchableOpacity onPress={() => playAudio(typingMessage)} style={styles.microphoneButton}>
            <Ionicons name="mic-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: input.trim() ? '#1e90ff' : '#555' }]}
          onPress={() => handleSend()}
          disabled={!input.trim()}
        >
          <Ionicons name="send" size={20} color="#fff" style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
      {showPrompts && (
        <ScrollView horizontal style={styles.promptContainer} showsHorizontalScrollIndicator={false}>
          {questionPrompts.map((prompt, index) => (
            <TouchableOpacity key={index} style={styles.promptButton} onPress={() => handleSend(prompt)}>
              <Text style={styles.promptText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60, // Adjust padding to account for removed header
    backgroundColor: '#f1f1f1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  placeholderContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -10 }],
  },
  placeholderText: {
    fontSize: 18,
    color: '#888',
  },
  chat: {
    flex: 1,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#1e90ff',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#25292e',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
    flex: 1,
  },
  microphoneButton: {
    marginLeft: 10,
  },
  mapPreviewContainer: {
    marginTop: 10,
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mapPreview: {
    flex: 1,
  },
  mapButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#1e90ff',
    padding: 5,
    borderRadius: 5,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#3e3e3e',
    color: '#000',
  },
  sendButton: {
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    transform: [{ rotate: '-45deg' }],
  },
  promptContainer: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    right: 10,
    flexDirection: 'row',
  },
  promptButton: {
    backgroundColor: '#3e3e3e',
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  promptText: {
    color: '#fff',
  },
});
