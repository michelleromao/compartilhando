import React, { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import 'firebase/firestore'
import { firestore } from '../../services/firebase';

import { ScrollView, ActivityIndicator, View, RefreshControl } from 'react-native';
import { Container, 
      Title, 
      Header, 
      CreateNew, 
      Plus, 
      Content, TabBar,
      Collumn,
      Tab,
      CountText,
      Bold, 
      Color,
      ContainerFilter,
      ContentFilter} from './styles';
import TaskBox from '../../components/TaskBox';
import Category from '../../components/Categories';
import { FaxinaGeral, Faxinar, Lavar, Limpar, Lixo, Outros  } from '../../components/Icons';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Tasks = () => {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(1);
  const [toCheck, setToCheck] = useState(0);
  const [checked, setChecked] = useState(0);
  const [filter, setFilter] = useState('');
  const [tasks, setTasks] = useState([]);
  const [does, setDoes] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const handleFilter = useCallback((category) => {
    if(filter === ''){
      setFilter(category)
    }else if(filter === category){
      setFilter('')
    }else{
      setFilter(category)
    }
  }, [filter])

  const handleGetDoes = useCallback(async () => {
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
        if(doc.data().home_id === homeId){
          userList.forEach(user => {
            if(doc.data().creator_id === user.id){
              taskList.push({
                created_at: doc.data().created_at,
                creator_id: doc.data().creator_id,
                description: doc.data().description,
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
    let doesList = [];
    const snapshotDoes = await firestore.collection('does').get();
    snapshotDoes.forEach(doc => {
      if(doc.data().home_id === homeId){
        taskList.forEach(task => {
          if(doc.data().task_id === task.id){
            doesList.push({
              task: task.task,
              created_at: doc.data().created_at,
              doer_id: doc.data().doer_id,
              category: task.category
            })
          }
        })
      }
    })
    setChecked(doesList.length)
    setDoes(doesList);
  }, [])

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
        if(doc.data().home_id === homeId){
          userList.forEach(user => {
            if(doc.data().creator_id === user.id){
              taskList.push({
                created_at: doc.data().created_at,
                creator_id: doc.data().creator_id,
                description: doc.data().description,
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
    setTasks(taskList)
    setToCheck(taskList.length)
    setLoading(false)

  }, [])  

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(800).then(() => {setRefreshing(false); handleGetTasks(); handleGetDoes()});
  }, [handleGetTasks, handleGetDoes]);

  useEffect(() => {
    if(isFocused){
      handleGetTasks()
      handleGetDoes()
    }
  }, [isFocused, handleGetTasks, handleGetDoes])
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
            <Title>Tarefas</Title>
            <CreateNew onPress={() => navigation.navigate("CreateTask")}><Plus>+</Plus></CreateNew>
          </Header>

          <TabBar>
            <Collumn active={view === 1 ? true : false}>
            <Tab onPress={() =>  setView(1)} disabled={view === 1 ? true : false}>
            {view === 1 ? <CountText><Bold>{toCheck}</Bold> Para fazer</ CountText> : <></>}
              <Color active={view === 1 ? true : false} />
            </Tab>
            </Collumn>
            <Collumn active={view === 2 ? true : false}>
              <Tab onPress={() => setView(2)} disabled={view === 2 ? true : false}>
              {view === 2 ? <CountText><Bold>{checked}</Bold> Feito</ CountText> : <></>}
                <Color active={view === 2 ? true : false}  />
              </Tab>
            </Collumn>
          </TabBar>

          <ContainerFilter>
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} horizontal> 
            <ContentFilter onPress={() => handleFilter("faxinar")} active={filter === "faxinar" ? true : false}>
              <Faxinar width={27} height={44}/>
            </ContentFilter>
            <ContentFilter onPress={() => handleFilter('faxinarGeral')} active={filter === "faxinarGeral" ? true : false}>
              <FaxinaGeral width={41} height={44}/>
            </ContentFilter>
            <ContentFilter onPress={() => handleFilter('lavar')} active={filter === "lavar" ? true : false}>
              <Lavar width={45.71} height={43.26}/>
            </ContentFilter>
            <ContentFilter onPress={() => handleFilter('limpar')} active={filter === "limpar" ? true : false}>
              <Limpar width={33.65} height={43.26}/>
            </ContentFilter>
            <ContentFilter onPress={() => handleFilter('lixo')} active={filter === "lixo" ? true : false}>
              <Lixo width={38} height={43.26}/>
            </ContentFilter>
            <ContentFilter onPress={() => handleFilter('outro')} active={filter === "outro" ? true : false}>
              <Outros width={38} height={41}/>
            </ContentFilter>
          </ScrollView>
          </ContainerFilter>
          
          <ScrollView  
            style={{flex: 1, marginBottom: 30}}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressBackgroundColor="#f6f6f6"
                progressViewOffset={10}
                tintColor="#1D1843"
                colors={["#FFB729", "#1D1843"]}
              />
            }
            >
            <Content>
              {view === 1 
                ? 
                tasks ? 
                  tasks.map(task => 
                    {
                      if(filter === ''){
                        if (task.category === "limpar"){
                          return(
                            <View key={task.id}>
                              <View style={{width: '100%', marginBottom: 20}}>
                                <Category icon="clean" width={14} height={18}  />
                              </View>
                              <TaskBox 
                                key={task.id}
                                task={task.task} 
                                owner={task.creator_name} 
                                frequency={task.frequency}
                                disabled={task.owner ? false : true}
                                responsible_id={task.responsible_id }
                                onPress={() => navigation.navigate("EditRule", {id:task.id})}/>
                              </View>
                          )}else if(task.category === "faxinar"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="cleaning" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  owner={task.creator_name} 
                                  frequency={task.frequency}
                                  disabled={task.owner ? false : true}
                                  responsible_id={task.responsible_id }
                                  onPress={() => navigation.navigate("EditRule", {id:task.id})}/>
                                </View>
                          )}else if(task.category === "faxinarGeral"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="geral" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  owner={task.creator_name} 
                                  frequency={task.frequency}
                                  disabled={task.owner ? false : true}
                                  responsible_id={task.responsible_id }
                                  onPress={() => navigation.navigate("EditRule", {id:task.id})}/>
                                </View>
                          )}else if(task.category === "lavar"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="washing" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  owner={task.creator_name} 
                                  frequency={task.frequency}
                                  disabled={task.owner ? false : true}
                                  responsible_id={task.responsible_id }
                                  onPress={() => navigation.navigate("EditRule", {id:task.id})}/>
                                </View>
                          )}else if(task.category === "lixo"){
                              return(
                                <View key={task.id}>
                                  <View style={{width: '100%', marginBottom: 20}}>
                                    <Category icon="garbage" width={14} height={18}  />
                                  </View>
                                  <TaskBox 
                                    key={task.id}
                                    task={task.task} 
                                    owner={task.creator_name} 
                                    frequency={task.frequency}
                                    disabled={task.owner ? false : true}
                                    responsible_id={task.responsible_id }
                                    onPress={() => navigation.navigate("EditRule", {id:task.id})}/>
                                  </View>
                          )}else if(task.category === "outro"){
                                return(
                                  <View key={task.id}>
                                    <View style={{width: '100%', marginBottom: 20}}>
                                      <Category icon="other" width={14} height={18}  />
                                    </View>
                                    <TaskBox 
                                      key={task.id}
                                      task={task.task} 
                                      owner={task.creator_name} 
                                      frequency={task.frequency}
                                      disabled={task.owner ? false : true}
                                      responsible_id={task.responsible_id }
                                      onPress={() => navigation.navigate("EditRule", {id:task.id})}/>
                                    </View>
                          )}
                      }else{
                        if(filter === 'limpar'){
                          if (task.category === "limpar"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="clean" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  owner={task.creator_name} 
                                  frequency={task.frequency}
                                  disabled={task.owner ? false : true}
                                  responsible_id={task.responsible_id }
                                  onPress={() => navigation.navigate("EditRule", {id:task.id})}/>
                                </View>
                            )}
                        }else if(filter === 'faxinar'){
                          if (task.category === "faxinar"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="cleaning" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  owner={task.creator_name} 
                                  frequency={task.frequency}
                                  disabled={task.owner ? false : true}
                                  responsible_id={task.responsible_id }
                                  onPress={() => navigation.navigate("EditRule", {id:task.id})}/>
                                </View>
                            )}
                        }else if(filter === 'faxinarGeral'){
                          if (task.category === "faxinarGeral"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="geral" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  owner={task.creator_name} 
                                  frequency={task.frequency}
                                  disabled={task.owner ? false : true}
                                  responsible_id={task.responsible_id }
                                  onPress={() => navigation.navigate("EditRule", {id:task.id})}/>
                                </View>
                            )}
                        }else if(filter === 'lavar'){
                          if (task.category === "lavar"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="washing" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  owner={task.creator_name} 
                                  frequency={task.frequency}
                                  disabled={task.owner ? false : true}
                                  responsible_id={task.responsible_id }
                                  onPress={() => navigation.navigate("EditRule", {id:task.id})}/>
                                </View>
                            )}
                        }else if(filter === 'lixo'){
                          if (task.category === "lixo"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="garbage" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  owner={task.creator_name} 
                                  frequency={task.frequency}
                                  disabled={task.owner ? false : true}
                                  responsible_id={task.responsible_id }
                                  onPress={() => navigation.navigate("EditRule", {id:task.id})}/>
                                </View>
                            )}
                        }else if(filter === 'outro'){
                          if (task.category === "outro"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="other" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  owner={task.creator_name} 
                                  frequency={task.frequency}
                                  disabled={task.owner ? false : true}
                                  responsible_id={task.responsible_id }
                                  onPress={() => navigation.navigate("EditRule", {id:task.id})}/>
                                </View>
                            )}
                        }}
                    }) : 
                      <View>
                        <CountText>Não há tarefas para hoje! 😌</CountText>
                      </View>
                : 
                view === 2 ? 
                  does ? 
                    does.map(task => {
                      if(filter === ''){
                        if (task.category === "limpar"){
                          return(
                            <View key={task.id}>
                              <View style={{width: '100%', marginBottom: 20}}>
                                <Category icon="clean" width={14} height={18}  />
                              </View>
                              <TaskBox 
                                key={task.id}
                                task={task.task} 
                                doer_id={task.doer_id}
                                done={task.created_at}
                                disabled={true}
                                statusItem={true}
                                />
                              </View>
                          )}else if(task.category === "faxinar"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="cleaning" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  doer_id={task.doer_id}
                                  done={task.created_at}
                                  disabled={true}
                                  statusItem={true}/>
                                </View>
                          )}else if(task.category === "faxinarGeral"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="geral" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  doer_id={task.doer_id}
                                  done={task.created_at}
                                  disabled={true}
                                  statusItem={true}/>
                                </View>
                          )}else if(task.category === "lavar"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="washing" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  doer_id={task.doer_id}
                                  done={task.created_at}
                                  disabled={true}
                                  statusItem={true}/>
                                </View>
                          )}else if(task.category === "lixo"){
                              return(
                                <View key={task.id}>
                                  <View style={{width: '100%', marginBottom: 20}}>
                                    <Category icon="garbage" width={14} height={18}  />
                                  </View>
                                  <TaskBox 
                                    key={task.id}
                                    task={task.task} 
                                    doer_id={task.doer_id}
                                    done={task.created_at}
                                    disabled={true}
                                    statusItem={true}/>
                                  </View>
                          )}else if(task.category === "outro"){
                                return(
                                  <View key={task.id}>
                                    <View style={{width: '100%', marginBottom: 20}}>
                                      <Category icon="other" width={14} height={18}  />
                                    </View>
                                    <TaskBox 
                                      key={task.id}
                                      task={task.task} 
                                      doer_id={task.doer_id}
                                      done={task.created_at}
                                      disabled={true}
                                      statusItem={true}/>
                                    </View>
                          )}
                      }else{
                        if(filter === 'limpar'){
                          if (task.category === "limpar"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="clean" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                 key={task.id}
                                 task={task.task} 
                                 doer_id={task.doer_id}
                                 done={task.created_at}
                                 disabled={true}
                                 statusItem={true}/>
                                </View>
                            )}
                        }else if(filter === 'faxinar'){
                          if (task.category === "faxinar"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="cleaning" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  doer_id={task.doer_id}
                                  done={task.created_at}
                                  disabled={true}
                                  statusItem={true}/>
                                </View>
                            )}
                        }else if(filter === 'faxinarGeral'){
                          if (task.category === "faxinarGeral"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="geral" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  doer_id={task.doer_id}
                                  done={task.created_at}
                                  disabled={true}
                                  statusItem={true}/>
                                </View>
                            )}
                        }else if(filter === 'lavar'){
                          if (task.category === "lavar"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="washing" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  doer_id={task.doer_id}
                                  done={task.created_at}
                                  disabled={true}
                                  statusItem={true}/>
                                </View>
                            )}
                        }else if(filter === 'lixo'){
                          if (task.category === "lixo"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="garbage" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                 key={task.id}
                                 task={task.task} 
                                 doer_id={task.doer_id}
                                 done={task.created_at}
                                 disabled={true}
                                 statusItem={true}/>
                                </View>
                            )}
                        }else if(filter === 'outro'){
                          if (task.category === "outro"){
                            return(
                              <View key={task.id}>
                                <View style={{width: '100%', marginBottom: 20}}>
                                  <Category icon="other" width={14} height={18}  />
                                </View>
                                <TaskBox 
                                  key={task.id}
                                  task={task.task} 
                                  doer_id={task.doer_id}
                                  done={task.created_at}
                                  disabled={true}
                                  statusItem={true}/>
                                </View>
                            )}
                        }}
                    })
                  :
                    <></>
                : 
                  <View>
                    <CountText>Ainda não há tarefas feitas. 🧐</CountText>
                  </View>
                }
            </Content>
          </ScrollView>
        </Container>
      }
    </>
  );
}

export default Tasks;