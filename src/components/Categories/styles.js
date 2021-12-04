import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Content  = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 100px;
  border-color: ${props => props.theme.yellow};;
  border-width: 2px;
  background-color: ${props => props.theme.lightYellow};
  align-items: center;
  justify-content: center;  
`
export const Title  = styled.Text`
  ${props => props.theme.title};
  margin-left: 20px
`