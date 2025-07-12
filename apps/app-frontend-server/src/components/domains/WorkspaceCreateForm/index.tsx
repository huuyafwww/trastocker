import { useId } from 'react';

import { ErrorMessage, InputGroup, FormGroup } from '@trastocker/ui-elements';
import { FormProvider } from 'react-hook-form';

import { useWorkspaceCreateForm } from '@components/domains/WorkspaceCreateForm/logics';
import { input } from '@components/domains/WorkspaceCreateForm/styles.css';
import InputControl from '@components/shared/InputControl';
import { useTranslation } from '@hooks/useTranslation';

const WorkspaceCreateForm: React.FC = () => {
  const inputNameId = useId();
  const { t } = useTranslation();
  const { methods, handleSubmit, canSubmit } = useWorkspaceCreateForm();

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
              label={inputNameId}
              rules={{ required: true }}
            />
          </InputGroup.Input>
          {methods.formState.errors['name']?.message && (
            <div className="mt-2">
              <ErrorMessage message={methods.formState.errors['name'].message} />
            </div>
          )}
        </InputGroup>
        <FormGroup.Button isDisabled={!canSubmit}>
          {t('Create')}
        </FormGroup.Button>
      </form>
    </FormProvider>
  );
};

export default WorkspaceCreateForm;
