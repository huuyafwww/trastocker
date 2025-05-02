import Image from 'next/image';

import LogoImage from './logo.png';

import type { ImageProps } from 'next/image';

type LogoTrastockerProps = Omit<ImageProps, 'src' | 'alt'> & {
  alt?: string;
};

const LogoTrastocker = ({
  alt = 'Trastocker',
  priority = true,
  ...props
}: LogoTrastockerProps) => {
  return (
    <Image
      src={LogoImage}
      alt={alt}
      priority={priority}
      {...props}
    />
  );
};

export default LogoTrastocker;
