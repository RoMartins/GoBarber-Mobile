import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
}
export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  padding: 0 16px;
  background: #232123;
  border-width: 2px;
  border-color: #232129;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
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
