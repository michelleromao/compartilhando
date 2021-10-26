import React, { useState, useCallback, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'firebase/firestore'
import { firestore } from '../../services/firebase';

import { useNavigation, useIsFocused } from '@react-navigation/native';


import { View, ActivityIndicator } from 'react-native';
import { Container, Title } from './styles';
import { AuthContext } from '../../routes/context';

import Button from '../../components/Button';

const Home = () => {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [userUid, setUserUid] = useState();
  const [loading, setLoading] = useState(false);


  const handleCheckFirstAcess = useCallback(async () => {
    setLoading(true);
    const response = await AsyncStorage.getItem('@storage_uid');
    setUserUid(response);
    const snapshot = await firestore.collection('users').get();
    snapshot.forEach(doc => {
      if(doc.data().id === userUid){
        if(doc.data().home_id === "" || doc.data().home_id === undefined){
          setLoading(false);
          navigation.navigate("FirstAccess")
        }else{
          setLoading(false);
          AsyncStorage.setItem('@storage_homeid', doc.data().home_id);
        }
      }
    })
  }, [userUid, navigation]);

  useEffect(() => {
    handleCheckFirstAcess();
  }, [handleCheckFirstAcess])


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
        <Container>
          <Title>oiiiiiii</Title>

          <Button 
              color="yellow"
              text="sair"
              onPress={() => signOut()}
            />
        </Container>
      }
    </>
  );
}

export default Home;