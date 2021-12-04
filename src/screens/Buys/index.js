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
        Content, 
        TabBar,
        Collumn,
        Tab,
        CountText,
        Bold, 
        Color} from './styles';
import ButtonBox from '../../components/ButtonBox';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const Buys = () => {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(1);
  const [toCheck, setToCheck] = useState(0);
  const [checked, setChecked] = useState(0);
  const [buys, setBuys] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [useruid, setUseruid] = useState();
  const handleGetBuys = useCallback(async () => {
    setLoading(true);
    const homeId = await AsyncStorage.getItem('@storage_homeid');
    const userUid = await AsyncStorage.getItem('@storage_uid');
    setUseruid(userUid);
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

    let buyList = [];

    let countToCheck = 0;
    let countChecked = 0;

    const snapshot = await firestore.collection('purchase_item').get();
    snapshot.forEach(doc => {
        if(doc.data().home_id === homeId){
          userList.forEach(user => {
            if(doc.data().creator_id === user.id){
              if(doc.data().status === true){
                countChecked += 1;
              }else{
                countToCheck+= 1;
              }
              buyList.push({
                id: doc.data().id,
                created_at: doc.data().created_at,
                creator_id: doc.data().creator_id,
                item: doc.data().item,
                status: doc.data().status,
                creator_name: user.name,
                buyer_id: doc.data().buyer_id,
                owner: doc.data().creator_id === userUid ? true : false
              })
            }
          })
        }
    })
    
    setToCheck(countToCheck)
    setChecked(countChecked)
    setBuys(buyList)
    setLoading(false)
  }, [])  

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(800).then(() => {setRefreshing(false); handleGetBuys()});
  }, [handleGetBuys]);

  useEffect(() => {
    if(isFocused){
      handleGetBuys()
    }
  }, [isFocused, handleGetBuys])

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
            <Title>Compras</Title>
            <CreateNew onPress={() => navigation.navigate("CreateBuy")}><Plus>+</Plus></CreateNew>
          </Header>

          <TabBar>
            <Collumn active={view === 1 ? true : false}>
            <Tab onPress={() =>  setView(1)} disabled={view === 1 ? true : false}>
            {view === 1 ? <CountText><Bold>{toCheck}</Bold> Para comprar</ CountText> : <></>}
              <Color active={view === 1 ? true : false} />
            </Tab>
            </Collumn>
            <Collumn active={view === 2 ? true : false}>
              <Tab onPress={() => setView(2)} disabled={view === 2 ? true : false}>
              {view === 2 ? <CountText><Bold>{checked}</Bold> Comprados</ CountText> : <></>}
                <Color active={view === 2 ? true : false}  />
              </Tab>
            </Collumn>
          </TabBar>

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
              
              {buys &&
                view === 1 ?
                  buys.map(buy => (
                    buy.status ? <></> :
                      <ButtonBox 
                        key={`${buy.id}${buy.creator_name}`}
                        id={buy.id}
                        item={buy.item} 
                        owner={buy.creator_name} 
                        logged={useruid}
                        disabled={buy.owner ? false : true}
                        statusItem={buy.status}
                        onPress={() => navigation.navigate("EditBuy", {id:buy.id})}/>))
                : view === 2 ?
                    buys.map(buy => (
                      buy.status ? 
                        <ButtonBox 
                          key={buy.id}
                          id={buy.id}
                          item={buy.item} 
                          owner={buy.creator_name} 
                          logged={useruid}
                          disabled={true}
                          statusItem={buy.status}
                          buyer_id={buy.buyer_id}
                          onPress={() => navigation.navigate("EditBuy", {id:buy.id})}/> 
                    : <></>))
              : <></>}
            </Content>
          </ScrollView>
        </Container>
      }
    </>
  );
}

export default Buys;