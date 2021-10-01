import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { Container, Title } from './styles';
import { AuthContext } from '../../routes/context';

import Button from '../../components/Button';

const Home = () => {
  const { signOut } = useContext(AuthContext);

  return(
    <Container>
      <Title>oiiiiiii</Title>

      <Button 
          color="yellow"
          text="sair"
          onPress={() => signOut()}
        />
    </Container>
  );
}

export default Home;