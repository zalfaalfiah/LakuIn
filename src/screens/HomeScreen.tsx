import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import TaskItem from '../components/TaskItem';
import { Task } from '../types/task';

export default function HomeScreen({ navigation }: any) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<'todos' | 'completed'>('todos');

  const toggleDone = (id: number) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id: number) => {
    Alert.alert('Delete Task?', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setTasks(prev => prev.filter(t => t.id !== id)) },
    ]);
  };

  const goToAdd = () => {
    navigation.navigate('AddTask', { setTasks });
  };

  const todos = tasks.filter(t => !t.done);
  const completed = tasks.filter(t => t.done);

  const renderList = (data: Task[]) => (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TaskItem
          item={item}
          onPress={() => navigation.navigate('DetailTask', { item, setTasks })}
          onToggleDone={() => toggleDone(item.id)}
          onDelete={() => deleteTask(item.id)}
        />
      )}
      ListEmptyComponent={<Text style={styles.emptyText}>You don’t have any tasks yet!</Text>}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ 
        paddingBottom: 20,
        paddingHorizontal: 0, 
    }}
  />
);

  return (
    <View style={styles.container}>
      <Header onAdd={goToAdd} taskCount={tasks.length} />

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tab, activeTab === 'todos' && styles.activeTab]} onPress={() => setActiveTab('todos')}>
          <Text style={[styles.tabText, activeTab === 'todos' && styles.activeTabText]}>My Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'completed' && styles.activeTab]} onPress={() => setActiveTab('completed')}>
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>Completed</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {activeTab === 'todos' ? renderList(todos) : renderList(completed)}
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fbfcf8' },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    backgroundColor: '#dfe9f8',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  activeTab: { backgroundColor: '#628ecb', borderRadius: 10 },
  tabText: { fontWeight: 'bold', color: '#777' },
  activeTabText: { color: '#fbfcf8' },
  emptyText: { textAlign: 'center', marginTop: 30, color: '#777' },
});
