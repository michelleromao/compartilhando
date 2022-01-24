import styled from 'styled-components/native';

export const ItemText = styled.View`
  width: 100%;
  align-items: flex-start;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  ${props => props.theme.text};
  color: ${props => props.theme.black};
`;

export const Divider = styled.View`
  background-color: ${props => props.theme.black};
  width: 100%;
  height: 1px;
  margin-top: 16px;
`;