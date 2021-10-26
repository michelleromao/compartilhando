import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, ScrollView } from 'react-native';

import { Subtitle, Text } from './styles';
import Button from '../../components/Button';

const FirstAccess = () => {
  const navigation = useNavigation();

  
  return(
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"> 
      <View
        style={{
          flex:1,
          width: "100%",
          paddingLeft: "8%",
          paddingRight: "8%",
          alignItems: "flex-start",
        }}>
          <Text>Você ainda não está em nenhum lugar. Vamos mudar isso? ✨</Text>

          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 64
            }}
          >
            <Subtitle>Você pode criar um espaço</Subtitle>
            <Button 
              color="yellow"
              text="Criar"
              onPress={() => navigation.navigate('CreateSpace')}
            />
          </View>

          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 32
            }}
          >
            <Subtitle>ou</Subtitle>
          </View>

          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 32
            }}
          >
            <Subtitle>Entrar em um existente, através de um código.</Subtitle>
            <Button 
              color="yellow"
              text="Entrar"
              onPress={() => navigation.navigate('EnterSpace')}
            />
          </View>
      </View>
    </ScrollView>
  );
}

export default FirstAccess;