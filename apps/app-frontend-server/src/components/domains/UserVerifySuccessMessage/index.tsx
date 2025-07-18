import { IconCheckCircle } from '@trastocker/ui-elements';

import { wrapper } from './styles.css';

import { useTranslation } from '@hooks/useTranslation';

const UserVerifySuccessMessage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={wrapper}>
      <IconCheckCircle />
      {t('User registration success')}
    </div>
  );
};

export default UserVerifySuccessMessage;
