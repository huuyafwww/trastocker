import { useId, useState, useCallback } from 'react';

import { FormProvider } from 'react-hook-form';

import { useLoginForm } from '@/components/domains/LoginForm/logics';
import Button from '@/components/shared/Button';
import IconEye from '@/components/shared/IconEye';
import IconEyeOff from '@/components/shared/IconEyeOff';
import InputControl from '@/components/shared/InputControl';
import LogoTrastocker from '@/components/shared/LogoTrastocker';
import { useTranslation } from '@/hooks/useTranslation';

import { inputGroupWrapper, inputWrapper, input, iconButton, logoWrapper, label, labelText, loginButtonWrapper } from './styles.css';

import type React from 'react';

const LoginForm: React.FC = () => {
  const emailInputId = useId();
  const passwordInputId = useId();
  const { t } = useTranslation();
  const { methods, handleSubmit } = useLoginForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleClick = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <div className={logoWrapper}>
          <LogoTrastocker />
        </div>
        <div className={inputGroupWrapper}>
          <label className={label} htmlFor={emailInputId}>
            <span className={labelText}>
              {t('Email')}
            </span>
          </label>
          <div className={inputWrapper}>
            <InputControl
              id={emailInputId}
              className={input}
              name="email"
              type="email"
              variant={{
                mode: 'with',
                border: 'none',
                size: 'none',
              }}
              rules={{ required: true }}
            />
          </div>
        </div>
        <div className={inputGroupWrapper}>
          <label className={label} htmlFor={passwordInputId}>
            <span className={labelText}>
              {t('Password')}
            </span>
          </label>
          <div className={inputWrapper}>
            <InputControl
              id={passwordInputId}
              className={input}
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              variant={{
                mode: 'with',
                border: 'none',
                size: 'none',
              }}
              rules={{ required: true }}
            />
            <Button
              className={iconButton}
              type="button"
              variant={{
                color: 'ghost',
              }}
              onClick={handleClick}
            >
              {isPasswordVisible ? <IconEye /> : <IconEyeOff />}
            </Button>
          </div>
        </div>
        <div className={loginButtonWrapper}>
          <Button type="submit">
            {t('Login')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
