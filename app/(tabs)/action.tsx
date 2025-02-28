import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const days = [
  { day: "S", date: "04" },
  { day: "S", date: "05" },
  { day: "M", date: "06" },
  { day: "T", date: "07" },
  { day: "W", date: "08" },
  { day: "T", date: "09" },
  { day: "F", date: "10" },
];

const initialScheduleData = {
  "04": [
    {
      id: "1",
      title: "Mathematics",
      subtitle: "Lecture 1: Algebra",
      time: "10:00 - 11:30",
      room: "Room 1 - 101",
      instructor: "Mr. John Doe",
      color: "#A3E635",
    },
  ],
  "05": [
    {
      id: "2",
      title: "Physics",
      subtitle: "Lecture 2: Mechanics",
      time: "12:00 - 13:30",
      room: "Room 2 - 102",
      instructor: "Dr. Jane Smith",
      color: "#FDE047",
    },
  ],
  "06": [
    {
      id: "3",
      title: "Computer Science",
      subtitle: "Lecture 2: Data Management",
      time: "11:35 - 13:05",
      room: "Room 2 - 124",
      instructor: "Mam Laiba Khalid",
      color: "#A3E635",
    },
    {
      id: "4",
      title: "Digital Marketing",
      subtitle: "Lecture 3: Shopify Creation",
      time: "13:15 - 14:45",
      room: "Room 3A - G4",
      instructor: "Mam Hira",
      color: "#FDE047",
    },
    {
      id: "5",
      title: "Digital Marketing",
      subtitle: "Lecture 3: Shopify Creation",
      time: "15:10 - 16:40",
      room: "Room 7B - B1",
      instructor: "Mam Hira",
      color: "#CBD5E1",
    },
  ],
  // ...other days...
};

const recommendations = [
  "Join a study group",
  "Attend a workshop",
  "Visit the library",
  "Explore online courses",
  "Take a break and relax",
];

const getFormattedDate = (date) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const d = new Date(2025, 6, date); // Assuming the year is 2025 and month is July (6)
  const day = daysOfWeek[d.getDay()];
  const month = monthsOfYear[d.getMonth()];
  return `${date} ${day}, ${month} 2025`;
};

