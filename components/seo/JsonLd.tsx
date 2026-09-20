/**
 * Menempelkan structured data JSON-LD ke dalam halaman. Isinya selalu berasal
 * dari data kami sendiri (bukan masukan pengunjung), jadi aman dirender apa
 * adanya. Loloskan satu objek atau daftar objek sekaligus.
 */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
