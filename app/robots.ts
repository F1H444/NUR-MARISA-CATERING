import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

/**
 * Aturan untuk perayap mesin pencari. Halaman publik dibuka lebar, sedangkan
 * halaman isi data dan alamat penyimpanannya ditutup karena bukan untuk
 * pengunjung (dan memang hanya hidup di mode pengembangan).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/isi-data", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
