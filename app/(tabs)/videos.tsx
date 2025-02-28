import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');

const videos = [
  { id: '1', title: 'Black History Month', videoUri: require('../../assets/videos/BHM.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '2', title: 'Event Highlights', videoUri: require('../../assets/videos/BHM.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '3', title: 'Student Life', videoUri: require('../../assets/videos/BHM.mp4'), thumbnail: require('../../assets/images/UD.png') },
  // Add more videos as needed
];

export default function Videos() {
  const videoRefs = useRef<(Video | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentIndex(index);
      videoRefs.current.forEach((video, idx) => {
        if (video) {
          if (idx === index) {
            video.playAsync();
          } else {
            video.stopAsync();
          }
        }
      });
    }
  }).current;

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.videoContainer}
        activeOpacity={1}
        onPress={() => {
          const video = videoRefs.current[index];
          if (video) {
            video.getStatusAsync().then(status => {
              if (status.isPlaying) {
                video.pauseAsync();
              } else {
                video.playAsync();
              }
            });
          }
        }}
      >
        <Video
          ref={ref => (videoRefs.current[index] = ref)}
          source={item.videoUri}
          style={styles.video}
          resizeMode="cover"
          shouldPlay={index === currentIndex}
          isLooping
          isMuted={false}
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  card: {
    width: width,
    height: height,
    position: 'relative',
    marginBottom: -80,
  },
  videoContainer: {
    width: '100%',
    height: '90%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
