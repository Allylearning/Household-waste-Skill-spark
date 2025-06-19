
import type { SVGProps } from 'react';
import Image from 'next/image';

interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height' | 'src'> {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ width = 100, height, className, ...rest }: LogoProps) {
  // If height is not provided, it will be calculated automatically by next/image to maintain aspect ratio
  return (
    <Image
      src="/images/logo.svg"
      alt="App Logo"
      width={width}
      height={height || width} // Provide a fallback or let next/image handle it if height is truly optional
      className={className}
      priority // Good for LCP if logo is always visible
      {...rest}
    />
  );
}
