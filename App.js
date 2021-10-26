import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

import React from 'react';

import Index from './src/App';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return <Index />;
}