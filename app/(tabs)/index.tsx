import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback, FlatList, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const resources = [
  { id: '1', name: 'Library', image: require('../../assets/images/image5.png'), location: { latitude: 39.6800, longitude: -75.7550 } },
  { id: '2', name: 'Health Center', image: require('../../assets/images/image9.png'), location: { latitude: 39.6785, longitude: -75.7520 } },
  { id: '3', name: 'Clubs', image: require('../../assets/images/image8.png'), location: { latitude: 39.6790, longitude: -75.7530 } },
  { id: '4', name: 'Career Services', image: require('../../assets/images/image6.png'), location: { latitude: 39.6775, longitude: -75.7510 } },
  { id: '5', name: 'Events', image: require('../../assets/images/image7.png'), location: { latitude: 39.6760, longitude: -75.7500 } },
];

const campusResources = [
  { id: '1', title: 'CCSD', description: 'Counseling Center for Student Development', time: '09:00 - 11:00', location: '2nd floor, Perkins Student Center', contact: 'Mam Mahnoor' },
  // Add more campus resources as needed
];

const news = [
  { id: '1', title: 'New Research Lab Opens', description: 'The University of Delaware has opened a new state-of-the-art research lab.', image: require('../../assets/images/image10.png') },
  { id: '2', title: 'Student Art Exhibition', description: 'A new student art exhibition is now open at the university gallery.', image: require('../../assets/images/image10.png') },
  { id: '3', title: 'Campus Sustainability Initiatives', description: 'The university has launched new sustainability initiatives to reduce carbon footprint.', image: require('../../assets/images/image10.png') },
  { id: '4', title: 'Alumni Reunion Event', description: 'Join us for the annual alumni reunion event this weekend.', image: require('../../assets/images/image10.png') },
  // Add more news as needed
];

const events = [
  { id: '1', title: 'Perkins Live', description: 'James Camacho Live Performance Tonight!!!', image: require('../../assets/images/PK.png'), location: 'Perkins Student Center' },
  { id: '2', title: 'Quizzo', description: 'Join for fun Trivia, Prizes and Snacks', image: require('../../assets/images/QI.png'), location: 'Trabant University Center' },
  { id: '3', title: 'Trabant Now', description: '24 Hour of Theatre', image: require('../../assets/images/TN.png'), location: 'Trabant University Center' },
  // Add more events as needed
];

