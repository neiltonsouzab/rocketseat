import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('E-mail inválido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autênticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Logon</h1>

            <Input
              type="text"
              name="email"
              placeholder="E-mail"
              icon={FiMail}
            />

            <Input
              type="password"
              name="password"
              placeholder="Senha"
              icon={FiLock}
            />

            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
