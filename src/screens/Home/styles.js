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

export const UserProfile = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Title = styled.Text`
  ${props => props.theme.title};
  color: ${props => props.theme.blue};

`;

export const HomeContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  margin-top: 44px;
`;

export const Name = styled.Text`
  ${props => props.theme.text};
  color: ${props => props.theme.black};

`;

export const Information = styled.Text`
  ${props => props.theme.subtitle};
  color: ${props => props.theme.black};
`;

