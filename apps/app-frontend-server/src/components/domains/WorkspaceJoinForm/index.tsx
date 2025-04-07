import { useId } from 'react';

import { FormProvider } from 'react-hook-form';

import { useWorkspaceJoinForm } from './logics';

import { input } from '@components/domains/WorkspaceJoinForm/styles.css';
import ErrorMessage from '@components/shared/ErrorMessage';
import FormGroup from '@components/shared/FormGroup';
import InputControl from '@components/shared/InputControl';
import InputGroup from '@components/shared/InputGroup';
import { useTranslation } from '@hooks/useTranslation';

const WorkspaceJoinForm: React.FC = () => {
  const inputInviteCodeId = useId();
  const { t } = useTranslation();
  const { methods, handleSubmit, canSubmit } = useWorkspaceJoinForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputGroup.Label inputId={inputInviteCodeId}>
            {t('Invite Code')}
          </InputGroup.Label>
          <InputGroup.Input>
            <InputControl
              id={inputInviteCodeId}
              className={input}
              name="inviteCode"
              type="text"
              variant={{
                mode: 'with',
                border: 'none',
                size: 'none',
              }}
              label={inputInviteCodeId}
              rules={{ required: true }}
            />
          </InputGroup.Input>
          {methods.formState.errors['inviteCode']?.message && (
            <div className="mt-2">
              <ErrorMessage message={methods.formState.errors['inviteCode'].message} />
            </div>
          )}
        </InputGroup>
        <FormGroup.Button isDisabled={!canSubmit}>
          {t('Join')}
        </FormGroup.Button>
      </form>
    </FormProvider>
  );
};

export default WorkspaceJoinForm;
