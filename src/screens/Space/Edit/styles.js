import styled from 'styled-components/native';

export const Invite = styled.Text`
  ${props => props.theme.text};
  color: ${props => props.theme.black};
`;

export const Code = styled.Text`
  ${props => props.theme.subtitle};
  color: ${props => props.theme.black};
  text-align: center;
`;
