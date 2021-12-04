import React, { useState, useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import 'firebase/firestore'

import { View, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Form } from '@unform/mobile';

import { firestore } from '../../../services/firebase';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Select from '../../../components/Select';

import { FaxinaGeral, Faxinar, Lavar, Limpar, Lixo, Outros  } from '../../../components/Icons';
import {Delete, Close, ContainerFilter, ContentFilter, Label} from "./styles.js"


const EditTask = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const routes = useRoute();
  const [task, setTask] = useState({});
  const [category, setCategory] = useState("");
  const [residents, setResidents] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});
  const [responsible, setResponsible] = useState("");
  const [frequencySelected, setFrequencySelected] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [name, setName] = useState("");


  let frequency = [
    {value: "daily", label: "Diária" },
    {value: "weekly", label: "Semanal" },
    {value: "monthly", label: "Mensal" },
  ]
  let daysOfWeek = [
    {value: "monday", label: "Segunda" },
    {value: "tuesday", label: "Terça" },
    {value: "wednesday", label: "Quarta" },
    {value: "thursday", label: "Quinta" },
    {value: "friday", label: "Sexta" },
    {value: "saturday", label: "Sábado" },
    {value: "sunday", label: "Domingo" },
  ]

 const [selectedUser, setSelectedUser] = useState("");
  const callback2 = useCallback((resident) => {
    setSelectedUser(resident);
  }, []);
  const [selected, setSelected] = useState("");
  const callback = useCallback((frequency) => {
    setSelected(frequency);
  }, []);
  const [selectedDay, setSelectedDay] = useState("");
  const callback3 = useCallback((day) => {
    setSelectedDay(day);
  }, []);
 
  const handleGetDetails = useCallback(async () => {
    setLoading(true)
    const taskRef = await firestore.collection("tasks").get(routes.params.id);
    const userUid = await AsyncStorage.getItem('@storage_uid');
    taskRef.forEach(doc => {
      if(doc.data().creator_id === userUid && doc.data().id === routes.params.id){
        setTask({
          category: doc.data().category,
          creator_id: userUid,
          day_of_month: doc.data().day_of_month,
          day_of_week: doc.data().day_of_week,
          frequency: doc.data().frequency,
          home_id: doc.data().home_id,
          id: doc.data().id,
          responsible_id: doc.data().responsible_id,
          task: doc.data().task,
        })
        setCategory(doc.data().category)
        setResponsible(doc.data().responsible_id)
        setFrequencySelected(doc.data().frequency)
        setDayOfWeek(doc.data().day_of_week)
        setSelected(doc.data().frequency)
        setName(doc.data().task)
      }
    })
    setLoading(false)
  },[routes])
  const handleSubmit = useCallback(async (data) => {
    console.log(data)
    if(category === "" || category === undefined){
      Alert.alert(
        'Campo vazio',
        'A sua tarefa precisa de uma categoria',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }else if(data.name === "" || data.name === undefined) {
      Alert.alert(
        'Campo vazio',
        'A sua tarefa precisa ter um nome',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }else if(data.frequency === "" || data.frequency === undefined){
      Alert.alert(
        'Campo vazio',
        'A sua tarefa precisa ter uma frequência',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }else{
      if(data.frequency === 'weekly' && data.dayOfWeek === "" && data.dayOfWeek === undefined){
        Alert.alert(
          'Campo vazio',
          'A sua frequência precisa ter um dia da semana',
          [{ text: 'OK' }],
          { cancelable: false },
        );
      }else if(data.frequency === 'monthly' && data.dayOfMonth === "" && data.dayOfMonth === undefined){
        Alert.alert(
          'Campo vazio',
          'A sua frequência precisa ter um dia do mês',
          [{ text: 'OK' }],
          { cancelable: false },
        );
      }else{
        setLoading(true)
        const homeId = await AsyncStorage.getItem('@storage_homeid');
        const userUid = await AsyncStorage.getItem('@storage_uid');
        const docRef = firestore.collection('tasks').doc(routes.params.id);
        await docRef.set({
          category: category,
          created_at: Date.now().toLocaleString(),
          creator_id: userUid,
          day_of_month: data.dayOfMonth ?? "",
          day_of_week: data.dayOfWeek ?? "",
          frequency: data.frequency,
          home_id: homeId,
          id: routes.params.id,
          responsible_id: data.responsible ?? "",
          task: data.name,
        });
        navigation.goBack();
      }
    }
  }, [routes, navigation, category])

  const loadResidents = useCallback(async () => {
    setLoading(true)
    const homeId = await AsyncStorage.getItem('@storage_homeid');
    const snapshotResidents = await firestore.collection('users').get();
    let residentList = [];
    snapshotResidents.forEach(doc => {
      if(doc.data().home_id === homeId){
        residentList.push({
          value: doc.data().id,
          label: doc.data().name
        })
      }
    })
    setResidents(residentList)
    setLoading(false)
  }, [])


  useEffect(() => {
    handleGetDetails()
    loadResidents()
  },[handleGetDetails, loadResidents]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Delete onPress={() => navigation.navigate("Remove", {id: routes.params.id, type: 'task'})}><Close>x</Close></Delete>
      ),
    });
  }, [navigation,routes]);

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
              alignItems: "center",
            }}>
              <Label>Escolha uma categoria para a tarefa:</Label>
              <ContainerFilter>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} horizontal> 
                  <ContentFilter onPress={() => selectCategory("faxinar")} active={category === "faxinar" ? true : false}>
                    <Faxinar width={27} height={44}/>
                  </ContentFilter>
                  <ContentFilter onPress={() => selectCategory('faxinarGeral')} active={category === "faxinarGeral" ? true : false}>
                    <FaxinaGeral width={41} height={44}/>
                  </ContentFilter>
                  <ContentFilter onPress={() => selectCategory('lavar')} active={category === "lavar" ? true : false}>
                    <Lavar width={45.71} height={43.26}/>
                  </ContentFilter>
                  <ContentFilter onPress={() => selectCategory('limpar')} active={category === "limpar" ? true : false}>
                    <Limpar width={33.65} height={43.26}/>
                  </ContentFilter>
                  <ContentFilter onPress={() => selectCategory('lixo')} active={category === "lixo" ? true : false}>
                    <Lixo width={38} height={43.26}/>
                  </ContentFilter>
                  <ContentFilter onPress={() => selectCategory('outro')} active={category === "outro" ? true : false}>
                    <Outros width={38} height={41}/>
                  </ContentFilter>
                </ScrollView>
              </ContainerFilter>


            <Form ref={formRef} onSubmit={handleSubmit} style={{width: "100%", alignItems: "center", justifyContent: "space-around", height: "100%"}}>
            <ScrollView
              contentContainerStyle={{ flex: 1 }}
            >
                <View style={{width: "100%"}}>
                  <Input name="name" type="text" label="Dê um nome a tarefa:" defaultValue={name}/>
                  <Select name="responsible" label="Selecione um responsável, caso tenha:" items={residents} parentCallback={callback2} valueDefault={responsible}/>
                  <Select name="frequency" label="Selecione uma frequência, caso tenha:" items={frequency} parentCallback={callback} valueDefault={frequencySelected}/>
                  {selected === "weekly" ? 
                    <Select name="dayOfWeek" label="Escolha o dia da semana irá se repetir:" items={daysOfWeek} parentCallback={callback3} valueDefault={dayOfWeek}/>
                  : selected === "monthly" ?
                    <Input name="dayOfMonth" type="number"  keyboardType="number-pad" label="Escolha o dia do mês que irá se repetir:" defaultValue={task.day_of_month}/>
                  : <></>}
                </View>
              </ScrollView>
              <View style={{width: "100%", height: "30%", paddingLeft: "8%", paddingRight: "8%"}}>
                <Button 
                  color="yellow"
                  text="Pronto"
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

export default EditTask;