export default function Index() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('news');
  const drawerAnim = useRef(new Animated.Value(-width)).current;
  const router = useRouter();

  const toggleDrawer = () => {
    if (drawerVisible) {
      Animated.timing(drawerAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setDrawerVisible(false));
    } else {
      setDrawerVisible(true);
      Animated.timing(drawerAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const closeDrawer = () => {
    if (drawerVisible) {
      Animated.timing(drawerAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setDrawerVisible(false));
    }
  };

  const renderResourceItem = ({ item }: { item: { id: string; name: string; image: any; location: { latitude: number, longitude: number } } }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <TouchableOpacity style={styles.locationTag} onPress={() => router.push({ pathname: '/map', params: { latitude: item.location.latitude, longitude: item.location.longitude } })}>
        <Ionicons name="location-outline" size={15} color="white" />
        <Text style={styles.locationText}>{item.name}</Text>
        <Ionicons name="arrow-forward" size={14} color="white" />
      </TouchableOpacity>
    </View>
  );

  const renderCampusResourceItem = ({ item }: { item: { id: string; title: string; description: string; time: string; location: string; contact: string } }) => (
    <View style={styles.resourceCard}>
      <View style={styles.resourceCardHeader}>
        <Text style={styles.resourceTitle}>{item.title}</Text>
        <Ionicons name="information-circle-outline" size={24} color="#1e90ff" />
      </View>
      <Text style={styles.resourceDescription}>{item.description}</Text>
      <View style={styles.resourceTimeContainer}>
        <Ionicons name="time-outline" size={14} color="black" />
        <Text style={styles.resourceTime}>{item.time}</Text>
      </View>
      <Text style={styles.resourceLocation}>Location: {item.location}</Text>
      <Text style={styles.resourceContact}>Contact: {item.contact}</Text>
    </View>
  );

  const renderNewsItem = ({ item }: { item: { id: string; title: string; description: string; image: any } }) => (
    <View style={styles.newsCard}>
      <Image source={item.image} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDescription}>{item.description}</Text>
      </View>
    </View>
  );

  const renderEventItem = ({ item }: { item: { id: string; title: string; description: string; image: any; location: string } }) => (
    <View style={styles.newsCard}>
      <Image source={item.image} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDescription}>{item.description}</Text>
        <Text style={styles.eventLocation}>Location: {item.location}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Ionicons name="menu-outline" size={35} color="black" />
        </TouchableOpacity>
        <Text style={styles.title1}>Valv</Text>
        <Image source={require('../../assets/images/UD.png')} style={{ width: 50, height: 40 }} />
      </View>

      <ScrollView>
        {/* Discover Card */}
        <FlatList
          data={resources}
          renderItem={renderResourceItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardContainer}
        />

        {/* Campus Resources Section */}
        <View style={styles.resourcesContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.sectionTitle}>Campus Resources</Text>
            <TouchableOpacity onPress={() => router.push('/resources')}>
              <Text style={styles.showMoreText}>show more {">"}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={campusResources}
            renderItem={renderCampusResourceItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* News and Events Section */}
        <View style={styles.newsEventsContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabButton, selectedTab === 'news' && styles.activeTabButton]}
              onPress={() => setSelectedTab('news')}
            >
              <Text style={[styles.tabButtonText, selectedTab === 'news' && styles.activeTabButtonText]}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, selectedTab === 'events' && styles.activeTabButton]}
              onPress={() => setSelectedTab('events')}
            >
              <Text style={[styles.tabButtonText, selectedTab === 'events' && styles.activeTabButtonText]}>Events</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={selectedTab === 'news' ? news : events}
            renderItem={selectedTab === 'news' ? renderNewsItem : renderEventItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={true}
            style={styles.newsEventsList}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </View>
      </ScrollView>

      {/* Side Drawer */}
      {drawerVisible && (
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <View style={styles.overlay}>
            <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}>
              <Text style={styles.drawerTitle}>Menu</Text>
              <TouchableOpacity style={styles.drawerItem}>
                <Text style={styles.drawerItemText}>Profile Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.drawerItem}>
                <Text style={styles.drawerItemText}>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.drawerItem}>
                <Text style={styles.drawerItemText}>Help</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.drawerItem} onPress={toggleDrawer}>
                <Text style={styles.drawerItemText}>Close</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 40,
  },
  header: {
    top: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title1: {
    fontSize: 20,
    right: 115,
    fontWeight: "bold",
  },
  cardContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 16,
    width: width * 0.5,
    height: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 158,
  },
  locationTag: {
    position: "absolute",
    bottom: 16,
    left: 16,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: "center",
  },
  locationText: {
    color: "white",
    marginLeft: 6,
    marginRight: 6,
  },
  resourcesContainer: {
    padding: 16,
    paddingVertical: 0,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  showMoreText: {
    color: '#1e90ff',
    fontSize: 14,
    bottom: 10,
  },
  resourceCard: {
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
    paddingVertical: 20,
  },
  resourceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resourceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  resourceDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  resourceTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  resourceTime: {
    fontSize: 14,
    marginLeft: 5,
  },
  resourceLocation: {
    fontSize: 14,
    marginBottom: 5,
  },
  resourceContact: {
    fontSize: 14,
  },
  newsEventsContainer: {
    height: height * 0.5, // Adjust height to fit the screen
  },
  tabContainer: {
    // borderBottomColor: '#E0E0E0',
    // borderBottomWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    // backgroundColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 50,
    elevation: 3,
  },
  activeTabButton: {
    backgroundColor: '#2F455A',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  activeTabButtonText: {
    color: '#fff',
  },
  newsEventsList: {
    backgroundColor: '#f1f1f1',
    padding: 16,  
    flex: 1,
  },
  newsCard: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  newsImage: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 10,
  },
  newsContent: {
    padding: 10,
    flex: 1,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 14,
    color: '#666',
  },
  eventLocation: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '110%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '105%',
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    elevation: 5,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
  },
  drawerItem: {
    paddingVertical: 10,
  },
  drawerItemText: {
    fontSize: 18,
  },
});
