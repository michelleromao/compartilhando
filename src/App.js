import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { Theme } from './theme';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import Routes from './routes';

import {
  useFonts,
  Nunito_200ExtraLight,
  Nunito_400Regular,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';

const App = () => {
  let [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_400Regular,
    Nunito_700Bold
  });
  return (
      <SafeAreaProvider>
        {!fontsLoaded ? <></> : 
          <ThemeProvider theme={Theme}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#F6F6F6',
              }}
            >
              <Routes />
            </View>
            <StatusBar style="dark" />
          </ThemeProvider>
        }
      </SafeAreaProvider>
  );
};
export default App;