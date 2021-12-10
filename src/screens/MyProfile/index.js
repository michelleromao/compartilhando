import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../../routes/context';
import Button from '../../components/Button';
import ItemButton from '../../components/ItemButton';

const MyProfile = () => {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const [id, setId] = useState("");

  const handleGetId = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_uid');
    setId(response)
  }, [])

  useEffect(() =>{
    handleGetId();
  }, [handleGetId]);

  return(
    <View style={{width: "100%", paddingLeft: "8%", paddingRight: "8%", paddingBottom:"8%", flex: 1}}>
      <ItemButton title={"Informações pessoais"} onPress={() => navigation.navigate("Personal")} />
      <ItemButton title={"Excluir a conta"} onPress={() => navigation.navigate("Remove", {id: id, type: 'account'})} />
      <View style={{marginTop: "auto"}}>
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