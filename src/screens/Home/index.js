import React, { useState, useCallback, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'firebase/firestore'
import { firestore } from '../../services/firebase';

import { useNavigation, useIsFocused } from '@react-navigation/native';


import { View, Text } from 'react-native';
import { Container, Title } from './styles';
import { AuthContext } from '../../routes/context';

import Button from '../../components/Button';

const Home = () => {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [userUid, setUserUid] = useState();

  const handleCheckFirstAcess = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_uid');
    setUserUid(response);
    const snapshot = await firestore.collection('users').get();
    snapshot.forEach(doc => {
      if(doc.data().id === userUid){
        if(doc.data().home_id === "" || doc.data().home_id === undefined){
          navigation.navigate("FirstAccess")
        }
      }
    })
  }, [userUid, navigation]);

  useEffect(() => {
    handleCheckFirstAcess();
    if(isFocused){
      handleCheckFirstAcess();
    }
  }, [handleCheckFirstAcess,isFocused])


  return(
    <Container>
      <Title>oiiiiiii</Title>

      <Button 
          color="yellow"
          text="sair"
          onPress={() => signOut()}
        />
    </Container>
  );
}

export default Home;