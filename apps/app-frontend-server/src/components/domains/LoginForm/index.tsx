import { useId } from 'react';

import { FormProvider } from 'react-hook-form';
import { useToggle } from 'react-use';

import { input, iconButton } from './styles.css';

import type React from 'react';

import { useLoginForm } from '@components/domains/LoginForm/logics';
import Button from '@components/shared/Button';
import ErrorMessage from '@components/shared/ErrorMessage';
import FormGroup from '@components/shared/FormGroup';
import IconEye from '@components/shared/IconEye';
import IconEyeOff from '@components/shared/IconEyeOff';
import InputControl from '@components/shared/InputControl';
import InputGroup from '@components/shared/InputGroup';
import { useTranslation } from '@hooks/useTranslation';

const LoginForm: React.FC = () => {
  const inputEmailId = useId();
  const inputPasswordId = useId();
  const { t } = useTranslation();
  const { methods, handleSubmit } = useLoginForm();
  const [on, toggle] = useToggle(true);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputGroup.Label inputId={inputEmailId}>
            {t('Email')}
          </InputGroup.Label>
          <InputGroup.Input>
            <InputControl
              id={inputEmailId}
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
          </InputGroup.Input>
          {methods.formState.errors['email']?.message && (
            <div className="mt-2">
              <ErrorMessage message={methods.formState.errors['email'].message} />
            </div>
          )}
        </InputGroup>
        <InputGroup>
          <InputGroup.Label inputId={inputPasswordId}>
            {t('Password')}
          </InputGroup.Label>
          <InputGroup.Input>
            <InputControl
              id={inputPasswordId}
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
          </InputGroup.Input>
          {methods.formState.errors['password']?.message && (
            <div className="mt-2">
              <ErrorMessage message={methods.formState.errors['password'].message} />
            </div>
          )}
        </InputGroup>
        <FormGroup.Button>
          {t('Login')}
        </FormGroup.Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
