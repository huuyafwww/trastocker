import Image from 'next/image';

import LogoImage from './logo.png';

type LogoLiamProps = Omit<React.JSX.IntrinsicElements['img'], 'src' | 'alt'> & {
  alt?: string;
  width?: number;
  height?: number;
};

const LogoLiam = ({
  alt = 'Storybook',
  ...props
}: LogoLiamProps) => {
  return (
    <Image
      src={LogoImage}
      alt={alt}
      {...props}
    />
  );
};

export default LogoLiam;
