import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  margin-bottom: 32px;
`;

export const Content = styled.View`
  border-width: 2px;
  border-color: ${props => props.theme.yellow};
  border-radius: 15px;
  width: 100%;
  margin-bottom: 4px;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

export const Label = styled.Text`
  ${props => props.theme.text};
  color: ${props => props.theme.black};
  margin-bottom: 8px
`;