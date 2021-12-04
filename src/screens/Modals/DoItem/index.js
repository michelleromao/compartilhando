import React, { useCallback, useState } from 'react';
import{ useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/firestore'
import { firestore } from '../../../services/firebase';

import {Container, Content, Title, Description, GroupButton, ViewButton, Text} from './styles';

import Button from '../../../components/Button';

const DoItem = () => {
  const navigation = useNavigation();
  const routes = useRoute();

  const handleDo = useCallback(async () => {
    const homeId = await AsyncStorage.getItem('@storage_homeid');
    const userUid = await AsyncStorage.getItem('@storage_uid');
    
    const docRef = firestore.collection('does').doc();
    await docRef.set({
      task_id: routes.params.id,
      created_at: Date.now().toLocaleString(),
      doer_id: userUid,
      home_id: homeId
    });

    navigation.navigate("Tasks");
  }, [routes, navigation])

  return(
    <Container>
      <Content>
        <Title>Fazer tarefa</Title>
          <Description>{routes.params.task}</Description>
        <Text>Confirmar que você fez essa tarefa?</Text>

        <GroupButton>
          <ViewButton>
            <Button color="blue" text="Não" onPress={() => navigation.goBack()}/>
          </ViewButton>
          <ViewButton>
            <Button color="green" text="Sim" onPress={() => handleDo()}/>
          </ViewButton>
        </GroupButton>
      </Content>
    </Container>
  )
}
export default DoItem;