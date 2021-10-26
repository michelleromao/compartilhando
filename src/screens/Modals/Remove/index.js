import React, { useCallback, useState } from 'react';
import{ useNavigation, useRoute } from '@react-navigation/native';
import 'firebase/firestore'
import { firestore } from '../../../services/firebase';

import {Container, Content, Title, Description, GroupButton, ViewButton, Text} from './styles';

import Button from '../../../components/Button';

const Remove = () => {
  const navigation = useNavigation();
  const routes = useRoute();
  const [type, setType] = useState(routes.params.type === 'rule' ? "regra" : 
                                   routes.params.type === 'task' ? "tarefa" : 
                                   routes.params.type === 'bill' ? "conta" :
                                   routes.params.type === 'buy' ? "compra" : 
                                   routes.params.type === 'account' ? "sua conta" : 
                                   routes.params.type === 'space' ? "espaço" : "")

  const handleDelete = useCallback(async () => {
    if(routes.params.type  === 'rule'){
      const ruleRef = await firestore.collection('rules').doc(routes.params.id).delete();
      navigation.navigate("Rules");
    }else if(routes.params.type  === 'task'){
      const taskRef = await firestore.collection('tasks').doc(routes.params.id).delete();
      navigation.navigate("Tasks");
    }else if(routes.params.type  === 'bill'){
      const billRef = await firestore.collection('bills').doc(routes.params.id).delete();
      navigation.navigate("Bills");
    }else if(routes.params.type  === 'buy'){
      const buyRef = await firestore.collection('payments').doc(routes.params.id).delete();
      navigation.navigate("Buys");
    }
  }, [routes, navigation])

  return(
    <Container>
      <Content>
        <Title>Excluir {type}</Title>
        {routes.params.description && 
          <Description>{routes.params.description}</Description>}
        <Text>Você deseja excluir essa {type}? Não será possível recuperá-la.</Text>

        <GroupButton>
          <ViewButton>
            <Button color="blue" text="Não" onPress={() => navigation.goBack()}/>
          </ViewButton>
          <ViewButton>
            <Button color="red" text="Sim" onPress={() => handleDelete()}/>
          </ViewButton>
        </GroupButton>
      </Content>
    </Container>
  )
}
export default Remove;