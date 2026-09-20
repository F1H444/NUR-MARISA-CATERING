import Image from "next/image";
import { site } from "@/data/site";

type BrandMarkProps = {
  /** Kelas Tailwind untuk ukuran, mis. "h-10 w-10". */
  className?: string;
  /** True hanya untuk logo di navbar (di atas lipatan halaman). */
  priority?: boolean;
};

/**
 * Logo asli Nur Marisa Catering (public/logo.png).
 *
 * Berkas logo berupa kotak dengan latar krem dan lambang bulat di tengahnya,
 * jadi wadah `rounded-full` + `object-cover` memotong sudut kotaknya dan
 * menyisakan lambangnya saja, tanpa perlu mengedit berkas aslinya.
 */
export function BrandMark({ className = "h-10 w-10", priority = false }: BrandMarkProps) {
  return (
    <span
      className={[
        "grid shrink-0 place-items-center overflow-hidden rounded-full border border-gold-400/45 bg-cream-50",
        className,
      ].join(" ")}
    >
      <Image
        src={site.logo.src}
        alt={site.logo.alt}
        width={96}
        height={96}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </span>
  );
}
