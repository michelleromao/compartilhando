import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { View } from 'react-native';
import Routes from './routes';


const App = () => {
  return (
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: '#F6F6F6',
          }}
        >
          <Routes />
        </View>
        <StatusBar style="inverted" />
      </SafeAreaProvider>
  );
};
export default App;