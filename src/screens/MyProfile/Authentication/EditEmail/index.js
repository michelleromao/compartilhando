import React, { useState, useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import 'firebase/firestore'
import 'firebase/auth'


import { View, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Form } from '@unform/mobile';

import { firestore, auth } from '../../../../services/firebase';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';


const EditEmail = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const routes = useRoute();
  const [email, setEmail] = useState();

  const handleGetDetails = useCallback(async () => {
    setLoading(true)

    const userUid = await AsyncStorage.getItem('@storage_uid');
    const userRef = await firestore.collection("users").get(userUid);

    userRef.forEach(doc => {
      if(doc.data().id === userUid){
        setEmail(doc.data().email)
      }
    })
    setLoading(false)
    
  },[])

  const handleSubmit = useCallback(async (data) => {
    if(data.email === "" ||data.email === undefined){
      Alert.alert(
        'Campo vazio',
        'O e-mail não pode ser vazio',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }else{
      setLoading(true)
      const userUid = await AsyncStorage.getItem('@storage_uid');

      const docRef = firestore.collection('users').doc(userUid);
      await docRef.update({
        email: data.email,
      });
      await auth.currentUser.updateEmail(data.email)

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
                  <Input name="email" type="text" label="E-mail:" defaultValue={email}/>
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

export default EditEmail;