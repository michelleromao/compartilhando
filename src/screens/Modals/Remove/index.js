import React, { useCallback, useState, useContext } from 'react';
import{ useNavigation, useRoute } from '@react-navigation/native';
import 'firebase/firestore'
import 'firebase/auth'
import { auth, firestore } from '../../../services/firebase';
import { AuthContext } from '../../../routes/context';

import {Container, Content, Title, Description, GroupButton, ViewButton, Text, Description2} from './styles';

import Button from '../../../components/Button';

const Remove = () => {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const routes = useRoute();
  const [type, setType] = useState(routes.params.type === 'rule' ? "regra" : 
                                   routes.params.type === 'task' ? "tarefa" : 
                                   routes.params.type === 'bill' ? "conta" :
                                   routes.params.type === 'buy' ? "item" : 
                                   routes.params.type === 'account' ? "sua conta" : 
                                   routes.params.type === 'space' ? "espaço" :
                                   routes.params.type === 'resident' ? "morador" :
                                   routes.params.type === 'residentOut' ? "residentOut" : "")

  const handleDelete = useCallback(async () => {
    if(routes.params.type  === 'rule'){
      const ruleRef = await firestore.collection('rules').doc(routes.params.id).delete();
      navigation.navigate("Rules");
    }else if(routes.params.type  === 'task'){
      const taskRef = await firestore.collection('tasks').doc(routes.params.id).update({
        active: false
      });
      navigation.navigate("Tasks");
    }else if(routes.params.type  === 'bill'){
      const billRef = await firestore.collection('bills').doc(routes.params.id).delete();
      navigation.navigate("Bills");
    }else if(routes.params.type  === 'buy'){
      const buyRef = await firestore.collection('purchase_item').doc(routes.params.id).delete();
      navigation.navigate("Buys");
    }else if(routes.params.type === 'space'){
        const homeRef = await firestore.collection('homes').doc(routes.params.id).delete();
        let residentsArr = [];
        const taskRef = await firestore.collection('users').get()
        taskRef.forEach(doc => {
          if(doc.data().home_id === routes.params.id){
            residentsArr.push({id: doc.data().id})
          }
        })
        Promise.all(residentsArr.map(item => {
          const docUpdate = firestore.collection('users').doc(item.id).update({
            home_id: "",
          });
        })).then(resp => {
          navigation.navigate("Home");
        })
    }else if(routes.params.type === 'resident'){
      const residentRef = await firestore.collection('users').doc(routes.params.id).update({
        home_id: ""
      });
      navigation.navigate("Space");
    }else if(routes.params.type === "residentOut"){
      const residentRef = await firestore.collection('users').doc(routes.params.id).update({
        home_id: ""
      });
      navigation.navigate("Home");
    }else if(routes.params.type === "account"){
      const userRef = await firestore.collection('users').doc(routes.params.id).update({
        email: "",
        name: "Usuário excluido",
        username: ""
      });
      const user = auth.currentUser;
      user.delete().then(() => {
        signOut()
      }).catch(err => console.log(err))
    }
  }, [routes, navigation])

  return(
    <Container>
      <Content>
        {type === 'residentOut' ?
          <Title>Sair do espaço</Title>
          :
          <Title>Excluir {type}</Title>
        }
        {routes.params.description && 
          <Description>{routes.params.description}</Description>}
        {type === 'residentOut' ?
          <Text>Você deseja sair do espaço?</Text>
        :
          <Text>Você deseja excluir {type}? Não será possível recuperá-la.</Text>
        }
        {type === 'residentOut' &&
          <Description2>Você perderá todas as informações do espaço. A única forma de recuperar é entrando novamente.</Description2>
        }
        {routes.params.description2 && 
          <Description2>{routes.params.description2}</Description2>}

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