import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "light" | "dark";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-gold-400 text-forest-950 hover:bg-gold-300 border border-gold-500",
  secondary: "bg-forest-800 text-cream-50 hover:bg-forest-700 border border-forest-700",
  outline:
    "bg-transparent text-cream-100 hover:border-gold-400/70 hover:text-gold-200 border border-forest-700",
  light: "bg-cream-50 text-forest-950 hover:bg-cream-100 border border-cream-100",
  dark: "bg-forest-950 text-cream-100 hover:bg-forest-900 border border-forest-800",
};

const sizes: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2 gap-1.5",
  md: "text-sm px-5 py-2.5 gap-2",
  lg: "text-base px-6 py-3.5 gap-2.5",
};

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  ariaLabel?: string;
  /** Memaksa tautan diunduh alih-alih dibuka (dipakai untuk brosur PDF). */
  download?: boolean;
  /** Membuka tautan di tab baru, termasuk untuk tautan internal. */
  newTab?: boolean;
};

/**
 * Tombol reusable. Otomatis memakai next/link untuk tautan internal,
 * tag <a> untuk tautan eksternal, dan <button> bila tanpa href.
 */
export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className = "",
  ariaLabel,
  download = false,
  newTab = false,
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-full font-medium tracking-tight",
    "transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950",
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && iconPosition === "left" ? <span className="shrink-0">{icon}</span> : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? <span className="shrink-0">{icon}</span> : null}
    </>
  );

  if (href) {
    const isExternal =
      href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

    if (isExternal) {
      const isNewTab = href.startsWith("http");
      return (
        <a
          href={href}
          aria-label={ariaLabel}
          className={classes}
          {...(isNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      );
    }

    if (download || newTab) {
      return (
        <a
          href={href}
          aria-label={ariaLabel}
          className={classes}
          {...(download ? { download: "" } : {})}
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={classes}>
      {content}
    </button>
  );
}
