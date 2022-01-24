import React, { useState, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import 'firebase/firestore'

import { View, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Form } from '@unform/mobile';

import { firestore } from '../../../services/firebase';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

const CreateBuy = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = useCallback(async (data) => {
    if(data.item === "" ||data.item === undefined){
      Alert.alert(
        'Campo vazio',
        'O seu item para compra precisa ter um nome',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }else{
      setLoading(true)
      const homeId = await AsyncStorage.getItem('@storage_homeid');
      const userUid = await AsyncStorage.getItem('@storage_uid');

      const docRef = firestore.collection('purchase_item').doc();
      await docRef.set({
        item: data.item,
        home_id: homeId,
        creator_id: userUid,
        id: docRef.id,
        status: false,
        buyer_id: "",
        created_at: Date.now().toLocaleString()
      });
      navigation.goBack();
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
                  <Input name="item" type="text" label="Digite o nome do item:"/>
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

export default CreateBuy;