import { useId } from 'react';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import LogoTrastocker from '@/components/shared/LogoTrastocker';
import { useTranslation } from '@/hooks/useTranslation';

import { inputWrapper, logoWrapper, label, labelText, loginButtonWrapper } from './styles.css';

import type React from 'react';

const LoginForm: React.FC = () => {
  const emailInputId = useId();
  const passwordInputId = useId();
  const { t } = useTranslation();
  return (
    <form>
      <div className={logoWrapper}>
        <LogoTrastocker />
      </div>
      <div className={inputWrapper}>
        <label className={label} htmlFor={emailInputId}>
          <span className={labelText}>
            {t('Email')}
          </span>
        </label>
        <Input
          id={emailInputId}
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
        <Input
          id={passwordInputId}
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
    </form>
  );
};

export default LoginForm;
