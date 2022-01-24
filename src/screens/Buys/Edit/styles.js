import styled from 'styled-components/native';

export const Delete = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: ${props => props.theme.red};
  justify-content: center;
  align-items: center;
  margin-right: 15%;
`;

export const Close = styled.Text`
  ${props => props.theme.title};
  color: ${props => props.theme.blue};
  margin-top: -10%;
`;