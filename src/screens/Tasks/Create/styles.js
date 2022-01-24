import styled from 'styled-components/native';

export const ContainerFilter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 95px;
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

export const LabelFilter = styled.Text`
  ${props => props.theme.subtitle};
  color: ${props => props.theme.black};
  width: 65px;
  text-align: center;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  font-size: 12px;
`;