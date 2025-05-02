import LogoImage from './logo.png';

type LogoTrastockerProps = Omit<React.JSX.IntrinsicElements['img'], 'src' | 'alt'> & {
  alt?: string;
};

const LogoTrastocker = ({
  alt = 'Trastocker',
  ...props
}: LogoTrastockerProps) => {
  return (
    <img
      src={LogoImage}
      alt={alt}
      {...props}
    />
  );
};

export default LogoTrastocker;
