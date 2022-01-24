import React, { useState, useCallback, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'firebase/firestore'
import { firestore } from '../../services/firebase';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { startOfToday, format, startOfDay, isEqual } from 'date-fns'

import { View, ActivityIndicator, ScrollView } from 'react-native';
import { Container, Title, Header, UserProfile, HomeContainer, Name, Information} from './styles';
import { AuthContext } from '../../routes/context';

import { Logo, PhotoDefaultBlue } from '../../components/Icons';
import TaskBox from '../../components/TaskBox';

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [userUid, setUserUid] = useState();
  const [loading, setLoading] = useState(false);
  const [nameHome, setNameHome] = useState("");
  const [residents, setResidents] = useState(0);
  const [tasks, setTasks] = useState([]);

  const handleCheckFirstAcess = useCallback(async () => {
    setLoading(true);
    const response = await AsyncStorage.getItem('@storage_uid');
    setUserUid(response);
    const snapshot = await firestore.collection('users').get();
    let home_id = "";
    let cont = 0;
    snapshot.forEach(doc => {
      if(doc.data().id === userUid){
        if(doc.data().home_id === "" || doc.data().home_id === undefined){
          setLoading(false);
          navigation.navigate("FirstAccess")
        }else{
          setLoading(false);
          AsyncStorage.setItem('@storage_homeid', doc.data().home_id);
          home_id = doc.data().home_id
        }
      }
    })
    snapshot.forEach(doc => {
      if(doc.data().home_id === home_id){
        cont += 1;
      }
    })
    const snapshotHome = await firestore.collection('homes').get();
    snapshotHome.forEach(doc => {
      if(doc.data().id === home_id){
        setNameHome(doc.data().name)
      }
    })
    setResidents(cont)
  }, [userUid, navigation]);

  const handleGetTasks = useCallback(async () => {
    setLoading(true);
    const homeId = await AsyncStorage.getItem('@storage_homeid');
    const userUid = await AsyncStorage.getItem('@storage_uid');
    
    let userList = [];
    const snapshotUser = await firestore.collection('users').get();
    snapshotUser.forEach(doc => {
      if(doc.data().home_id === homeId){
        userList.push({
          id: doc.data().id,
          name: doc.data().name
        })
      }
    })

    let taskList = [];
    const snapshot = await firestore.collection('tasks').get();
    snapshot.forEach(doc => {
        if((doc.data().home_id === homeId) && (doc.data().active === true)){
          userList.forEach(user => {
            if(doc.data().creator_id === user.id){
              taskList.push({
                created_at: doc.data().created_at,
                creator_id: doc.data().creator_id,
                id: doc.data().id,
                creator_name: user.name,
                owner: doc.data().creator_id === userUid ? true : false,
                category: doc.data().category,
                day_of_month: doc.data().day_of_month,
                day_of_week: doc.data().day_of_week,
                frequency: doc.data().frequency,
                responsible_id: doc.data().responsible_id,
                task: doc.data().task
              })
            }
          })
        }
    })

    var dayOfToday = format(startOfToday(), "dd");
    var dayOfWeekToday = format(startOfToday(), "cccc").toLowerCase();

    let doesList = [];
    const snapshotDoes = await firestore.collection('does').get();
    snapshotDoes.forEach(doc => {
        if(doc.data().home_id === homeId){
          doesList.push({
            created_at: doc.data().created_at,
            doer_id: doc.data().doer_id,
            home_id: doc.data().home_id,
            task_id: doc.data().task_id,
          })
        }
    })

    let newTaskList = [];
    taskList.map((task) => {
      if(Number(task.day_of_month) == Number(dayOfToday) 
          || task.day_of_week ===  dayOfWeekToday 
          || task.frequency === 'daily'){
        newTaskList.push(task)
      }
    })
    
    if(doesList.length > 0){
      for(let y=0; y<doesList.length; y++){
        newTaskList.forEach((task, i) => {
          doesList.forEach(does => {
            if(task.id === does.task_id){
              let startOfDoes = startOfDay(new Date(Number(does.created_at)))
              let startOfToday = startOfDay(new Date())
              if(isEqual(startOfDoes, startOfToday)){
                newTaskList.splice(i, 1)
              }
            }
          })}
        )
      }
    }
    setTasks(newTaskList)
    setLoading(false)
  }, [])  

  useEffect(() => {
    if(isFocused){
      handleCheckFirstAcess();
      handleGetTasks();
    }
  }, [isFocused, handleCheckFirstAcess, handleGetTasks])


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
          <Header>
            <Title>Boas vindas!</Title>
            <UserProfile onPress={() => navigation.navigate("MyProfile")}>
              <PhotoDefaultBlue />
            </UserProfile>
          </Header>
          <HomeContainer onPress={() => navigation.navigate("Space")}>
            <View>
              <Logo height={"41"} width={"41"}/>
            </View>
            <View style={{marginLeft: 16}}>
              <Name>
                {nameHome}
                <Entypo name="chevron-right" size={18} color="#1D1843" />
              </Name>
              <Information>{residents} pessoa(s) mora(m) aqui</Information>
            </View>
          </HomeContainer>
          
          {tasks && tasks.length > 0 ?
          <ScrollView showsVerticalScrollIndicator={false}> 
            <View style={{width: "100%", marginTop: 44}}>
              <View style={{marginBottom: 16}}>
                <Name>Você tem atividades para hoje 😌</Name>
              </View>
              {tasks.map(task => {
                return(
                  <TaskBox 
                    key={task.id}
                    id={task.id}
                    task={task.task} 
                    owner={task.creator_name} 
                    frequency={task.frequency}
                    disabled={true}
                    responsible_id={task.responsible_id }
                    onPress={() => {}}/>
                )
              })}
            </View>
            </ScrollView>
            :
            <View style={{width: "100%", marginTop: 44}}>
              <View style={{marginBottom: 16}}>
                <Name>Tudo calmo por aqui 😌</Name>
              </View>
            </View>
          } 
        </Container>
      }
    </>
  );
}

export default Home;

