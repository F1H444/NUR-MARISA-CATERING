"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

function formatNumber(value: number, decimals: number) {
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Angka statistik yang berhitung naik saat masuk viewport. */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1600,
  className = "",
}: CountUpProps) {
  const nodeRef = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(frame);
    }

    let frame = 0;

    const start = () => {
      hasStarted.current = true;
      const startedAt = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        // easeOutCubic supaya perlambatan di akhir terasa halus
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(value * eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasStarted.current) {
            start();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={nodeRef} className={className}>
      {prefix}
      {formatNumber(display, decimals)}
      {suffix}
    </span>
  );
}
