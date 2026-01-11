import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from '../supabase/supabase';
import Header from "../components/Header";
import TaskItem from "../components/TaskItem";
import { Task } from "../types/task";

const TASKS_KEY = "TASKS_DATA";

export default function HomeScreen({ navigation }: any) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<"todos" | "completed">("todos");

  // ambil data pas screen dibuka
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    if (data) setTasks(data);
  } catch (error) {
    console.log('Failed to load tasks:', error);
  }
};

  const toggleDone = async (id: number, currentDone: boolean) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({ done: !currentDone })
      .eq('id', id);

    if (error) throw error;

    // update state lokal biar UI ikut berubah
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !currentDone } : t))
    );
  } catch (error) {
    console.log('Failed to toggle task:', error);
  }
};

  const deleteTask = async (id: number) => {
  Alert.alert("Delete Task?", "Are you sure you want to delete this task?", [
    { text: "Cancel", style: "cancel" },
    {
      text: "Delete",
      style: "destructive",
      onPress: async () => {
        try {
          const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id);

          if (error) throw error;

          // update state lokal
          setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (error) {
          console.log('Failed to delete task:', error);
        }
      },
    },
  ]);
};

  const goToAdd = () => {
    navigation.navigate("AddTask", { setTasks });
  };

  const todos = tasks.filter((t) => !t.done);
  const completed = tasks.filter((t) => t.done);

  const renderList = (data: Task[]) => (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskItem
  item={item}
  onPress={() => navigation.navigate("DetailTask", { item, setTasks, isCompleted: item.done })}
  onToggleDone={() => toggleDone(item.id, item.done)}
  onDelete={() => deleteTask(item.id)}
/>
      )}
      ListEmptyComponent={
        <Text style={styles.emptyText}>You don’t have any tasks yet!</Text>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 20,
        paddingHorizontal: 0,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Header onAdd={goToAdd} taskCount={todos.length} />

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "todos" && styles.activeTab]}
          onPress={() => setActiveTab("todos")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "todos" && styles.activeTabText,
            ]}
          >
            My Tasks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "completed" && styles.activeTab]}
          onPress={() => setActiveTab("completed")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "completed" && styles.activeTabText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {activeTab === "todos" ? renderList(todos) : renderList(completed)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fbfcf8" },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    backgroundColor: "#dfe9f8",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: "center" },
  activeTab: { backgroundColor: "#628ecb", borderRadius: 10 },
  tabText: { fontWeight: "bold", color: "#777" },
  activeTabText: { color: "#fbfcf8" },
  emptyText: { textAlign: "center", marginTop: 30, color: "#777" },
});