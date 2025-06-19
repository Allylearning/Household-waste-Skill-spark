
import type { SVGProps } from 'react';
import Image from 'next/image';

// Even though we use next/image, SVGProps can be useful for className consistency if needed.
// However, width/height are directly props of next/image.
interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  width?: number;
  height?: number;
}

export function AppleIcon({ className, width = 80, height = 80, ...rest }: IconProps) {
  return (
    <Image
      src="/images/Apple.svg"
      alt="Apple"
      width={width}
      height={height}
      className={className}
      {...rest}
    />
  );
}
