import Image from 'next/image';

import IconImage from './icon.png';

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
      src={IconImage}
      alt={alt}
      priority={priority}
      {...props}
    />
  );
};

export default LogoTrastocker;
