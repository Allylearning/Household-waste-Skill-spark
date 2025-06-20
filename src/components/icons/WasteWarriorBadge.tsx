import type { SVGProps } from 'react';

export function WasteWarriorBadge(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="hsl(var(--primary))" stroke="hsl(var(--primary-foreground))"/>
      <path d="m9 12 2 2 4-4" stroke="hsl(var(--primary-foreground))" strokeWidth="2"/>
    </svg>
  );
}
