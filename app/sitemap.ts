import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

/**
 * Daftar halaman yang boleh diindeks. Hanya dua, dan keduanya diberi bobot
 * tinggi karena memang jadi pintu masuk utama dari pencarian.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/menu`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
