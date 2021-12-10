import React from 'react';
import { Title, Divider, Container } from './styles';

const ItemButton = ({title, ...rest}) => {

  return(
      <Container {...rest}>
        <Title>{title}</Title>
        <Divider/>
      </Container>
  );
}

export default ItemButton;