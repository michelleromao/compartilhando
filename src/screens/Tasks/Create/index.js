import React, { useState, useCallback, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import 'firebase/firestore'

import { View, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Form } from '@unform/mobile';

import { firestore } from '../../../services/firebase';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import { FaxinaGeral, Faxinar, Lavar, Limpar, Lixo, Outros  } from '../../../components/Icons';
import { ContainerFilter, ContentFilter, Label, LabelFilter } from './styles';


const CreateTask = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [residents, setResidents] = useState([]);
  const [selected, setSelected] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [category, setCategory] = useState("");
  const navigation = useNavigation();
  
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

  const handleSubmit = useCallback(async (data) => {
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
        if(data.dayOfMonth < 0 || data.dayOfMonth > 31 ){
          Alert.alert(
            'Dia inválido',
            'O seu dia do mês precisa ser um dia válido',
            [{ text: 'OK' }],
            { cancelable: false },
          );
        }else{
          setLoading(true)
          const homeId = await AsyncStorage.getItem('@storage_homeid');
          const userUid = await AsyncStorage.getItem('@storage_uid');
          const docRef = firestore.collection('tasks').doc();
          await docRef.set({
            category: category,
            created_at: Date.now().toLocaleString(),
            creator_id: userUid,
            day_of_month: data.dayOfMonth ?? "",
            day_of_week: data.dayOfWeek ?? "",
            frequency: data.frequency,
            home_id: homeId,
            id: docRef.id,
            responsible_id: data.responsible ?? "",
            task: data.name,
            active: true
          });
          navigation.goBack();
        }
      }
    }
  }, [category])

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

  const selectCategory = useCallback((item) => {
    if(item === ''){
      setCategory(item)
    }else if(category === item){
      setCategory('')
    }else{
      setCategory(item)
    }
  }, [category])

  const callback = useCallback((frequency) => {
    setSelected(frequency);
  }, []);

  const callback2 = useCallback((resident) => {
    setSelectedUser(resident);
  }, []);

  const callback3 = useCallback((day) => {
    setSelectedDay(day);
  }, []);

  useEffect(() => {
    loadResidents()
  }, [loadResidents])

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
            <ContainerFilter active={category !== "" ? true : false}>
              <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} horizontal> 
                <View>
                  <ContentFilter onPress={() => selectCategory("faxinar")} active={category === "faxinar" ? true : false}>
                    <Faxinar width={27} height={44}/>
                  </ContentFilter>
                  <LabelFilter active={category === "faxinar" ? true : false}>Faxinar</LabelFilter>
                </View>
                <View>
                  <ContentFilter onPress={() => selectCategory('faxinarGeral')} active={category === "faxinarGeral" ? true : false}>
                    <FaxinaGeral width={41} height={44}/>
                  </ContentFilter>
                  <LabelFilter active={category === "faxinarGeral" ? true : false}>Faxina Geral</LabelFilter>
                </View>
                <View>
                  <ContentFilter onPress={() => selectCategory('lavar')} active={category === "lavar" ? true : false}>
                    <Lavar width={45.71} height={43.26}/>
                  </ContentFilter>
                  <LabelFilter active={category === "lavar" ? true : false}>Lavar</LabelFilter>
                </View>
                <View>
                  <ContentFilter onPress={() => selectCategory('limpar')} active={category === "limpar" ? true : false}>
                    <Limpar width={33.65} height={43.26}/>
                  </ContentFilter>
                  <LabelFilter active={category === "limpar" ? true : false}>Limpar</LabelFilter>
                </View>
                <View>
                  <ContentFilter onPress={() => selectCategory('lixo')} active={category === "lixo" ? true : false}>
                    <Lixo width={38} height={43.26}/>
                  </ContentFilter>
                  <LabelFilter active={category === "lixo" ? true : false}>Lixo</LabelFilter>
                </View>
                <View>
                  <ContentFilter onPress={() => selectCategory('outro')} active={category === "outro" ? true : false}>
                    <Outros width={38} height={41}/>
                  </ContentFilter>
                  <LabelFilter active={category === "outro" ? true : false}>Outro</LabelFilter>
                </View>
              </ScrollView>
            </ContainerFilter>
            <Form ref={formRef} onSubmit={handleSubmit} style={{width: "100%", alignItems: "center", justifyContent: "space-around", height: "100%"}}>
            <ScrollView
              contentContainerStyle={{ flex: 1 }}
            >
                <View style={{width: "100%"}}>
                  <Input name="name" type="text" label="Dê um nome a tarefa:"/>
                  <Select name="responsible" label="Selecione um responsável, caso tenha:" items={residents} parentCallback={callback2}/>
                  <Select name="frequency" label="Selecione uma frequência, caso tenha:" items={frequency} parentCallback={callback}/>
                  {selected === "weekly" ? 
                    <Select name="dayOfWeek" label="Escolha o dia da semana irá se repetir:" items={daysOfWeek} parentCallback={callback3}/>
                  : selected === "monthly" ?
                    <Input name="dayOfMonth" type="number"  keyboardType="number-pad" label="Escolha o dia do mês que irá se repetir:" />
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

export default CreateTask;