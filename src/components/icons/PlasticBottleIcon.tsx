import type { SVGProps } from 'react';

export function PlasticBottleIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M8 2h8" />
      <path d="M9 2v2.34c0 .55.23.94.67 1.25S10.66 6 12 6s1.89-.41 2.33-.41c.44-.31.67-.7.67-1.25V2" />
      <path d="M12 6L8 20.48c0 .28.22.52.5.52h7c.28 0 .5-.24.5-.52L12 6Z" />
      <path d="M10.48 12.48c.17-.09.33-.1.52-.1s.35.01.52.1" />
      <path d="M10.48 16.48c.17-.09.33-.1.52-.1s.35.01.52.1" />
    </svg>
  );
}
