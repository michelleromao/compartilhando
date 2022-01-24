import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  background-color: ${props => props.theme.white};
  ${props => `border-width: 2px; 
             border-color: ${props.theme.yellow};`
             };
  border-radius: 20px;
  padding-top: 24px;
  padding-bottom: 24px;
  padding-right: 20px;
  padding-left: 20px;
  margin-bottom: 16px;

`;

export const Text = styled.Text`
  color: ${props =>  props.theme.black};
  ${props => props.theme.text};
`;
