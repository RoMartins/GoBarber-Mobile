import React, { useRef, useCallback } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import logoImg from '../../assets/Logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Title, BackToSignInText, BackToSignIn } from './styles';
import validationError from '../../utils/getValidationErrors';
import api from '../../services/api';

interface SignUpFormData {
  email: string;
  name: string;
  password: string;
}
const SignUp: React.FC = () => {
  const FormRef = useRef<FormHandles>(null);
  const InputPasswordRef = useRef<TextInput>(null);
  const EmailInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleRegister = useCallback(async (data: SignUpFormData) => {
    try {
      FormRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      Alert.alert('Cadastro efetuado com sucesso!', 'Faça seu logon');

      navigation.goBack();
    } catch (error) {
      console.log(error.message, 'erro');

      if (error instanceof Yup.ValidationError) {
        const errors = validationError(error);

        FormRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer o cadastro.',
      );
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form
              ref={FormRef}
              onSubmit={handleRegister}
              style={{ width: '100%' }}
            >
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => EmailInputRef.current?.focus()}
              />

              <Input
                ref={EmailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => InputPasswordRef.current?.focus()}
              />

              <Input
                ref={InputPasswordRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => FormRef.current?.submitForm()}
              />

              <Button onPress={() => FormRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar para o login</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
