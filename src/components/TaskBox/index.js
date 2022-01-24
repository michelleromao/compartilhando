import React, { useCallback, useEffect, useState } from 'react';
import{ useNavigation, useRoute } from '@react-navigation/native';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import 'firebase/firestore'
import { firestore } from '../../services/firebase';

import { View } from 'react-native'
import {Container, Text, Checkbox, Doer, Frequency} from './styles';

function TaskBox({ id, doer_id, responsible_id, statusItem, logged, task, frequency, owner, done,...rest }) {
  const [status, setStatus] = useState(false);
  const navigation = useNavigation();
  const [doerName, setDoerName] = useState()
  const [doneDate, setDoneDate] = useState()
  const [responsibleName, setResponsibleName] = useState("")

  const handleGetDoneDate = useCallback( () => {
    if(done !== undefined){
      setDoneDate(format(new Date(Number(done)), 'dd/MM/yyyy'))
    }
  }, [])

  const handleGetDoer = useCallback(async () => {
    if(doer_id){
      const snapshotUser = await firestore.collection('users').get(doer_id);
      snapshotUser.forEach(doc => {
        if(doc.data().id === doer_id){
          setDoerName(doc.data().name)
        }
      })
    }
  }, [])

  const handleGetResponsible = useCallback(async () => {
    if(responsible_id){
      const snapshotUser = await firestore.collection('users').get(responsible_id);
      snapshotUser.forEach(doc => {
        if(doc.data().id === responsible_id){
          setResponsibleName(doc.data().name)
        }
      })
    }
  }, [])

  useEffect(() => {
    handleGetDoer()
    handleGetResponsible()
    if(done){
      handleGetDoneDate()
    }
  }, [handleGetDoer, handleGetResponsible, handleGetDoneDate])

  const handleCheck = useCallback(() => {
    if(status === false){
      setStatus(true)
      navigation.navigate("DoItem", {id: id, task: task, logged: logged})
    }else{
      setStatus(false)
    }
  }, [status])

  return(
    <Container {...rest} statusItem={statusItem}>
      {statusItem ? <></> : <Checkbox status={status} onPress={handleCheck}/>}
      <View style={{alignItems:"flex-start"}}>
        <Text>{task}</Text>
        <Frequency>{frequency === "daily" ? "Diariamente" : 
                    frequency === "weekly" ? "Semanalmente" : 
                    frequency === "monthly" ? "Mensalmente" : "" }{responsibleName && `, ${responsibleName}`}</Frequency>
      {doerName ? <Doer>Tarefa feita feita por {doerName}, {doneDate}</Doer> : <></>}
      </View>
    </Container>
  )
}

export default TaskBox;