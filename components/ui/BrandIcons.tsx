import type { SVGProps } from "react";

type BrandIconProps = Omit<SVGProps<SVGSVGElement>, "ref"> & { size?: number };

/**
 * Lucide v1 tidak lagi menyertakan ikon merek, jadi ikon sosial media
 * digambar inline dengan gaya stroke yang sama agar tampil konsisten.
 */
function BrandIcon({ size = 18, children, ...props }: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={props["aria-hidden"] ?? true}
      {...props}
    >
      {children}
    </svg>
  );
}

export function InstagramIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <path d="M17.5 6.5h.01" />
    </BrandIcon>
  );
}

export function TikTokIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M15 4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-2v6a5.5 5.5 0 1 1-5.5-5.5c.2 0 .4 0 .5.02V14a2.5 2.5 0 1 0 2 2.5V2h2.7a5 5 0 0 0 .3 2Z" />
    </BrandIcon>
  );
}
