import React, { useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}
interface inputValue {
  value: string;
}
const Input: React.FC<InputProps> = ({ icon, name, ...rest }) => {
  const { fieldName, registerField, defaultValue = '' } = useField(name);
  const inputValueRef = useRef<inputValue>({ value: defaultValue });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
        placeholderTextColor="#666360"
        {...rest}
        defaultValue={defaultValue}
        keyboardAppearance="dark"
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
      />
    </Container>
  );
};

export default Input;
