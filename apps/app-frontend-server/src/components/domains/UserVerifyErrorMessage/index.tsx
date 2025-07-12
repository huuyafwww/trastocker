import { IconExclamationCircle } from '@trastocker/ui-elements';

import { wrapper } from './styles.css';

import { useTranslation } from '@hooks/useTranslation';

const UserVerifyErrorMessage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={wrapper}>
      <IconExclamationCircle />
      {t('User registration failed')}
    </div>
  );
};

export default UserVerifyErrorMessage;
