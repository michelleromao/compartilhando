import React, { useState, useCallback, useEffect, useContext, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Form } from '@unform/mobile';

import { Name } from './styles';
import { Logo } from '../../components/Icons/index';
import { AuthContext } from '../../routes/context';
import Input from '../../components/Input';

const Login = () => {
  const formRef = useRef(null);
  const { signIn } = useContext(AuthContext);

  function handleSubmit(data) {
    console.log(data);
    // { email: 'test@example.com', password: '123456' }
    //signIn();
  }

  return(
    <View
      style={{
        flex:1,
        width: "100%",
        paddingTop: "35%",
        alignItems: "center",
      }}>
        <View style={{marginBottom: 48, alignItems: "center"}}>
          <Logo />
          <Name>Compartilhando</Name>
        </View>
      <Form ref={formRef} onSubmit={handleSubmit} style={{width: "90%", alignItems: "center"}}>
        <Input name="email" type="email" label="E-mail"/>
        <Input name="password" type="password" label="Senha" password={true}/>
          
        <TouchableOpacity
          style={{ alignItems: "center",
          backgroundColor: "#DDDDDD",
          padding: 10}}
          onPress={() => formRef.current.submitForm()}
        >
          <Text>Press Here</Text>
        </TouchableOpacity>
      </Form>
      
    </View>
  );
}

export default Login;