import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataForm } from "@/components/admin/DataForm";
import { Container, Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Isi Data Website",
  // Halaman ini bukan untuk pengunjung, jadi jangan diindeks mesin pencari.
  robots: { index: false, follow: false },
};

/**
 * Halaman isi data untuk pemilik bisnis. Hanya ada di komputer sendiri:
 * kalau website sudah dipasang di server (mode production), halaman ini 404.
 */
export default function IsiDataPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <Section className="pt-28 sm:pt-32">
      <Container>
        <div className="max-w-3xl">
          <SectionHeading
            layout="stack"
            eyebrow="Untuk Pemilik Bisnis"
            title="Isi data website di sini"
            description="Semua yang masih kosong atau masih contoh di website dikumpulkan jadi satu form. Isi yang Anda tahu, kosongkan yang belum ada. Setelah selesai, tekan Simpan, lalu beri tahu saya supaya datanya dipasang."
          />
        </div>

        <DataForm />
      </Container>
    </Section>
  );
}
