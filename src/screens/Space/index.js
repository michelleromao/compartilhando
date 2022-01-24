import React, { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'firebase/firestore'
import { firestore } from '../../services/firebase';

import { View, Text, Clipboard} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import {Delete, Close, Invite, Code} from "./styles.js"
import Button from '../../components/Button';
import Resident from '../../components/Resident';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Space = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [space, setSpace] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [residents, setResidents] = useState([]);
  const [id, setID] = useState([]);
  const [homeID, setHomeID] = useState([]);


  const handleGetHomeId = useCallback(async () => {
    setLoading(true)
    const homeId = await AsyncStorage.getItem('@storage_homeid');
    const response = await AsyncStorage.getItem('@storage_uid');
    setID(response)
    setHomeID(homeId)
    const snapshot = await firestore.collection('homes').get();
    snapshot.forEach(doc => {
      if(doc.data().id === homeId){
        setSpace({id: doc.data().id, name: doc.data().name})
        if(doc.data().creator_id === response){
          setIsOwner(true)
        }
      }
    })
    setLoading(false)
  }, [])

  const handleGetResidents = useCallback(async () => {
    setLoading(true)
    const homeId = await AsyncStorage.getItem('@storage_homeid');
    const response = await AsyncStorage.getItem('@storage_uid');

    const snapshot = await firestore.collection('users').get();
    let residentsList = [];
    snapshot.forEach(doc => {
      if(doc.data().home_id === homeId){
        residentsList.push({id: doc.data().id, name: doc.data().name})
      }
    })
    residentsList.forEach((resident, i) =>{
      if(resident.id === response){
        residentsList.splice(i, 1)
      }
    })
    setResidents(residentsList)
    setLoading(false)
  }, [])

  const copyToClipboard = () => {
   Clipboard.setString(space.id)
   setIsCopy(true)
   wait(2500).then(() => {setIsCopy(false)});
  }

  useEffect(() =>{
    handleGetHomeId();
    if(isFocused){
      handleGetResidents();
    }
  }, [handleGetHomeId, handleGetResidents, isFocused]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if(isOwner === true) {
          return (
            <Delete onPress={() => navigation.navigate("Remove", {id: homeID, type: 'space', description2: 'Todos os moradores serão removidos e não será possível recuperar as informações futuramente.'})}><Close>x</Close></Delete>
          )}},
    });
  }, [navigation, isOwner, homeID]);

  return(
    <>
     {loading ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
        }}
      >
        <ActivityIndicator size="small" color="#1D1843" />
      </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ flex: 1 }}> 
            <View style={{flex: 1, marginRight: "8%", marginLeft: "8%"}}>
              <View
                style={{
                  width: "100%",
                  alignItems: "flex-start"}}>
                <Invite>Convide moradores através do código:</Invite>
                <View
                  style={{
                    alignItems: "flex-start",
                    width: '100%',
                    marginTop: 20
                  }}>
                  <View>
                    <Code>{space.id}</Code>
                  </View>
                  <View  
                    style={{
                      width: "30%",
                      marginTop: "4%"
                    }}>
                    <Button color="blue" text="Copiar" onPress={copyToClipboard} size/>
                  </View>
                  <View  
                    style={{
                      marginTop: "4%"
                    }}>
                    <Code>{isCopy && '(copiado)'}</Code>
                  </View>
                </View>
              </View>
              <View style={{
                  width: "100%",
                  alignItems: "flex-start",
                  marginTop: 16}}>
                {residents && residents.length > 0 &&
                  <>
                    <Invite>Esses são os moradores:</Invite>
                    {residents.map(resident => 
                      <Resident 
                        key={resident.id}
                        id={resident.id}
                        name={resident.name}
                        owner={isOwner}
                      />
                    )}
                  </>
                  
                }
              </View>
            </View>
          </ScrollView>
          <View style={{width: "100%", height: "15%", paddingLeft: "8%", paddingRight: "8%"}}>
            {isOwner ?
              <Button 
                color="yellow"
                text="Editar"
                onPress={() => navigation.navigate("EditSpace")}
              />
            :
              <Button 
                color="yellow"
                text="Sair do Espaço"
                onPress={() => navigation.navigate("Remove", {id: id, type: 'residentOut'})}
              />
            }
          </View>
      </>
    )}
    </>
  );
}

export default Space;