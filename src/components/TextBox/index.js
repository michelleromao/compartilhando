import React from 'react';
import { View } from 'react-native'
import {Container, Text} from './styles';

function TextBox({ text, owner,...rest }) {
  return(
    <Container {...rest}>
      <Text>{text}</Text>
      <View
        style={{width:'100%', alignItems: "flex-end", marginTop: '4%'}}>
        <Text>- {owner}</Text>
      </View>
    </Container>
  )
}

export default TextBox;