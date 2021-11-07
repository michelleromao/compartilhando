import React, { useCallback, useState } from 'react';
import{ useNavigation, useRoute } from '@react-navigation/native';
import 'firebase/firestore'
import { firestore } from '../../../services/firebase';

import {Container, Content, Title, Description, GroupButton, ViewButton, Text} from './styles';

import Button from '../../../components/Button';

const Purchase = () => {
  const navigation = useNavigation();
  const routes = useRoute();

  const handlePurchase = useCallback(async () => {

    const docRef = firestore.collection('purchase_item').doc(routes.params.id);
      await docRef.update({
        updated_at: Date.now().toLocaleString(),
        buyer_id: routes.params.logged,
        status: true,
      });
    navigation.navigate("Buys");
  }, [routes, navigation])

  return(
    <Container>
      <Content>
        <Title>Fazer compra</Title>
          <Description>Comprar {routes.params.item}</Description>
        <Text>Confirmar que você comprou este item?</Text>

        <GroupButton>
          <ViewButton>
            <Button color="blue" text="Não" onPress={() => navigation.goBack()}/>
          </ViewButton>
          <ViewButton>
            <Button color="green" text="Sim" onPress={() => handlePurchase()}/>
          </ViewButton>
        </GroupButton>
      </Content>
    </Container>
  )
}
export default Purchase;