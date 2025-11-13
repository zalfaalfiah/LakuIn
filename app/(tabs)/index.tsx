import 'react-native-gesture-handler'; // 🟢 WAJIB: harus paling atas
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from '../../src/navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}