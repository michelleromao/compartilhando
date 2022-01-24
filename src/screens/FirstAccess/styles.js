import styled from 'styled-components/native';

export const Subtitle = styled.Text`
  ${props => props.theme.subtitle};
  color: ${props => props.theme.black};
  margin-bottom: 16px;
`;

export const Text  = styled.Text`
 ${props => props.theme.text};
  color: ${props => props.theme.black};
`