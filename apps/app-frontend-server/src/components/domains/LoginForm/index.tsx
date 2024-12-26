import { useId } from 'react';

import { FormProvider } from 'react-hook-form';
import { useToggle } from 'react-use';

import { inputGroupWrapper, inputWrapper, input, iconButton, logoWrapper, label, labelText, loginButtonWrapper } from './styles.css';

import type React from 'react';

import { useLoginForm } from '@components/domains/LoginForm/logics';
import Button from '@components/shared/Button';
import ErrorMessage from '@components/shared/ErrorMessage';
import IconEye from '@components/shared/IconEye';
import IconEyeOff from '@components/shared/IconEyeOff';
import InputControl from '@components/shared/InputControl';
import LogoTrastocker from '@components/shared/LogoTrastocker';
import { useTranslation } from '@hooks/useTranslation';

const LoginForm: React.FC = () => {
  const emailInputId = useId();
  const passwordInputId = useId();
  const { t } = useTranslation();
  const { methods, handleSubmit } = useLoginForm();
  const [on, toggle] = useToggle(true);

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
          {methods.formState.errors['email']?.message && (
            <div className="mt-2">
              <ErrorMessage message={methods.formState.errors['email'].message} />
            </div>
          )}
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
              type={on ? 'text' : 'password'}
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
              onPress={toggle}
            >
              {on ? <IconEye /> : <IconEyeOff />}
            </Button>
          </div>
          {methods.formState.errors['password']?.message && (
            <div className="mt-2">
              <ErrorMessage message={methods.formState.errors['password'].message} />
            </div>
          )}
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
