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

import CreateRule from '../screens/Rules/Create';

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
          headerTitle: 'Criar espaço',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F6F6',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            height: 125
          },
          headerTintColor: '#1D1843',
          headerTitleAlign: 'left',
          headerTitleAllowFontScaling: true,
          headerTitleStyle: { fontWeight: '600', fontFamily: "Nunito_700Bold", fontSize: 24 },
          cardStyle: { backgroundColor: '#F6F6F6' },
          headerBackTitleVisible: false,
          headerPressColorAndroid: 'transparent',
          headerBackImage: () => (
            <Entypo name="chevron-left" size={32} color="#1D1843" />
          ),}}/>
        <Stack.Screen name="EnterSpace" component={EnterSpace} options={{
            headerTitle: 'Entrar',
            headerShown: true,
           headerStyle: {
            backgroundColor: '#F6F6F6',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            height: 125
          },
          headerTintColor: '#1D1843',
          headerTitleAlign: 'left',
          headerTitleAllowFontScaling: true,
          headerTitleStyle: { fontWeight: '600', fontFamily: "Nunito_700Bold", fontSize: 24 },
          cardStyle: { backgroundColor: '#F6F6F6' },
          headerBackTitleVisible: false,
          headerPressColorAndroid: 'transparent',
          headerBackImage: () => (
            <Entypo name="chevron-left" size={32} color="#1D1843" />
          ),}}/>
        <Stack.Screen name="Space" component={Space} options={{
          headerTitle: 'Espaço',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F6F6',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            height: 125
          },
          headerTintColor: '#1D1843',
          headerTitleAlign: 'left',
          headerTitleAllowFontScaling: true,
          headerTitleStyle: { fontWeight: '600', fontFamily: "Nunito_700Bold", fontSize: 24 },
          cardStyle: { backgroundColor: '#F6F6F6' },
          headerBackTitleVisible: false,
          headerPressColorAndroid: 'transparent',
          headerBackImage: () => (
            <Entypo name="chevron-left" size={32} color="#1D1843" />
          ),}}/>
        <Stack.Screen name="FirstAccess" component={FirstAccess} options={{
          headerTitle: 'Boas vindas',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F6F6',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            height: 125
          },
          headerTintColor: '#1D1843',
          headerTitleAlign: 'left',
          headerTitleAllowFontScaling: true,
          headerTitleStyle: { fontWeight: '600', fontFamily: "Nunito_700Bold", fontSize: 24,  paddingLeft: "4%" },
          cardStyle: { backgroundColor: '#F6F6F6' },
          headerPressColorAndroid: 'transparent',
          headerLeft: () => <></>
          }}/>

        <Stack.Screen name="MyProfile" component={MyProfile} options={{
          headerTitle: 'Meu perfil',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F6F6',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            height: 125
          },
          headerTintColor: '#1D1843',
          headerTitleAlign: 'left',
          headerTitleAllowFontScaling: true,
          headerTitleStyle: { fontWeight: '600', fontFamily: "Nunito_700Bold", fontSize: 24 },
          cardStyle: { backgroundColor: '#F6F6F6' },
          headerBackTitleVisible: false,
          headerPressColorAndroid: 'transparent',
          headerBackImage: () => (
            <Entypo name="chevron-left" size={32} color="#1D1843" />
          ),}}/>
        <Stack.Screen name="Personal" component={Personal} options={{
          headerTitle: 'Pessoal',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F6F6',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            height: 125
          },
          headerTintColor: '#1D1843',
          headerTitleAlign: 'left',
          headerTitleAllowFontScaling: true,
          headerTitleStyle: { fontWeight: '600', fontFamily: "Nunito_700Bold", fontSize: 24 },
          cardStyle: { backgroundColor: '#F6F6F6' },
          headerBackTitleVisible: false,
          headerPressColorAndroid: 'transparent',
          headerBackImage: () => (
            <Entypo name="chevron-left" size={32} color="#1D1843" />
          ),}}/>
        <Stack.Screen name="Authentication" component={Authentication} options={{
          headerTitle: 'Autenticação',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F6F6',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            height: 125
          },
          headerTintColor: '#1D1843',
          headerTitleAlign: 'left',
          headerTitleAllowFontScaling: true,
          headerTitleStyle: { fontWeight: '600', fontFamily: "Nunito_700Bold", fontSize: 24 },
          cardStyle: { backgroundColor: '#F6F6F6' },
          headerBackTitleVisible: false,
          headerPressColorAndroid: 'transparent',
          headerBackImage: () => (
            <Entypo name="chevron-left" size={32} color="#1D1843" />
        ),}}/>
        <Stack.Screen name="CreateRule" component={CreateRule} options={{
          headerTitle: 'Criar regra',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F6F6',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            height: 125
          },
          headerTintColor: '#1D1843',
          headerTitleAlign: 'left',
          headerTitleAllowFontScaling: true,
          headerTitleStyle: { fontWeight: '600', fontFamily: "Nunito_700Bold", fontSize: 24 },
          cardStyle: { backgroundColor: '#F6F6F6' },
          headerBackTitleVisible: false,
          headerPressColorAndroid: 'transparent',
          headerBackImage: () => (
            <Entypo name="chevron-left" size={32} color="#1D1843" />
        ),}}/>
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
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: 125
        },
        headerTintColor: '#1D1843',
        headerTitleAlign: 'left',
        headerTitleAllowFontScaling: true,
        headerTitleStyle: { fontWeight: '600', fontFamily: "Nunito_700Bold", fontSize: 24 },
        cardStyle: { backgroundColor: '#F6F6F6' },
        headerBackTitleVisible: false,
        headerPressColorAndroid: 'transparent',
        headerBackImage: () => (
          <Entypo name="chevron-left" size={32} color="#1D1843" />
        ),}}
    >
      <Stack.Screen
        name="Entrar"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CriarConta"
        component={SignUp}
        options={{ 
          headerTitle: 'Criar conta',
          headerShown: true,
          }}
      />
    </Stack.Navigator>
  );
}

const Routes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const[userToken, setUserToken] = useState(null);

  const authContext = useMemo((uid) => {
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