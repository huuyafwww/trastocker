import Image from 'next/image';

import LogoImage from './logo.png';

type LogoStorybookProps = Omit<React.JSX.IntrinsicElements['img'], 'src' | 'alt'> & {
  alt?: string;
  width?: number;
  height?: number;
};

const LogoStorybook = ({
  alt = 'Storybook',
  ...props
}: LogoStorybookProps) => {
  return (
    <Image
      src={LogoImage}
      alt={alt}
      {...props}
    />
  );
};

export default LogoStorybook;
