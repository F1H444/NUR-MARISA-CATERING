import { googleMapsQuery, site } from "@/data/site";

/**
 * Peta lokasi memakai embed Google Maps resmi (tanpa API key).
 *
 *  Yang di-embed adalah pencarian nama bisnis kami, bukan koordinat hasil
 *  hitung sendiri. Alasannya: dengan cara ini Google menampilkan kartu bisnis
 *  resmi kami (nama, alamat, skor ulasan, dan tombol Buka di Maps), dan pin-nya
 *  persis sama dengan yang dilihat orang saat mencari Nur Marisa Catering di
 *  Google Maps. Titik hasil hitung sendiri pernah meleset, karena Google tidak
 *  mengenal nomor blok di dalam komplek ("Blok 1A No. 35").
 */
export function LocationMap() {
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(googleMapsQuery)}&hl=id&output=embed`;

  return (
    <iframe
      src={embedUrl}
      title={`Peta lokasi ${site.name}`}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      className="h-full w-full border-0"
    />
  );
}
