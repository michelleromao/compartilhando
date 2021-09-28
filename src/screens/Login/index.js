import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Logo } from '../../components/Icons/index';
import { AuthContext } from '../../routes/context';
const Login = () => {

  const { signIn } = useContext(AuthContext);

  return(
    <View
      style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Logo />
      <TouchableOpacity
        style={{ alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10}}
        onPress={() => {
          signIn();
        }}
      >
        <Text>Press Here</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;