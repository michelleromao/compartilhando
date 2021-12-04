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

export const ContainerFilter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 60px;
  margin-left: 8%;
  margin-right: 8%;
  margin-bottom: 32px;
`;

export const ContentFilter = styled.TouchableOpacity`
  border-color: ${props => props.theme.yellow};
  border-radius: 16px;
  border-width: 2px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? props.theme.lightYellow : props.theme.white};
  width: 60px;
  height: 60px;
  margin-right: 12px;
`;

export const Label = styled.Text`
  ${props => props.theme.text};
  color: ${props => props.theme.black};
  margin-bottom: 8px;
  align-self: flex-start;
  margin-left: 8%;
`;