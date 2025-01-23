import { useId } from 'react';

import { FormProvider } from 'react-hook-form';

import { input } from '../LoginForm/styles.css';

import { useWorkspaceCreateForm } from '@components/domains/WorkspaceCreateForm/logics';
import ErrorMessage from '@components/shared/ErrorMessage';
import FormGroup from '@components/shared/FormGroup';
import InputControl from '@components/shared/InputControl';
import InputGroup from '@components/shared/InputGroup';
import { useTranslation } from '@hooks/useTranslation';

const WorkspaceCreateForm: React.FC = () => {
  const inputNameId = useId();
  const { t } = useTranslation();
  const { methods, handleSubmit } = useWorkspaceCreateForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputGroup.Label inputId={inputNameId}>
            {t('Workspace Name')}
          </InputGroup.Label>
          <InputGroup.Input>
            <InputControl
              id={inputNameId}
              className={input}
              name="name"
              type="text"
              variant={{
                mode: 'with',
                border: 'none',
                size: 'none',
              }}
              rules={{ required: true }}
            />
          </InputGroup.Input>
          {methods.formState.errors['name']?.message && (
            <div className="mt-2">
              <ErrorMessage message={methods.formState.errors['name'].message} />
            </div>
          )}
        </InputGroup>
        <FormGroup.Button>
          {t('Create')}
        </FormGroup.Button>
      </form>
    </FormProvider>
  );
};

export default WorkspaceCreateForm;
