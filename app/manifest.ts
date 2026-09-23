import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/** Keterangan singkat situs untuk peramban dan ponsel. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} - Catering ${site.city}`,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#085e42",
    theme_color: "#085e42",
    lang: "id",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
