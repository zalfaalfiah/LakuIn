import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddTaskScreen from '../screens/AddTaskScreen';
import DetailTaskScreen from '../screens/DetailTaskScreen';
import HomeScreen from '../screens/HomeScreen';
import { Task } from '../types/task';

export type RootStackParamList = {
  Home: undefined;
  AddTask: {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    task?: Task; // ← ditambahin supaya bisa kirim task saat edit
  };
  DetailTask: {
    item: Task;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    isCompleted: boolean;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
      <Stack.Screen name="DetailTask" component={DetailTaskScreen} />
    </Stack.Navigator>
  );
}