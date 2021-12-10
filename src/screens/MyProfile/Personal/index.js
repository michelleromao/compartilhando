import React, { useState, useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import 'firebase/firestore'

import { View, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Form } from '@unform/mobile';

import { firestore } from '../../../services/firebase';

import Input from '../../../components/Input';
import Button from '../../../components/Button';


const Personal = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const routes = useRoute();
  const [name, setName] = useState();
  const [user, setUser] = useState();

  const handleGetDetails = useCallback(async () => {
    setLoading(true)

    const userUid = await AsyncStorage.getItem('@storage_uid');
    const userRef = await firestore.collection("users").get(userUid);

    userRef.forEach(doc => {
      if(doc.data().id === userUid){
        setName(doc.data().name)
        setUser(doc.data().username)
      }
    })
    setLoading(false)
    
  },[])

  const handleSubmit = useCallback(async (data) => {
    if(data.name === "" ||data.name === undefined){
      Alert.alert(
        'Campo vazio',
        'O nome não pode ser vazio',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }else if(data.username === "" ||data.username === undefined){
      Alert.alert(
        'Campo vazio',
        'O usuário não pode ser vazio',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }else{
      setLoading(true)
      const userUid = await AsyncStorage.getItem('@storage_uid');

      const docRef = firestore.collection('users').doc(userUid);
      await docRef.update({
        username: data.username,
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
            <Form ref={formRef} onSubmit={handleSubmit} style={{width: "100%", alignItems: "center", justifyContent: "space-around", height: "100%"}}>
            <ScrollView
              contentContainerStyle={{ flex: 1 }}
            >
                <View style={{width: "100%"}}>
                  <Input name="name" type="text" label="Nome:" defaultValue={name}/>
                  <Input name="username" type="text" label="Usuário:" defaultValue={user}/>
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
      )}
    </ScrollView>
  );
}

export default Personal;