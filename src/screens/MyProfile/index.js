import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import 'firebase/firestore'
import { firestore } from '../../services/firebase';

import { AuthContext } from '../../routes/context';
import Button from '../../components/Button';
import ItemButton from '../../components/ItemButton';

import { ItemText, Divider, Title } from './styles';

const MyProfile = () => {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const [id, setId] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = useCallback(async () => {
    if (isEnabled === false) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      const userUid = await AsyncStorage.getItem('@storage_uid');
      const docRef = firestore.collection('users').doc(userUid);

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        alert(status);
      }

      if (finalStatus !== 'granted') {
        alert("Enable Notifications");
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setIsEnabled(true)
      await docRef.update({
        expoToken: token
      });
    } else {
      setIsEnabled(false)
      await docRef.update({
        expoToken: ""
      });
    }
  }, [isEnabled]);

  const handleGetId = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_uid');
    setId(response)
  }, [])

  const handleGetToken = useCallback(async () => {
    const userUid = await AsyncStorage.getItem('@storage_uid');
    const docRef = await firestore.collection('users').get();
    docRef.forEach(doc => {
      if (doc.data().id === userUid) {
        if (doc.data().expoToken === "" || doc.data().expoToken === undefined) {
          console.log(doc.data().expoToken)
          setIsEnabled(false)
          return;
        }
        setIsEnabled(true)
      }
    })
  }, [])

  useEffect(() => {
    handleGetId();
    handleGetToken();
  }, [handleGetId, handleGetToken]);

  return (
    <View style={{ width: "100%", paddingLeft: "8%", paddingRight: "8%", paddingBottom: "8%", flex: 1 }}>
      <ItemText>
        <View style={{ width: "100%", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
          <Title>Notificações</Title>
          <Switch
            trackColor={{ false: "#767577", true: "#1D1843" }}
            thumbColor={isEnabled ? "#FFB729" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Divider />
      </ItemText>
      <ItemButton title={"Informações pessoais"} onPress={() => navigation.navigate("Personal")} />
      <ItemButton title={"Excluir a conta"} onPress={() => navigation.navigate("Remove", { id: id, type: 'account' })} />
      <View style={{ marginTop: "auto" }}>
        <Button
          color="yellow"
          text="Sair"
          onPress={() => signOut()}
        />
      </View>
    </View>
  );
}

export default MyProfile;