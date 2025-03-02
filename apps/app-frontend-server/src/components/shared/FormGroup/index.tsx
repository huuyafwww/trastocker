import { wrapper } from './styles.css';

import type { ButtonProps } from '@components/shared/Button';

import Button from '@components/shared/Button';

const FormGroupButton: React.FC<{
  children: React.ReactNode;
} & ButtonProps> = ({ children, ...props }) => (
  <div className={wrapper}>
    <Button type="submit" {...props}>
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
