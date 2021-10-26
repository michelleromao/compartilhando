import React from 'react';
import { View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Tasks from '../screens/Tasks';
import Rules from '../screens/Rules';
import Bills from '../screens/Bills';
import Buys from '../screens/Buys';

import { HomeIcon, RuleIcon, BillIcon, BuyIcon, TaskIcon } from '../components/Icons/index'


const HomeStack = createStackNavigator();
const HomeTabNavigation = () =>{
  return(
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
        <HomeStack.Screen 
          name="Home"
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
      headerShown: false
    }}
      >
        <TaskStack.Screen 
          name="Tasks"
          component={Tasks}
        />
      </TaskStack.Navigator>
  )
}

const RuleStack = createStackNavigator();
const RuleTabNavigation = () =>{
  return(
    <RuleStack.Navigator
    screenOptions={{
      headerShown: false
    }}
      >
        <RuleStack.Screen 
          name="Rules"
          component={Rules}
        />
      </RuleStack.Navigator>
  )
}

const BillStack = createStackNavigator();
const BillTabNavigation = () =>{
  return(
    <BillStack.Navigator
    screenOptions={{
      headerShown: false
    }}
      >
        <BillStack.Screen 
          name="Bills"
          component={Bills}
        />
      </BillStack.Navigator>
  )
}

const BuyStack = createStackNavigator();
const BuyTabNavigation = () =>{
  return(
    <BuyStack.Navigator
    screenOptions={{
      headerShown: false
    }}
      >
        <BuyStack.Screen 
          name="Buys"
          component={Buys}
        />
      </BuyStack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator();
const BottomTabNavigation = () => {
  return(
    <BottomTab.Navigator

      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: {
          color: '#1D1843',
          paddingBottom: 3
        },
        tabBarStyle:{
          backgroundColor: '#F6F6F6',
          borderBottomColor: "#F6F6F6",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          borderTopWidth: 0
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Início') {
            return (
              <View style={focused ? { opacity: 1 } : { opacity: 0.5 }}>
                <HomeIcon />
              </View>
            );
          }
          if (route.name === 'Regras') {
            return (
              <View style={focused ? { opacity: 1 } : { opacity: 0.5 }}>
                <RuleIcon />
              </View>
            );
          }
          if (route.name === 'Contas') {
            return (
              <View style={focused ? { opacity: 1 } : { opacity: 0.5 }}>
                <BillIcon />
              </View>
            );
          }
          if (route.name === 'Compras') {
            return (
              <View style={focused ? { opacity: 1 } : { opacity: 0.5 }}>
                <BuyIcon />
              </View>
            );
          }
          if (route.name === 'Tarefas') {
            return (
              <View style={focused ? { opacity: 1 } : { opacity: 0.5 }}>
                <TaskIcon />
              </View>
            );
          }
        },
      })}
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