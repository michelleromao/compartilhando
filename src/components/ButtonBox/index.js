import React, { useCallback, useEffect, useState } from 'react';
import{ useNavigation, useRoute } from '@react-navigation/native';

import 'firebase/firestore'
import { firestore } from '../../services/firebase';

import { View } from 'react-native'
import {Container, Text, Checkbox, Buyer} from './styles';

function ButtonBox({ id, buyer_id, statusItem, logged, item, text, owner,...rest }) {
  const [status, setStatus] = useState(false);
  const navigation = useNavigation();
  const [buyerName, setBuyerName] = useState()

  const handleGetBuyer = useCallback(async () => {
    if(buyer_id){
      const snapshotUser = await firestore.collection('users').get(buyer_id);
      snapshotUser.forEach(doc => {
        if(doc.data().id === buyer_id){
          setBuyerName(doc.data().name)
        }
      })
    }
  }, [])

  useEffect(() => {
    handleGetBuyer()
  }, [handleGetBuyer])

  const handleCheck = useCallback(() => {
    if(status === false){
      setStatus(true)
      navigation.navigate("PurchaseItem", {id: id, item: item, logged: logged})
    }else{
      setStatus(false)
    }
  }, [status])

  return(
    <Container {...rest} statusItem={statusItem}>
      {statusItem ? <></> : <Checkbox status={status} onPress={handleCheck}/>}
      <Text>{item}</Text>
      {buyerName ? <Buyer>Compra feita por {buyerName}</Buyer> : <></>}
    </Container>
  )
}

export default ButtonBox;