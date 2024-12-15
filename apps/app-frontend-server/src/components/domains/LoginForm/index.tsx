import { useId } from 'react';

import { FormProvider } from 'react-hook-form';

import { useLoginForm } from '@/components/domains/LoginForm/logics';
import Button from '@/components/shared/Button';
import InputControl from '@/components/shared/InputControl';
import LogoTrastocker from '@/components/shared/LogoTrastocker';
import { useTranslation } from '@/hooks/useTranslation';

import { inputWrapper, logoWrapper, label, labelText, loginButtonWrapper } from './styles.css';

import type React from 'react';

const LoginForm: React.FC = () => {
  const emailInputId = useId();
  const passwordInputId = useId();
  const { t } = useTranslation();
  const { methods, handleSubmit } = useLoginForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
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
            rules={{ required: true }}
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
            rules={{ required: true }}
          />
        </div>
        <div className={loginButtonWrapper}>
          <Button>
            {t('Login')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
