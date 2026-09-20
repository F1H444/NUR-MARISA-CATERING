"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealVariant = "up" | "fade" | "left" | "right" | "zoom";

const hiddenState: Record<RevealVariant, string> = {
  up: "opacity-0 translate-y-10",
  fade: "opacity-0",
  left: "opacity-0 -translate-x-10",
  right: "opacity-0 translate-x-10",
  zoom: "opacity-0 scale-[0.96]",
};

type RevealProps = {
  children: ReactNode;
  /** Arah animasi saat elemen masuk viewport. */
  variant?: RevealVariant;
  /** Jeda animasi dalam milidetik, dipakai untuk efek berurutan. */
  delay?: number;
  className?: string;
};

/**
 * Membungkus konten dengan animasi scroll-trigger berbasis IntersectionObserver.
 * Animasi hanya berjalan sekali lalu dimatikan kembali agar tetap hemat.
 * Pengguna dengan preferensi reduce-motion langsung melihat konten final.
 */
export function Reveal({ children, variant = "up", delay = 0, className = "" }: RevealProps) {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={nodeRef}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
      className={[
        "transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform motion-reduce:transition-none",
        isVisible
          ? "translate-x-0 translate-y-0 scale-100 opacity-100"
          : hiddenState[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
