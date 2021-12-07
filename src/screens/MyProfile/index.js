import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../../routes/context';
import Button from '../../components/Button';

const MyProfile = () => {
  const { signOut } = useContext(AuthContext);

  return(
    <View style={{width: "100%", paddingLeft: "8%", paddingRight: "8%", paddingBottom:"8%", flex: 1, justifyContent: "flex-end"}}>
      <Button 
        color="yellow"
        text="Sair"
        onPress={() => signOut()}
      />
    </View>
  );
}

export default MyProfile;