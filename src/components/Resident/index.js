import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container,
         Name,
         Delete,
         Close,
         Divider } from './styles';
import { PhotoDefaultBlue } from '../Icons';

const Category = ({ id, name, owner }) => {
  const navigation = useNavigation();

  return(
    <>
      <Container>
        <PhotoDefaultBlue />
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Name>{name}</Name>
          { owner === true &&
            <Delete onPress={() => navigation.navigate("Remove", {id: id, type: 'resident'})}><Close>x</Close></Delete>}
        </View>
      </Container>
      <Divider />
    </>
  )
}

export default Category;