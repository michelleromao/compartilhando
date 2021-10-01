import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${props => 
                      props.color === "yellow" ? props.theme.yellow :
                      props.color === "blue" ? props.theme.white :
                      props.color === "green" ? props.theme.green :
                      props.color === "red" ? props.theme.red :
                      props.color === "orange" ? props.theme.orange : 
                      props.theme.yellow};
  ${props => props.color === "blue" &&
            `border-width: 2px; 
             border-color: ${props.theme.blue};`
             };
  border-radius: 15px;
  height: 60px;
`;

export const Text = styled.Text`
  color: ${props =>  props.theme.blue};
  ${props => props.theme.title};
`;
