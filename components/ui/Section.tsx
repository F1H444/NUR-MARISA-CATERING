import type { ReactNode } from "react";

/** Lebar konten yang dipakai semua section supaya ritme halaman konsisten. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

/** Pembungkus section dengan padding vertikal dan offset anchor navbar. */
export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-16 sm:py-20 lg:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  tone = "light",
  layout = "split",
  size = "default",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Tombol/tautan pendamping, diletakkan di bawah deskripsi pada kolom kanan. */
  action?: ReactNode;
  align?: "left" | "center";
  /** "light" untuk section hijau tua (bawaan), "dark" untuk pita emas/permukaan terang. */
  tone?: "dark" | "light";
  /** "split" menaruh judul di kolom kiri dan deskripsi di kolom kanan pada layar besar. */
  layout?: "stack" | "split";
  /** "compact" mengecilkan judul, dipakai kalau heading berada di dalam kolom sempit. */
  size?: "default" | "compact";
  className?: string;
}) {
  const isLight = tone === "light";

  const eyebrowNode = eyebrow ? (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase",
        isLight ? "border-gold-400/30 bg-forest-900 text-gold-300" : "border-forest-900/20 bg-forest-950/10 text-forest-900",
      ].join(" ")}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${isLight ? "bg-gold-400" : "bg-forest-900"}`}
      />
      {eyebrow}
    </span>
  ) : null;

  const titleNode = (
    <h2
      className={[
        size === "compact"
          ? "text-[1.75rem] leading-[1.15] font-semibold sm:text-[2rem] lg:text-[2.25rem]"
          : "text-[2rem] leading-[1.1] font-semibold sm:text-4xl lg:text-[2.9rem]",
        isLight ? "text-cream-50" : "text-forest-950",
      ].join(" ")}
    >
      {title}
    </h2>
  );

  const descriptionNode = description ? (
    <p
      className={[
        "text-base leading-relaxed sm:text-[1.0625rem]",
        isLight ? "text-forest-200" : "text-forest-900/80",
      ].join(" ")}
    >
      {description}
    </p>
  ) : null;

  if (align === "center") {
    return (
      <div className={["mx-auto max-w-3xl text-center", className].filter(Boolean).join(" ")}>
        {eyebrowNode}
        <div className="mt-5">{titleNode}</div>
        {descriptionNode ? <div className="mt-4">{descriptionNode}</div> : null}
        {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
      </div>
    );
  }

  if (layout === "split") {
    return (
      <div
        className={["grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-14", className]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="lg:col-span-7">
          {eyebrowNode}
          <div className="mt-5">{titleNode}</div>
        </div>
        <div className="lg:col-span-5 lg:pb-1.5">
          {descriptionNode}
          {action ? <div className="mt-6">{action}</div> : null}
        </div>
      </div>
    );
  }

  return (
    <div className={["max-w-3xl", className].filter(Boolean).join(" ")}>
      {eyebrowNode}
      <div className="mt-5">{titleNode}</div>
      {descriptionNode ? <div className="mt-4">{descriptionNode}</div> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
