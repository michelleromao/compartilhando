import styled from 'styled-components/native';

export const Tip  = styled.Text`
 ${props => props.theme.subtitle};
  color: ${props => props.theme.blue};
  margin-top: -12%;
`