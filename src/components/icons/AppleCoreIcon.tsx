import type { SVGProps } from 'react';

export function AppleCoreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 21c-2.76-2.43-4-5.07-4-8.8A7.88 7.88 0 0 1 12 4a7.88 7.88 0 0 1 6 8.2c0 3.73-1.24 6.37-4 8.8" />
      <path d="M12 4c0 1.93.83 3.67 2.14 4.86S16.07 10 18 10" />
      <path d="M12 4c0 1.93-.83 3.67-2.14 4.86S7.93 10 6 10" />
      <path d="M12 10v4" />
      <path d="M12 18v3" />
      <path d="M15 3.5a1.5 1.5 0 0 0-3 0" />
    </svg>
  );
}
