import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Task } from '../types/task';

interface TaskItemProps {
  item: Task;
  onPress: () => void;
  onToggleDone: () => void;
  onDelete: () => void;
}

export default function TaskItem({ item, onPress, onToggleDone, onDelete }: TaskItemProps) {
  const [pressed, setPressed] = useState(false);

  const formattedDate = new Date(item.date).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={onDelete} style={styles.deleteBox}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons name="trash-outline" size={26} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={onPress}
        style={[
          styles.taskItem,
          { backgroundColor: pressed ? '#628ecb' : '#dfe9f8' },
        ]}
        activeOpacity={0.9}
      >
        <View style={styles.textContainer}>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
        </View>

        <TouchableOpacity onPress={onToggleDone} style={styles.iconContainer}>
          <Ionicons
            name={item.done ? 'checkmark-circle' : 'ellipse-outline'}
            size={28}
            color={'#628ecb'}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 15,
    marginVertical: 6, 
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  date: {
    fontWeight: 'bold',
    color: '#1a1a1a',
    flexShrink: 0,
    marginRight: 12,
    minWidth: 100,
  },
  title: {
    fontSize: 16,
    color: '#1a1a1a',
    flexGrow: 1,
    flexShrink: 1,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  deleteBox: {
    backgroundColor: '#ff5c5c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 10,
    marginVertical: 6,
  },
});
