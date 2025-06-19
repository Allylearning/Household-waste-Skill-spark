
import type { SVGProps } from 'react';
import Image from 'next/image';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  width?: number;
  height?: number;
}

export function NewspaperIcon({ className, width = 80, height = 80, ...rest }: IconProps) {
  return (
    <Image
      src="/images/newspaper.svg"
      alt="Newspaper"
      width={width}
      height={height}
      className={className}
      {...rest}
    />
  );
}
