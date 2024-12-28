import { twMerge } from 'tailwind-merge';

import IconTriangleAlert from '../IconTriangleAlert';

import { classNames } from './styles.css';

export type ErrorMessageProps = {
  message: string;
  className?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  return (
    <span className={twMerge(classNames.wrapper, className)}>
      <IconTriangleAlert />
      {message}
    </span>
  );
};

export default ErrorMessage;
