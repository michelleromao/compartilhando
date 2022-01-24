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

export const TabBar = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 24px;
`;
export const Collumn = styled.View`
  width: 49%;
`;
export const Tab = styled.TouchableOpacity`
  width: 100%;
`;
export const Color = styled.View`
  background-color: ${props => props.active ? props.theme.yellow :  props.theme.lightBlue};
  opacity: ${props => props.active ? 1 :  0.5};
  height: 6px;
  border-radius: 2px;
  margin-top: 8px;
`;

export const CountText = styled.Text`
  ${props => props.theme.text};
  opacity: ${props => props.active ? 1 :  0.3};
`;
export const Bold = styled.Text`
  ${props => props.theme.textBold};
`;

export const ContainerFilter = styled.View`
  justify-content: flex-start;
  height: 100px;
  margin-top: 24px;
`;

export const ContentFilter = styled.TouchableOpacity`
  border-color: ${props => props.theme.yellow};
  border-radius: 16px;
  border-width: 2px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? props.theme.lightYellow : props.theme.white};
  width: 60px;
  height: 60px;
  margin-right: 12px;
`;

export const LabelFilter = styled.Text`
  ${props => props.theme.subtitle};
  color: ${props => props.theme.black};
  width: 65px;
  text-align: center;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  font-size: 12px;
`;

export const FilterText = styled.Text`
  ${props => props.theme.subtitle};
  color: ${props => props.theme.blue};
  margin-bottom: 5px;
`;