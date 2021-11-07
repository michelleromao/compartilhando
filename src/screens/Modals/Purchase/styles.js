import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Content = styled.View`
  background-color: ${props => props.theme.white};
  border-width: 2px;
  border-color: ${props => props.theme.green};
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 32px;
  padding-bottom: 32px;
  align-items: flex-start;
  width: 90%;
`;

export const Title = styled.Text`
  ${props => props.theme.title};
  color: ${props => props.theme.blue};
`;

export const Description = styled.Text`
  ${props => props.theme.subtitle};
  color: ${props => props.theme.black};
  margin-top: 8px;
`;

export const Text = styled.Text`
  ${props => props.theme.text};
  color: ${props => props.theme.black};
  margin-top: 36px;
`;

export const GroupButton = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 48px;
`;

export const ViewButton = styled.View`
  width: 45%;
`;
