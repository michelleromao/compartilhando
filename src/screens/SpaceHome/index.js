import React, { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'firebase/auth';
import 'firebase/firestore'

import { View, ActivityIndicator, Clipboard } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import { firestore } from '../../services/firebase';

import { Welcome, Invite, Code } from './styles';
import { Logo } from '../../components/Icons/index';
import Input from '../../components/Input';
import Button from '../../components/Button';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const SpaceHome = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [space, setSpace] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  const handleGetHomeId = useCallback(async () => {
    setLoading(true)
    const response = await AsyncStorage.getItem('@storage_uid');
    const snapshot = await firestore.collection('homes').get();
    snapshot.forEach(doc => {
      if(doc.data().creator_id === response){
          setLoading(false);
          setSpace({id: doc.data().id, name: doc.data().name})
      }
    })
  }, [])

  const copyToClipboard = () => {
   Clipboard.setString(space.id)
   setIsCopy(true)
   wait(2500).then(() => {setIsCopy(false)});
  }

  useEffect(() =>{
    handleGetHomeId();
  }, [handleGetHomeId]);

  return(
    <>
      {loading ? 
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
          }}>
          <ActivityIndicator size="small" color="#1D1843" />
        </View>
      :
        <>
          <View style={{width: "100%", flex: 1}}>
            <View
              style={{
                flex:1,
                width: "100%",
                paddingTop: "35%",
                paddingLeft: "8%",
                paddingRight: "8%",
                alignItems: "center"}}>
              <View style={{marginBottom: 48, alignItems: "center", width: '100%'}}>
                <Logo />
                <Welcome>{space.name} foi criado!</Welcome>
              </View>
              <Invite>Convide moradores através do código:</Invite>
              <View
                style={{
                  alignItems: "center",
                  width: '100%',
                  marginTop: 24
                }}>
                <View  
                style={{
                  width: "100%",
                }}>
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
          </View>
          <View style={{width: "100%", height: "12%", paddingLeft: "8%", paddingRight: "8%"}}>
            <Button 
              color="yellow"
              text="Pronto"
              onPress={() => navigation.navigate("Home")}
            />
          </View>

        </>
      }
    </>
  );
}

export default SpaceHome;
  