import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ItemButton from '../../../components/ItemButton';

const Authentication = () => {
  const navigation = useNavigation();

  return(
    <View style={{width: "100%", paddingLeft: "8%", paddingRight: "8%", paddingBottom:"8%", flex: 1}}>
      <ItemButton title={"Alterar e-mail"} onPress={() => navigation.navigate("EditEmail")} />
      <ItemButton title={"Alterar senha"} onPress={() => navigation.navigate("Personal")} />
    </View>
  );
}

export default Authentication;