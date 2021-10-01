import React, { useRef, useEffect, useCallback, useState } from 'react';
import {Container, Text} from './styles';

function Button({ color, text, action,...rest }) {
  return(
    <Container color={color} {...rest}>
      <Text>{text}</Text>
    </Container>
  )
}

export default Button;