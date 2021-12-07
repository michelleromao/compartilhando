import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  align-items: center;
`;

export const Name = styled.Text`
  ${props => props.theme.subtitle};
  color: ${props => props.theme.black};
  margin-left: 16px;
`; 

export const Delete = styled.TouchableOpacity`
width: 24px;
height: 24px;
border-radius: 8px;
background: ${props => props.theme.red};
justify-content: center;
align-items: center;
margin-left: 16px;
`;

export const Close = styled.Text`
${props => props.theme.title};
color: ${props => props.theme.blue};
margin-top: -15%;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background: ${props => props.theme.lightBlue};
`;