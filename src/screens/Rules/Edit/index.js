import React, { useState, useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import 'firebase/firestore'

import { View, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Form } from '@unform/mobile';

import { firestore } from '../../../services/firebase';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {Delete, Close} from "./styles.js"


const EditRule = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const routes = useRoute();
  const [description, setDescription] = useState();

  const handleGetDetails = useCallback(async () => {
    setLoading(true)

    const ruleRef = await firestore.collection("rules").get(routes.params.id);
    const userUid = await AsyncStorage.getItem('@storage_uid');

    ruleRef.forEach(doc => {
      if(doc.data().creator_id === userUid && doc.data().id === routes.params.id){
        setDescription(doc.data().description)
        setLoading(false)
      }
    })
    
  },[routes])

  const handleSubmit = useCallback(async (data) => {
    if(data.description === "" ||data.description === undefined){
      Alert.alert(
        'Campo vazio',
        'A sua regra precisa ser descrita',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }else{
      setLoading(true)
      const homeId = await AsyncStorage.getItem('@storage_homeid');
      const userUid = await AsyncStorage.getItem('@storage_uid');

      const docRef = firestore.collection('rules').doc(routes.params.id);
      await docRef.update({
        description: data.description,
        home_id: homeId,
        creator_id: userUid,
        id: docRef.id,
        updated_at: Date.now().toLocaleString()
      });
      navigation.goBack();
    }
  }, [routes, navigation])

  useEffect(() => {
    handleGetDetails()
  },[handleGetDetails]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Delete onPress={() => navigation.navigate("Remove", {id: routes.params.id, type: 'rule'})}><Close>x</Close></Delete>
      ),
    });
  }, [navigation,routes]);

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
                  <Input name="description" type="text" label="Descreva a regra:" textarea={true} defaultValue={description}/>
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

export default EditRule;