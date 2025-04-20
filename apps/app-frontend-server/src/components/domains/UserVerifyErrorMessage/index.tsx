import { wrapper } from './styles.css';

import IconExclamationCircle from '@components/shared/IconExclamationCircle';
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
