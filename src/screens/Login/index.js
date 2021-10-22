import React, { useState, useCallback, useEffect, useContext, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'firebase/auth';
import 'firebase/firestore'

import { View, ActivityIndicator, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Form } from '@unform/mobile';

import { auth, firestore } from '../../services/firebase';
import { AuthContext } from '../../routes/context';

import { Name, ForgotPassword } from './styles';
import { Logo } from '../../components/Icons/index';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Login = ({ navigation }) => {
  const formRef = useRef(null);
  const { signIn } = useContext(AuthContext);
  const [uidUser, setUidUser] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(data => {
    data = {
      email: 'leonardo123k@gmail.com',
      password: 'tcc123456'
    }
    if(data.email && data.password){
      setLoading(true);
      auth.signInWithEmailAndPassword(data.email, data.password)
      .then(userLogged => {
        setUidUser(userLogged.user.uid);
      })
      .catch(error => {
        setLoading(false);
        const errorCode = error.code;
        if(errorCode === "auth/wrong-password"){
          Alert.alert(
            'Ops!',
            'A senha está incorreta.',
            [{ text: 'OK', onPress: () => {} }],
            { cancelable: false },
          );
        }else if(errorCode === "auth/user-not-found"){
          Alert.alert(
            'Ops!',
            'Esse e-mail não existe na base de dados, por favor, cadastre-se.',
            [{ text: 'OK', onPress: () => {}}],
            { cancelable: false },
          );
        }
        else if(errorCode === "auth/invalid-email"){
          Alert.alert(
            'Ops!',
            'Esse e-mail não é válido.',
            [{ text: 'OK', onPress: () => {} }],
            { cancelable: false },
          );
        }
      });
    } else {
      Alert.alert(
        'Ops!',
        'Campo email e/ou senha vazio.',
        [{ text: 'OK', onPress: () => {}}],
        { cancelable: false },
      );
    }
  }, [])

  useEffect(() => {
    const loadUser = async () => {
      if (uidUser !== '') {
        const snapshot = await firestore.collection('users').get();
        snapshot.forEach(doc => {
          if (doc.data().id === uidUser) {
            AsyncStorage.setItem('@storage_uid', uidUser);
            signIn();
            setLoading(false);
          }
        });
      }
    };
    loadUser();
  }, [uidUser, signIn]);

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
        <View
          style={{
            flex:1,
            width: "100%",
            paddingTop: "35%",
            paddingLeft: "8%",
            paddingRight: "8%",
            alignItems: "center",
          }}>
            <View style={{marginBottom: 48, alignItems: "center"}}>
              <Logo />
              <Name>Compartilhando</Name>
            </View>
          <Form ref={formRef} onSubmit={handleSubmit} style={{width: "100%", alignItems: "center"}}>
            <Input name="email" type="email" label="E-mail"/>
            <Input name="password" type="password" label="Senha" password={true}/>
            <View
              style={{
                width: "100%",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity 
                style={{
                  marginTop: '-8%',
                  marginBottom: '12%'
                }}
                onPress={() => {("pressed")}}
              >
                <ForgotPassword> Esqueci a senha </ForgotPassword>
              </TouchableOpacity>
            </View>
            <Button 
              color="yellow"
              text="Entrar"
              onPress={() => formRef.current.submitForm()}
            />
          </Form>
          <View 
            style={{
              width: "100%",
              marginTop: "8%",
              alignItems: "center",
            }}>
            <Button 
              color="blue"
              text="Criar conta"
              onPress={() => navigation.navigate('CriarConta')}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

export default Login;