import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useState,
} from 'react';
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

interface InputRef {
  focus(): void;
}
const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { icon, name, ...rest },
  ref,
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputElementRef = useRef<any>(null);
  const { fieldName, registerField, defaultValue = '' } = useField(name);

  const inputValueRef = useRef<inputValue>({ value: defaultValue });

  const HandleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const HandleInpuBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={inputElementRef}
        onFocus={HandleInputFocus}
        onBlur={HandleInpuBlur}
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

export default forwardRef(Input);
