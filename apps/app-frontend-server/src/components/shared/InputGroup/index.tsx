import { inputGroupWrapper, label, labelText, inputWrapper } from './styles.css';

const InputGroup: React.FC<{
  children: React.ReactNode;
}> & {
  Label: typeof InputGroupLabel;
  Input: typeof InputGroupInput;
} = ({ children }) => {
  return (
    <div className={inputGroupWrapper}>
      {children}
    </div>
  );
};

const InputGroupLabel: React.FC<{
  children: React.ReactNode;
  inputId: string;
}> = ({ children, inputId }) => (
  <label className={label} htmlFor={inputId}>
    <span className={labelText}>
      {children}
    </span>
  </label>
);

const InputGroupInput: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <div className={inputWrapper}>
    {children}
  </div>
);

InputGroup.Label = InputGroupLabel;
InputGroup.Input = InputGroupInput;

export default InputGroup;
