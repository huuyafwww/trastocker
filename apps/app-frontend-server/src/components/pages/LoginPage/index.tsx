import LoginForm from '@/components/domains/LoginForm';

import { wrapper, inner } from './styles.css';

import type React from 'react';

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <div className={wrapper}>
      <div className={inner}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
