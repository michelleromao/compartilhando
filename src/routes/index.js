import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, ActivityIndicator, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabBarNavigation from './TabBarNavigation';
import { AuthContext } from './context';
import { Entypo } from '@expo/vector-icons';


import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

import CreateSpace from '../screens/CreateSpace';
import EnterSpace from '../screens/EnterSpace';
import Space from '../screens/Space';
import FirstAccess from '../screens/FirstAccess';

import MyProfile from '../screens/MyProfile';
import Personal from '../screens/Personal';
import Authentication from '../screens/Authentication';

import Remove from '../screens/Modals/Remove';


const Stack = createStackNavigator();
const ModalStack = createStackNavigator();

const RootNavigator = () => {
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Root"
     >
       <Stack.Screen name="Root" component={TabBarNavigation}/>
       <Stack.Screen name="CreateSpace" component={CreateSpace} options={{
          headerTitle: 'Criar',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F6F6',
          },
          headerTintColor: '#352166',
          headerTitleAlign: 'center',
          headerTitleAllowFontScaling: true,
          headerTitleStyle: { fontWeight: '600' },
          cardStyle: { backgroundColor: '#F6F6F6' },
          headerBackTitle: 'Voltar',
          headerBackTitleVisible: true,
          headerBackTitleStyle: { fontSize: 15 },
          headerPressColorAndroid: 'transparent',
          headerBackImage: () => (
            <Entypo name="chevron-left" size={20} color="#352166" />
          ),
        }}/>
        <Stack.Screen name="EnterSpace" component={EnterSpace} options={{
            headerTitle: 'Entrar',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F6F6F6',
            },
            headerTintColor: '#352166',
            headerTitleAlign: 'center',
            headerTitleAllowFontScaling: true,
            headerTitleStyle: { fontWeight: '600' },
            cardStyle: { backgroundColor: '#F6F6F6' },
            headerBackTitle: 'Voltar',
            headerBackTitleVisible: true,
            headerBackTitleStyle: { fontSize: 15 },
            headerPressColorAndroid: 'transparent',
            headerBackImage: () => (
              <Entypo name="chevron-left" size={20} color="#352166" />
            ),
        }}/>
        <Stack.Screen name="Space" component={Space} options={{
          headerTitle: 'Espaço',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F6F6',
          },
          headerTintColor: '#352166',
          headerTitleAlign: 'center',
          headerTitleAllowFontScaling: true,
          headerTitleStyle: { fontWeight: '600' },
          cardStyle: { backgroundColor: '#F6F6F6' },
          headerBackTitle: 'Voltar',
          headerBackTitleVisible: true,
          headerBackTitleStyle: { fontSize: 15 },
          headerPressColorAndroid: 'transparent',
          headerBackImage: () => (
            <Entypo name="chevron-left" size={20} color="#352166" />
          ),
        }}/>
        <Stack.Screen name="FirstAccess" component={FirstAccess} options={{
          headerTitle: 'Boas vindas',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F6F6',
          },
          headerTintColor: '#352166',
          headerTitleAlign: 'center',
          headerTitleAllowFontScaling: true,
          headerTitleStyle: { fontWeight: '600' },
          cardStyle: { backgroundColor: '#F6F6F6' },
          headerBackTitle: 'Voltar',
          headerBackTitleVisible: true,
          headerBackTitleStyle: { fontSize: 15 },
          headerPressColorAndroid: 'transparent',
          headerBackImage: () => (
            <Entypo name="chevron-left" size={20} color="#352166" />
          ),
        }}/>

        <Stack.Screen name="MyProfile" component={MyProfile} options={{
          headerTitle: 'Meu perfil',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F6F6',
          },
          headerTintColor: '#352166',
          headerTitleAlign: 'center',
          headerTitleAllowFontScaling: true,
          headerTitleStyle: { fontWeight: '600' },
          cardStyle: { backgroundColor: '#F6F6F6' },
          headerBackTitle: 'Voltar',
          headerBackTitleVisible: true,
          headerBackTitleStyle: { fontSize: 15 },
          headerPressColorAndroid: 'transparent',
          headerBackImage: () => (
            <Entypo name="chevron-left" size={20} color="#352166" />
          ),
        }}/>
        <Stack.Screen name="Personal" component={Personal} options={{
          headerTitle: 'Pessoal',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F6F6',
          },
          headerTintColor: '#352166',
          headerTitleAlign: 'center',
          headerTitleAllowFontScaling: true,
          headerTitleStyle: { fontWeight: '600' },
          cardStyle: { backgroundColor: '#F6F6F6' },
          headerBackTitle: 'Voltar',
          headerBackTitleVisible: true,
          headerBackTitleStyle: { fontSize: 15 },
          headerPressColorAndroid: 'transparent',
          headerBackImage: () => (
            <Entypo name="chevron-left" size={20} color="#352166" />
          ),
        }}/>
        <Stack.Screen name="Authentication" component={Authentication} options={{
          headerTitle: 'Autenticação',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F6F6',
          },
          headerTintColor: '#352166',
          headerTitleAlign: 'center',
          headerTitleAllowFontScaling: true,
          headerTitleStyle: { fontWeight: '600' },
          cardStyle: { backgroundColor: '#F6F6F6' },
          headerBackTitle: 'Voltar',
          headerBackTitleVisible: true,
          headerBackTitleStyle: { fontSize: 15 },
          headerPressColorAndroid: 'transparent',
          headerBackImage: () => (
            <Entypo name="chevron-left" size={20} color="#352166" />
          ),
        }}/>
    </Stack.Navigator>
  )
}

const ModalNavigator = () => {
  return(
    <ModalStack.Navigator
     screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}
      mode="modal"
      >
        <ModalStack.Screen
          name="Inicio"
          component={RootNavigator}
          options={{ headerShown: false }}
        />
       <ModalStack.Screen name="Remove" component={Remove} />
    </ModalStack.Navigator>
  )
}

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Bem-vindo"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F6F6F6',
        },
        headerTintColor: '#352166',
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
        headerTitleStyle: { fontWeight: '600' },
        cardStyle: { backgroundColor: '#F6F6F6' },
        headerBackTitle: 'Voltar',
        headerBackTitleVisible: true,
        headerBackTitleStyle: { fontSize: 15 },
        headerPressColorAndroid: 'transparent',
        headerBackImage: () => (
          <Entypo name="chevron-left" size={20} color="#352166" />
        ),
      }}
    >
      <Stack.Screen
        name="Entrar"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CriarConta"
        component={SignUp}
        options={{ headerTitle: 'Criar conta' }}
      />
    </Stack.Navigator>
  );
}

const Routes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const[userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('---');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('---');
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      }
    }
  }, [])

  if(isLoading){
    return(
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'row',
          padding: 10,
        }}
      >
        <ActivityIndicator size={50} color="#352166" />
      </View>
    );
  }

  return(
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          {userToken? <ModalNavigator /> : <AuthStack/>}
        </SafeAreaView>
      </NavigationContainer>
    </AuthContext.Provider>
  )
};

export default Routes;