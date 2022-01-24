import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  justify-content: flex-start;
  align-items: ${props => props.statusItem === true ? 'flex-start' : 'center'};
  flex-direction: ${props => props.statusItem === true ? 'column' : 'row'};
  background-color: ${props => props.theme.white};
  ${props => `border-width: 2px; 
             border-color: ${props.statusItem === true ? props.theme.green : props.theme.yellow};`
             };
  border-radius: 20px;
  padding-top: 24px;
  padding-bottom: 24px;
  padding-right: 20px;
  padding-left: 20px;
  margin-bottom: 16px;
`;

export const Checkbox = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  margin-right: 20px;
  background-color: ${props => props.status ? props.theme.blue : props.theme.white};
  ${props => `border-width: 2px; 
             border-color: ${props.theme.yellow};`
             };
`;


export const Text = styled.Text`
  color: ${props =>  props.theme.black};
  ${props => props.theme.text};
`;

export const Buyer = styled.Text`
color: ${props =>  props.theme.black};
${props => props.theme.subtitle};
`;