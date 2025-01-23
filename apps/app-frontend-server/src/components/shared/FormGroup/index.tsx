import { wrapper } from './styles.css';

import Button from '@components/shared/Button';

const FormGroupButton: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <div className={wrapper}>
    <Button type="submit">
      {children}
    </Button>
  </div>
);

const FormGroup: {
  Button: typeof FormGroupButton;
} = {
  Button: FormGroupButton,
};

export default FormGroup;