const ActionScreen = () => {
  const [selectedDate, setSelectedDate] = useState("06");
  const [viewMode, setViewMode] = useState("day"); // "day", "week", "month"
  const [scheduleData, setScheduleData] = useState(initialScheduleData);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    subtitle: '',
    time: '',
    room: '',
    instructor: '',
    color: '#A3E635',
  });

  const renderSchedule = () => {
    if (viewMode === "day") {
      return scheduleData[selectedDate] || [];
    } else if (viewMode === "week") {
      // Combine schedules for the week
      return Object.values(scheduleData).flat();
    } else if (viewMode === "month") {
      // Combine schedules for the month
      return Object.values(scheduleData).flat();
    }
  };

  const schedule = renderSchedule();

  const handleAddEvent = () => {
    const newEventId = Date.now().toString();
    const updatedSchedule = {
      ...scheduleData,
      [selectedDate]: [
        ...(scheduleData[selectedDate] || []),
        { ...newEvent, id: newEventId },
      ],
    };
    setScheduleData(updatedSchedule);
    setModalVisible(false);
    setNewEvent({
      title: '',
      subtitle: '',
      time: '',
      room: '',
      instructor: '',
      color: '#A3E635',
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{getFormattedDate(selectedDate)}</Text>
        <TouchableOpacity style={styles.headerAddIcon} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {/* View Mode Selector */}
      <View style={styles.viewModeContainer}>
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            viewMode === "day" && styles.selectedViewModeButton,
          ]}
          onPress={() => setViewMode("day")}
        >
          <Text
            style={[
              styles.viewModeText,
              viewMode === "day" && styles.selectedViewModeText,
            ]}
          >
            Day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            viewMode === "week" && styles.selectedViewModeButton,
          ]}
          onPress={() => setViewMode("week")}
        >
          <Text
            style={[
              styles.viewModeText,
              viewMode === "week" && styles.selectedViewModeText,
            ]}
          >
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            viewMode === "month" && styles.selectedViewModeButton,
          ]}
          onPress={() => setViewMode("month")}
        >
          <Text
            style={[
              styles.viewModeText,
              viewMode === "month" && styles.selectedViewModeText,
            ]}
          >
            Month
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Section */}
      {viewMode === "day" && (
        <View style={styles.calendarContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {days.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateBox,
                  selectedDate === item.date && styles.selectedDateBox,
                ]}
                onPress={() => setSelectedDate(item.date)}
              >
                <Text
                  style={[
                    styles.dayText,
                    selectedDate === item.date && styles.selectedDayText,
                  ]}
                >
                  {item.day}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === item.date && styles.selectedDateText,
                  ]}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Titles */}
      <View style={styles.titlesContainer}>
        <Text style={styles.timeTitle}>Time</Text>
        <Text style={styles.coursesTitle}>Courses</Text>
      </View>

      {/* Schedule List */}
      {schedule.length > 0 ? (
        <FlatList
          data={schedule}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.scheduleRow}>
              <Text style={styles.timeColumn}>
                <Text style={styles.startTime}>{item.time.split(" - ")[0]}</Text> - {item.time.split(" - ")[1]}
              </Text>
              <View style={styles.separator} />
              <View style={[styles.card, { backgroundColor: item.color }]}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <Text style={styles.room}>{item.room}</Text>
                <Text style={styles.instructor}>{item.instructor}</Text>
                <TouchableOpacity style={styles.bellIcon}>
                  <Ionicons name="notifications-outline" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.noScheduleContainer}>
          <Text style={styles.noScheduleText}>No schedule or nothing planned for today.</Text>
          <Text style={styles.recommendationTitle}>Recommendations:</Text>
          {recommendations.map((rec, index) => (
            <Text key={index} style={styles.recommendationText}>
              - {rec}
            </Text>
          ))}
        </View>
      )}

      {/* Add Event Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Event</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Title"
              placeholderTextColor={'#ccc'}
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Subtitle"
              placeholderTextColor={'#ccc'}
              value={newEvent.subtitle}
              onChangeText={(text) => setNewEvent({ ...newEvent, subtitle: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Time (e.g., 10:00 - 11:30)"
              placeholderTextColor={'#ccc'}
              value={newEvent.time}
              onChangeText={(text) => setNewEvent({ ...newEvent, time: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Room"
              placeholderTextColor={'#ccc'}
              value={newEvent.room}
              onChangeText={(text) => setNewEvent({ ...newEvent, room: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Instructor"
              placeholderTextColor={'#ccc'}
              value={newEvent.instructor}
              onChangeText={(text) => setNewEvent({ ...newEvent, instructor: text })}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddEvent}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalCancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 15,
  },
  headerContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerAddIcon: {
    padding: 5,
  },
  calendarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  dateBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: "#EDEDED",
  },
  selectedDateBox: {
    backgroundColor: "#25292e",
  },
  dayText: {
    fontSize: 12,
    color: "#666",
  },
  selectedDayText: {
    color: "#FFF",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  selectedDateText: {
    color: "#FFF",
  },
  titlesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  timeTitle: {
    width: 80,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  coursesTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    // textAlign: "center",
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  timeColumn: {
    width: 80,
    fontSize: 14,
    color: "#333",
  },
  startTime: {
    fontWeight: "bold",
    fontSize: 15,
  },
  separator: {
    width: 1,
    height: "100%",
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  card: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
  room: {
    fontSize: 12,
    color: "#777",
  },
  instructor: {
    fontSize: 12,
    color: "#777",
  },
  bellIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  viewModeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  viewModeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: "#EDEDED",
  },
  selectedViewModeButton: {
    backgroundColor: "#227E75",
  },
  viewModeText: {
    fontSize: 14,
    color: "#665",
  },
  selectedViewModeText: {
    color: "#FFF",
  },
  noScheduleContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  noScheduleText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  recommendationText: {
    fontSize: 14,
    color: "#555",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 80,
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#227E75',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalCancelButton: {
    backgroundColor: '#ccc',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ActionScreen;
