import Image from 'next/image';

import IconImage from './icon.png';

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
      src={IconImage}
      alt={alt}
      {...props}
    />
  );
};

export default LogoLiam;
