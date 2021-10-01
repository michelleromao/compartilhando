import styled from 'styled-components/native';

export const Container = styled.View`
  width: 90%;
  margin-bottom: 32px;
`;

export const Content = styled.View`
  width: 100%;
  border-width: 2px;
  border-color: ${props => props.theme.yellow};
  border-radius: 15px;
  width: 100%;
  height: 50px;
  margin-bottom: 4px;
  flex-direction: row;
  align-items: center;
`;


export const TextInput = styled.TextInput`
  padding-left: 16px;
  ${props => props.theme.text};
  color: ${props => props.theme.black};
  width: 86%;
`;

export const Label = styled.Text`
  ${props => props.theme.subtitle};
  color: ${props => props.theme.black};
  margin-bottom: 8px
`;