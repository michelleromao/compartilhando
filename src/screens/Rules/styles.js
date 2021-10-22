import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${props => props.theme.white};
  flex: 1;
  padding-top: 64px;
  padding-right: 8%;
  padding-left: 8%;
`; 

export const Header = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`; 

export const CreateNew = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: ${props => props.theme.yellow};
  justify-content: center;
  align-items: center;
`;

export const Plus = styled.Text`
  ${props => props.theme.title};
  color: ${props => props.theme.blue};
  margin-top: -10%;
`;

export const Title = styled.Text`
  ${props => props.theme.title};
  color: ${props => props.theme.blue};

`;

export const Content = styled.View`
  margin-top: 42px;
  width: 100%;
`; 
