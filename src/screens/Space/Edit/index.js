import React, { useState, useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import 'firebase/firestore'

import { View, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Form } from '@unform/mobile';

import { firestore } from '../../../services/firebase';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {Code, Invite} from "./styles.js"


const EditSpace = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const routes = useRoute();
  const [name, setName] = useState();
  const [id, setID] = useState();

  const handleGetDetails = useCallback(async () => {
    setLoading(true)

    const homeId = await AsyncStorage.getItem('@storage_homeid');
    setID(homeId)

    const docRef = await firestore.collection("homes").get();
    docRef.forEach(doc => {
      if(doc.data().id === homeId){
        setName(doc.data().name)
      }
    })
    setLoading(false)
    
  },[routes])

  const handleSubmit = useCallback(async (data) => {
    if(data.name === "" ||data.name === undefined){
      Alert.alert(
        'Campo vazio',
        'A sua casa precisa ter um nome',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }else{
      setLoading(true)
      const homeId = await AsyncStorage.getItem('@storage_homeid');

      const docRef = firestore.collection('homes').doc(homeId);
      await docRef.update({
        name: data.name
      });
      navigation.goBack();
    }
  }, [routes, navigation])

  useEffect(() => {
    handleGetDetails()
  },[handleGetDetails]);


  return(
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"> 
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex: 1}}
        >
          <View
            style={{
              flex:1,
              width: "100%",
              alignItems: "center",
              
            }}>
              <View
                style={{
                  width: "100%",
                  alignItems: "flex-start",
                 paddingLeft: "8%",
                 paddingRight: "8%",
                 marginBottom: 44}}>
                <Invite>Código da moradia:</Invite>
                <View
                  style={{
                    alignItems: "flex-start",
                    width: '100%',
                    marginTop: 20
                  }}>
                  <View>
                    <Code>{id}</Code>
                  </View>
                </View>
              </View>

            <Form ref={formRef} onSubmit={handleSubmit} style={{width: "100%", alignItems: "center", justifyContent: "space-around", height: "100%"}}>
            <ScrollView
              contentContainerStyle={{ flex: 1 }}
            >
                <View style={{width: "100%"}}>
                  <Input name="name" type="text" label="Digite o nome do item:" defaultValue={name}/>
                </View>
              </ScrollView>
              <View style={{width: "100%", height: "30%", paddingLeft: "8%", paddingRight: "8%"}}>
                <Button 
                  color="yellow"
                  text="Pronto"
                  onPress={() => formRef.current.submitForm()}
                />
              </View>
            </Form>
          </View>
        </KeyboardAvoidingView>
      )}
    </ScrollView>
  );
}

export default EditSpace;