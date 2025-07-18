import { useId } from 'react';

import { Button, ErrorMessage, IconEye, IconEyeOff, InputGroup, FormGroup } from '@trastocker/ui-elements';
import { FormProvider } from 'react-hook-form';
import { useToggle } from 'react-use';

import { input, iconButton } from './styles.css';

import type React from 'react';

import { useUserLoginForm } from '@components/domains/UserLoginForm/logics';
import InputControl from '@components/shared/InputControl';
import { useTranslation } from '@hooks/useTranslation';

const UserLoginForm: React.FC = () => {
  const inputEmailId = useId();
  const inputPasswordId = useId();
  const { t } = useTranslation();
  const { methods, handleSubmit, canSubmit } = useUserLoginForm();
  const [on, toggle] = useToggle(false);

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
              label={inputEmailId}
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
              label={inputPasswordId}
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
        <FormGroup.Button isDisabled={!canSubmit}>
          {t('Login')}
        </FormGroup.Button>
      </form>
    </FormProvider>
  );
};

export default UserLoginForm;
