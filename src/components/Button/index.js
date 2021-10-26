import React from 'react';
import {Container, Text} from './styles';

function Button({ color, text, size,...rest }) {
  return(
    <Container color={color} size={size} {...rest}>
      <Text size={size}>{text}</Text>
    </Container>
  )
}

export default Button;