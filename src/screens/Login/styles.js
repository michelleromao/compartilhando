import styled from 'styled-components/native';

export const Name = styled.Text`
  ${props => props.theme.title};
  margin-top: 16px;
  color: ${props => props.theme.blue}
`;