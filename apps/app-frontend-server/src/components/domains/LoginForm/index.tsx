import { useId, useCallback } from 'react';

import Button from '@/components/shared/Button';
import Form from '@/components/shared/Form';
import InputControl from '@/components/shared/InputControl';
import LogoTrastocker from '@/components/shared/LogoTrastocker';
import { useTranslation } from '@/hooks/useTranslation';

import { inputWrapper, logoWrapper, label, labelText, loginButtonWrapper } from './styles.css';

import type React from 'react';

const LoginForm: React.FC = () => {
  const emailInputId = useId();
  const passwordInputId = useId();
  const { t } = useTranslation();

  const handleSubmit = useCallback(() => {
    console.log('submit');
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <div className={logoWrapper}>
        <LogoTrastocker />
      </div>
      <div className={inputWrapper}>
        <label className={label} htmlFor={emailInputId}>
          <span className={labelText}>
            {t('Email')}
          </span>
        </label>
        <InputControl
          id={emailInputId}
          name="email"
          type="email"
          variant={{
            border: 'bordered',
          }}
        />
      </div>
      <div className={inputWrapper}>
        <label className={label} htmlFor={passwordInputId}>
          <span className={labelText}>
            {t('Password')}
          </span>
        </label>
        <InputControl
          id={passwordInputId}
          name="password"
          type="password"
          variant={{
            border: 'bordered',
          }}
        />
      </div>
      <div className={loginButtonWrapper}>
        <Button>
          {t('Login')}
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
