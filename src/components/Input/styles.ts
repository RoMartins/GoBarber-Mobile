import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  padding: 0 16px;
  background: #232123;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;
export const TextInput = styled.TextInput`
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  flex: 1;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
