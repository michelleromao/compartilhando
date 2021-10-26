import React, { useState, useCallback, useRef } from 'react';
import {v4 as uuidv4} from 'uuid';
import 'react-native-get-random-values';
import { View, ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView } from 'react-native';
import { Form } from '@unform/mobile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import 'firebase/firestore'
import { firestore } from '../../services/firebase';

import Input from '../../components/Input';
import Button from '../../components/Button';


const CreateSpace = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = useCallback(async (data) => {
    setLoading(true);
    if(data.name === "" || data.name === "undefined"){
      Alert.alert(
        'Ops!',
        'Você precisa nomear seu espaço.',
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false },
      );
    }else {
      const response = await AsyncStorage.getItem('@storage_uid');
      const docRef = firestore.collection('homes').doc();
      const home_id =  uuidv4();
      await docRef.set({
        id: home_id,
        creator_ud: response,
        name: data.name,
        created_at: Date.now()
      });
    
      const userRef = firestore.collection("users").doc(response);
      await userRef.update({
        home_id: home_id,
      })
      setLoading(false);
      navigation.navigate("Home");
    }
  }, [])

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
      <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"> 
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1}}
      > 
        <View
          style={{
            flex:1,
            width: "100%",
            alignItems: "flex-start",
          }}>
            <Form ref={formRef} onSubmit={handleSubmit} style={{width: "100%", alignItems: "center", justifyContent: "space-around", height: "100%"}}>
              <ScrollView
                contentContainerStyle={{ flex: 1 }}
              >
                <View style={{width: "100%"}}>
                  <Input name="name" type="text" label="Nome da moradia"/>
                </View>
              </ScrollView>
              <View style={{width: "100%", height: "16%", paddingLeft: "8%", paddingRight: "8%"}}>
                <Button 
                  color="yellow"
                  text="Pronto"
                  onPress={() => formRef.current.submitForm()}
                />
              </View>
            </Form>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      )}
   </ScrollView>   
  );
}

export default CreateSpace;