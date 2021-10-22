import React, { useState, useCallback, useEffect, useContext, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import 'firebase/auth';
import 'firebase/firestore'

import { View, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Form } from '@unform/mobile';

import { auth, firestore } from '../../services/firebase';
import { AuthContext } from '../../routes/context';

import { Tip } from './styles';
import { Logo } from '../../components/Icons/index';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp = () => {
  const formRef = useRef(null);
  const route = useRoute();
  const { signUp } = useContext(AuthContext);
  const [uidUser, setUidUser] = useState('');
  const [user,setUser] = useState({});
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = useCallback(data => {
    if(data.email === "" ||data.email === undefined || 
    data.name === "" || data.name === undefined ||
    data.password === "" || data.password === undefined ){
      Alert.alert(
        'Campo vazio',
        'Você precisa preencher todos os campos',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }else{
      setLoading(true);
      auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(userCreated => {
        setUidUser(userCreated.user.uid);
        setUser(data);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode === 'auth/weak-password'){
          Alert.alert(
            'Senha fraca',
            'A senha deve ter, pelo menos, 6 caracteres.',
            [{ text: 'OK', onPress: () => {} }],
            { cancelable: false },
          );
          setLoading(false);
        }else if(errorCode === 'auth/email-already-in-use'){
          Alert.alert(
            'E-mail já existe',
            'Esse email já está na nossa base de dados.',
            [{ text: 'OK', onPress: () => {} }],
            { cancelable: false },
          );
          setLoading(false);
        }
      });
    }
  }, [])

  useEffect(() => {
    const createUser = async () => {
      if (uidUser !== '') {
        const docRef = firestore.collection('users').doc(uidUser);
        await docRef.set({
          email: user.email,
          id: uidUser,
          username: user.email.split("@")[0],
          name: user.name,
          home_id: "",
          created_at: Date.now()
        });

        AsyncStorage.setItem('@storage_uid', uidUser);
        signUp();
        setLoading(false);
      }
    }
    createUser();
  }, [uidUser, signUp, user.email, user.name, user.username]);

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
              paddingLeft: "8%",
              paddingRight: "8%",
              alignItems: "center",
            }}>
            <Form ref={formRef} onSubmit={handleSubmit} style={{width: "100%", alignItems: "center", justifyContent: "space-around", height: "100%"}}>
            <ScrollView
              contentContainerStyle={{ flex: 1 }}
            >
                <View style={{width: "100%"}}>
                  <Input name="name" type="text" label="Nome"/>
                  <Input name="email" type="email" label="E-mail"/>
                  <Input name="password" type="password" label="Senha" password={true}/>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "flex-start",
                    }}
                  >
                      <Tip> Mínimo 8 caracteres </Tip>
                  </View>
                </View>
              </ScrollView>
              <View style={{width: "100%", height: "16%"}}>
                <Button 
                  color="yellow"
                  text="Criar conta"
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

export default SignUp;