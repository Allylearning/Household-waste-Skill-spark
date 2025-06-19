import type { SVGProps } from 'react';
import { Recycle } from 'lucide-react';

export function GreenBinProBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="hsl(var(--accent))" stroke="hsl(var(--accent-foreground))"/>
      <Recycle x="6" y="6" width="12" height="12" stroke="hsl(var(--accent-foreground))" strokeWidth="1.5" />
    </svg>
  );
}
