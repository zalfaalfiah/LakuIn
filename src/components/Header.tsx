import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

interface HeaderProps {
  onAdd: () => void;
  taskCount: number;
}

export default function Header({ onAdd, taskCount }: HeaderProps) {
  const date = dayjs().format('D MMM');
  const weekday = 'Today';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Tengah atas */}
        <View style={styles.centerDate}>
          <Text style={styles.dateText}>{date}</Text>
        </View>

        {/* Bawah baris utama */}
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.today}>{weekday}</Text>
            <Text style={styles.taskCount}>
              {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
            </Text>
          </View>

          <TouchableOpacity onPress={onAdd} style={styles.addBtn}>
            <Text style={styles.addText}>Add New</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbfcf8',
  },
  header: {
    backgroundColor: '#628ecb',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 25,
    paddingBottom: 20,
    paddingHorizontal: 20,
    position: 'relative',
  },
  centerDate: {
    alignItems: 'center',
    marginBottom: 10, // biar ada jarak antara tanggal & baris bawah
  },
  dateText: {
    color: '#fbfcf8',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  today: {
    color: '#fbfcf8',
    fontSize: 18,
    fontWeight: '600',
  },
  taskCount: {
    color: '#fbfcf8',
    opacity: 0.9,
    fontSize: 13,
    marginTop: 3,
  },
  addBtn: {
    backgroundColor: '#fbfcf8',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addText: {
    color: '#628ecb',
    fontWeight: '600',
    fontSize: 13,
  },
});
