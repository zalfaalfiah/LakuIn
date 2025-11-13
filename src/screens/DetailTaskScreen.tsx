import DateTimePicker from '@react-native-community/datetimepicker';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Task } from '../types/task';
import { Ionicons } from '@expo/vector-icons';

type DetailTaskRouteProp = RouteProp<RootStackParamList, 'DetailTask'>;
type DetailTaskNavProp = StackNavigationProp<RootStackParamList, 'DetailTask'>;

interface Props {
  route: DetailTaskRouteProp;
}

export default function DetailTaskScreen({ route }: Props) {
  const navigation = useNavigation<DetailTaskNavProp>();
  const { item, setTasks } = route.params;

  const [title, setTitle] = useState(item.title);
  const [desc, setDesc] = useState(item.desc);
  const [date, setDate] = useState(item.date ? new Date(item.date) : new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  const updateTask = () => {
    if (!title.trim() || !desc.trim() || !date) {
      Alert.alert('Incomplete Information', 'Please fill in all fields before saving.');
      return;
    }

    const updatedTask: Task = {
      ...item,
      title,
      desc,
      date: date.toISOString(),
    };

    setTasks((prev: Task[]) => prev.map(t => (t.id === item.id ? updatedTask : t)));

    Alert.alert('Success', 'Task has been updated successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detail Task</Text>
      </View>

      {/* Form Card */}
      <View style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Calender</Text>
        <TouchableOpacity onPress={() => setShow(true)} style={styles.datePicker}>
          <Text style={{ color: '#333' }}>{date.toLocaleDateString()}</Text>
          <Ionicons name="calendar" size={20} color="#333" />
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={onChange}
          />
        )}

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          multiline
          value={desc}
          onChangeText={setDesc}
          placeholder="Enter task description"
          placeholderTextColor="#999"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[
          styles.saveButton,
          (!title.trim() || !desc.trim()) && { backgroundColor: '#a6b8f5' },
        ]}
        onPress={updateTask}
        disabled={!title.trim() || !desc.trim()}
      >
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fbff', alignItems: 'center' },

  headerBox: {
    backgroundColor: '#628ecb',
    width: '100%',
    height: 90,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  backButton: { position: 'absolute', left: 15 },
  headerText: { color: '#fff', fontSize: 18, fontWeight: '600' },

  card: {
    backgroundColor: '#628ecb',
    width: '85%',
    borderRadius: 20,
    padding: 20,
    marginTop: 30,
  },
  label: { color: '#fff', fontWeight: '600', marginBottom: 5 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 15,
  },
  datePicker: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#628ecb',
    width: '85%',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 25,
  },
  saveText: { color: '#fff', fontWeight: '600' },
});
