import styled from 'styled-components/native';

export const Name = styled.Text`
  ${props => props.theme.title};
  margin-top: 16px;
  color: ${props => props.theme.blue};
`;

export const ForgotPassword  = styled.Text`
 ${props => props.theme.subtitle};
  color: ${props => props.theme.blue};
`