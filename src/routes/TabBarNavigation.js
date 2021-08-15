import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, useCardAnimation } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from '../screens/Home';
import Tasks from '../screens/Tasks';
import Rules from '../screens/Rules';
import Bills from '../screens/Bills';
import Buys from '../screens/Buys';

const HomeStack = createStackNavigator();
const HomeTabNavigation = () =>{
  return(
    <HomeStack.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor: 'black'
        },
        headerTintColor: '#352166',
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
        cardStyle: { backgroundColor: '#F6F6F6' },
        headerBackTitle: 'Voltar',
        headerBackTitleVisible: true,
        headerBackTitleStyle: { fontSize: 15 },
      }}
      >
        <HomeStack.Screen 
          name="Início"
          component={Home}
          options={{headerTitle: 'Início'}}
        />
      </HomeStack.Navigator>
  )
}

const TaskStack = createStackNavigator();
const TaskTabNavigation = () =>{
  return(
    <TaskStack.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor: 'black'
        },
        headerTintColor: '#352166',
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
        cardStyle: { backgroundColor: '#F6F6F6' },
        headerBackTitle: 'Voltar',
        headerBackTitleVisible: true,
        headerBackTitleStyle: { fontSize: 15 },
      }}
      >
        <TaskStack.Screen 
          name="Tarefas"
          component={Tasks}
          options={{headerTitle: 'Tarefas'}}
        />
      </TaskStack.Navigator>
  )
}

const RuleStack = createStackNavigator();
const RuleTabNavigation = () =>{
  return(
    <RuleStack.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor: 'black'
        },
        headerTintColor: '#352166',
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
        cardStyle: { backgroundColor: '#F6F6F6' },
        headerBackTitle: 'Voltar',
        headerBackTitleVisible: true,
        headerBackTitleStyle: { fontSize: 15 },
      }}
      >
        <RuleStack.Screen 
          name="Regras"
          component={Rules}
          options={{headerTitle: 'Regras'}}
        />
      </RuleStack.Navigator>
  )
}

const BillStack = createStackNavigator();
const BillTabNavigation = () =>{
  return(
    <BillStack.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor: 'black'
        },
        headerTintColor: '#352166',
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
        cardStyle: { backgroundColor: '#F6F6F6' },
        headerBackTitle: 'Voltar',
        headerBackTitleVisible: true,
        headerBackTitleStyle: { fontSize: 15 },
      }}
      >
        <BillStack.Screen 
          name="Contas"
          component={Bills}
          options={{headerTitle: 'Contas'}}
        />
      </BillStack.Navigator>
  )
}

const BuyStack = createStackNavigator();
const BuyTabNavigation = () =>{
  return(
    <BuyStack.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor: 'black'
        },
        headerTintColor: '#352166',
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
        cardStyle: { backgroundColor: '#F6F6F6' },
        headerBackTitle: 'Voltar',
        headerBackTitleVisible: true,
        headerBackTitleStyle: { fontSize: 15 },
      }}
      >
        <BuyStack.Screen 
          name="Compras"
          component={Buys}
          options={{headerTitle: 'Compras'}}
        />
      </BuyStack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator();
const BottomTabNavigation = () => {

  return(
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        tabStyle: {
          backgroundColor: '#6CB9AA',
          paddingBottom: 10,
          height: 62,
        },
      }}
      >
        <BottomTab.Screen 
          name="Início"
          component={HomeTabNavigation}/>
        <BottomTab.Screen 
          name="Tarefas"
          component={TaskTabNavigation}/>
        <BottomTab.Screen 
          name="Regras"
          component={RuleTabNavigation}/>
        <BottomTab.Screen 
          name="Contas"
          component={BillTabNavigation}/>
        <BottomTab.Screen 
          name="Compras"
          component={BuyTabNavigation}/>
      </BottomTab.Navigator>
  )
}

export default BottomTabNavigation;