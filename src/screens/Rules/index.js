import React, { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import 'firebase/firestore'
import { firestore } from '../../services/firebase';

import { ScrollView, ActivityIndicator, View, RefreshControl } from 'react-native';
import { Container, Title, Header, CreateNew, Plus, Content} from './styles';
import TextBox from '../../components/TextBox';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const Rules = () => {
  const [loading, setLoading] = useState(false);
  const [rules, setRules] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const handleGetRules = useCallback(async () => {
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

    let ruleList = [];
    const snapshot = await firestore.collection('rules').get();
    snapshot.forEach(doc => {
        if(doc.data().home_id === homeId){
          userList.forEach(user => {
            if(doc.data().creator_id === user.id){
              ruleList.push({
                created_at: doc.data().created_at,
                creator_id: doc.data().creator_id,
                description: doc.data().description,
                id: doc.data().id,
                creator_name: user.name,
                owner: doc.data().creator_id === userUid ? true : false

              })
            }
          })
        }
    })

    setRules(ruleList)
    setLoading(false)

  }, [])  

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(800).then(() => {setRefreshing(false); handleGetRules()});
  }, [handleGetRules]);

  useEffect(() => {
    if(isFocused){
      handleGetRules()
    }
  }, [isFocused, handleGetRules])

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
            <Title>Regras</Title>
            <CreateNew onPress={() => navigation.navigate("CreateRule")}><Plus>+</Plus></CreateNew>
          </Header>
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
              {rules ? rules.map(rule => (
                <TextBox 
                  key={rule.id}
                  text={rule.description} 
                  owner={rule.creator_name} 
                  disabled={rule.owner ? false : true}
                  onPress={() => navigation.navigate("EditRule", {id:rule.id})}/>
              )) : <></>}
            </Content>
          </ScrollView>
        </Container>
      }
    </>
  );
}

export default Rules;