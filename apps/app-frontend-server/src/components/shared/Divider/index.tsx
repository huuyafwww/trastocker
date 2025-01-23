import { twMerge } from 'tailwind-merge';

import { wrapper, horizontal } from './styles.css';

const Divider: React.FC<{
  className?: string;
  $horizontal?: boolean;
  children?: React.ReactNode;
}> = ({
  children,
  className,
  $horizontal = false,
}) => {
  return (
    <div className={twMerge([
      wrapper,
      $horizontal && horizontal,
      className,
    ].filter(Boolean))}
    >
      {children}
    </div>
  );
};

export default Divider;
