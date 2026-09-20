"use client";

import { useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";

type HourRow = { day: string; time: string };
type TestimonialRow = { name: string; city: string; quote: string };

type FormData = {
  kontak: { email: string; facebook: string; instagram: string; domain: string };
  jamOperasional: HourRow[];
  pembayaran: {
    dp: string;
    berlakuUntuk: string;
    pelunasan: string;
    metode: string;
    pembatalan: string;
    biayaTambahan: string;
  };
  klaim: {
    tahunBerdiri: string;
    sertifikatHalal: string;
    rating: string;
    kapasitasHarian: string;
    areaLuarBanjarmasin: string;
    ongkirLuarKota: string;
    cerita: string;
    slogan: string;
    fotoAcara: string;
  };
  testimoni: TestimonialRow[];
  catatan: string;
};

/** Nilai awal: yang di website sekarang, supaya tinggal diperbaiki. */
const initialState: FormData = {
  kontak: {
    email: "halo@nurmarisacatering.id",
    facebook: "https://facebook.com/nurmarisacatering",
    instagram: "https://instagram.com/nurmarisacatering",
    domain: "nurmarisacatering.id",
  },
  jamOperasional: [
    { day: "Senin - Jumat", time: "07.00 - 20.00" },
    { day: "Sabtu", time: "07.00 - 18.00" },
    { day: "Minggu", time: "08.00 - 16.00" },
  ],
  pembayaran: {
    dp: "",
    berlakuUntuk: "",
    pelunasan: "",
    metode: "",
    pembatalan: "",
    biayaTambahan: "",
  },
  klaim: {
    tahunBerdiri: "",
    sertifikatHalal: "",
    rating: "",
    kapasitasHarian: "",
    areaLuarBanjarmasin: "",
    ongkirLuarKota: "",
    cerita: "",
    slogan: "Catering rumahan, rasanya bikin balik lagi",
    fotoAcara: "",
  },
  testimoni: [
    { name: "", city: "", quote: "" },
    { name: "", city: "", quote: "" },
    { name: "", city: "", quote: "" },
  ],
  catatan: "",
};

const STORAGE_KEY = "nurmarisa-isi-data-v1";

/** Tidak ada yang berlangganan: dipakai hanya untuk tahu kapan sudah di peramban. */
const subscribeNothing = () => () => {};

/**
 * Bernilai true hanya setelah komponen berjalan di peramban. Selama render di
 * server (dan render hidrasi pertama) nilainya false, jadi isian tersimpan
 * tidak membuat HTML awal berbeda dengan hasil render React.
 */
function useIsClient() {
  return useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
}

/** Baca isian yang tersimpan di peramban, kalau ada dan masih berbentuk benar. */
function readStored(): FormData | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<FormData>;

    return {
      ...initialState,
      ...parsed,
      kontak: { ...initialState.kontak, ...parsed.kontak },
      pembayaran: { ...initialState.pembayaran, ...parsed.pembayaran },
      klaim: { ...initialState.klaim, ...parsed.klaim },
      jamOperasional: parsed.jamOperasional ?? initialState.jamOperasional,
      testimoni: parsed.testimoni ?? initialState.testimoni,
      catatan: parsed.catatan ?? initialState.catatan,
    };
  } catch {
    return null;
  }
}

const inputClass =
  "w-full rounded-2xl border border-forest-700 bg-forest-950 px-4 py-3 text-sm text-cream-50 outline-none transition-colors placeholder:text-forest-300 focus:border-gold-400/70 focus:ring-2 focus:ring-gold-400/25";

const labelClass = "text-xs font-semibold tracking-[0.14em] text-gold-400 uppercase";
const hintClass = "mt-1 block text-xs leading-relaxed text-forest-300";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {hint ? <span className={hintClass}>{hint}</span> : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function Card({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-4xl border border-forest-800 bg-forest-900 p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold text-cream-50">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-forest-200">{intro}</p>
      <div className="mt-6 grid gap-5">{children}</div>
    </section>
  );
}

/** Tombol kecil untuk menambah baris pada daftar yang bisa diulang. */
function AddRowButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 self-start rounded-full border border-forest-700 px-4 py-2 text-xs font-semibold text-cream-100 transition-colors hover:border-gold-400/60 hover:text-gold-200 disabled:cursor-not-allowed disabled:opacity-45"
    >
      <Plus size={14} aria-hidden />
      Tambah baris
    </button>
  );
}

function RemoveRowButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Hapus baris ini"
      className="grid h-10 shrink-0 place-items-center rounded-full border border-forest-700 px-3 text-forest-200 transition-colors hover:border-gold-400/60 hover:text-gold-200"
    >
      <Trash2 size={15} aria-hidden />
    </button>
  );
}

export function DataForm() {
  const isClient = useIsClient();
  const [data, setData] = useState<FormData>(() => readStored() ?? initialState);
  const [status, setStatus] = useState<{ tone: "ok" | "err" | "info"; text: string }>({
    tone: "info",
    text: "",
  });
  const [copied, setCopied] = useState(false);

  // Isian disimpan di peramban supaya tidak hilang kalau halaman ditutup.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Penyimpanan penuh atau diblokir: form tetap bisa dipakai.
    }
  }, [data]);

  const leaves = useMemo(() => {
    const { kontak, pembayaran, klaim, jamOperasional } = data;
    return [
      ...Object.values(kontak),
      ...Object.values(pembayaran),
      ...Object.values(klaim),
      ...jamOperasional.flatMap((row) => [row.day, row.time]),
    ];
  }, [data]);

  const filled = leaves.filter((value) => value.trim().length > 0).length;
  const total = leaves.length;
  const testimoniTerisi = data.testimoni.filter(
    (row) => row.name.trim() || row.quote.trim(),
  ).length;

  const payload = useMemo(
    () => ({ ...data, diisiPada: new Date().toISOString() }),
    [data],
  );

  async function saveToProject() {
    setStatus({ tone: "info", text: "Menyimpan..." });
    try {
      const response = await fetch("/api/simpan-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; file?: string; message?: string };
      if (response.ok && result.ok) {
        setStatus({
          tone: "ok",
          text: `Tersimpan ke berkas ${result.file} di folder project. Bilang saja ke saya, nanti datanya dipasang ke website.`,
        });
      } else {
        setStatus({ tone: "err", text: result.message ?? "Gagal menyimpan." });
      }
    } catch {
      setStatus({ tone: "err", text: "Gagal menyimpan. Coba lagi." });
    }
  }

  function downloadJson() {
    const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "isi-data-nurmarisa.json";
    link.click();
    URL.revokeObjectURL(url);
    setStatus({ tone: "ok", text: "Berkasnya diunduh. Kirim berkas itu ke saya." });
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(`${JSON.stringify(payload, null, 2)}\n`);
      setCopied(true);
      setStatus({ tone: "ok", text: "Jawabannya tersalin. Tempel ke chat." });
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setStatus({ tone: "err", text: "Tidak bisa menyalin otomatis. Pakai tombol unduh." });
    }
  }

  function resetForm() {
    setData(initialState);
    setStatus({ tone: "info", text: "Isian dikembalikan ke nilai awal." });
  }

  // Sebelum berjalan di peramban, tampilkan penanda singkat: isian tersimpan
  // dibaca setelah ini, jadi tidak ada perbedaan dengan render di server.
  if (!isClient) {
    return (
      <div className="mt-12 rounded-4xl border border-forest-800 bg-forest-900 p-6 text-sm text-forest-200">
        Menyiapkan form...
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-6">
      {/* Ringkasan isian */}
      <div className="flex flex-col gap-4 rounded-4xl border border-gold-400/25 bg-forest-900 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <p className="font-display text-lg font-semibold text-cream-50">
            {filled} dari {total} kolom sudah terisi
          </p>
          <p className="mt-1 text-sm text-forest-200">
            {testimoniTerisi} testimoni disiapkan. Isian tersimpan otomatis di peramban ini.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={saveToProject}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500 bg-gold-400 px-5 py-3 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-300"
          >
            <Save size={16} aria-hidden />
            Simpan
          </button>
          <button
            type="button"
            onClick={downloadJson}
            className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-5 py-3 text-sm font-semibold text-cream-100 transition-colors hover:border-gold-400/60 hover:text-gold-200"
          >
            <Download size={16} aria-hidden />
            Unduh jawaban
          </button>
          <button
            type="button"
            onClick={copyJson}
            className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-5 py-3 text-sm font-semibold text-cream-100 transition-colors hover:border-gold-400/60 hover:text-gold-200"
          >
            {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
            Salin
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-5 py-3 text-sm font-semibold text-forest-200 transition-colors hover:border-gold-400/60 hover:text-gold-200"
          >
            <RotateCcw size={15} aria-hidden />
            Kosongkan
          </button>
        </div>
      </div>

      {status.text ? (
        <p
          className={[
            "rounded-3xl border px-5 py-4 text-sm leading-relaxed",
            status.tone === "ok"
              ? "border-gold-400/40 bg-forest-900 text-gold-200"
              : status.tone === "err"
                ? "border-red-400/40 bg-forest-900 text-red-200"
                : "border-forest-800 bg-forest-900 text-forest-200",
          ].join(" ")}
        >
          {status.text}
        </p>
      ) : null}

      {/* Kontak */}
      <Card
        title="1. Kontak & identitas"
        intro="Yang sekarang tertulis di website ada di dalam kolom. Ganti yang salah, atau kosongkan kalau memang belum punya."
      >
        <Field
          label="Email"
          hint="Kalau belum ada email yang benar-benar dibaca, kosongkan saja. Tombol emailnya saya hapus."
        >
          <input
            type="email"
            className={inputClass}
            value={data.kontak.email}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                kontak: { ...current.kontak, email: event.target.value },
              }))
            }
          />
        </Field>
        <Field label="Halaman Facebook" hint="Alamat lengkap, contoh https://facebook.com/namahalaman. Kosongkan kalau tidak dipakai.">
          <input
            className={inputClass}
            value={data.kontak.facebook}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                kontak: { ...current.kontak, facebook: event.target.value },
              }))
            }
          />
        </Field>
        <Field label="Instagram" hint="Konfirmasi alamatnya sudah benar.">
          <input
            className={inputClass}
            value={data.kontak.instagram}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                kontak: { ...current.kontak, instagram: event.target.value },
              }))
            }
          />
        </Field>
        <Field
          label="Nama domain website"
          hint="Dipakai untuk pratinjau saat link dibagikan di WhatsApp atau sosial media. Kalau belum punya, tulis belum ada."
        >
          <input
            className={inputClass}
            value={data.kontak.domain}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                kontak: { ...current.kontak, domain: event.target.value },
              }))
            }
          />
        </Field>
      </Card>

      {/* Jam operasional */}
      <Card
        title="2. Jam operasional"
        intro="Jam berapa pesanan bisa ditanyakan atau diterima. Boleh ditulis bebas, contoh 07.00 - 20.00. Baris hari besar juga boleh ditambah."
      >
        {data.jamOperasional.map((row, index) => (
          <div key={index} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Field label={`Hari ${index + 1}`}>
                <input
                  className={inputClass}
                  value={row.day}
                  placeholder="Senin - Jumat"
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      jamOperasional: current.jamOperasional.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, day: event.target.value } : item,
                      ),
                    }))
                  }
                />
              </Field>
            </div>
            <div className="flex-1">
              <Field label="Jam">
                <input
                  className={inputClass}
                  value={row.time}
                  placeholder="07.00 - 20.00"
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      jamOperasional: current.jamOperasional.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, time: event.target.value } : item,
                      ),
                    }))
                  }
                />
              </Field>
            </div>
            <div className="pb-1">
              <RemoveRowButton
                onClick={() =>
                  setData((current) => ({
                    ...current,
                    jamOperasional: current.jamOperasional.filter(
                      (_, itemIndex) => itemIndex !== index,
                    ),
                  }))
                }
              />
            </div>
          </div>
        ))}
        <AddRowButton
          disabled={data.jamOperasional.length >= 6}
          onClick={() =>
            setData((current) => ({
              ...current,
              jamOperasional: [...current.jamOperasional, { day: "", time: "" }],
            }))
          }
        />
      </Card>

      {/* Pembayaran */}
      <Card
        title="3. Uang muka & pembayaran"
        intro="Langkah Cara Pesan di halaman menu bilang DP mengunci jadwal dapur, tapi belum ada angkanya. Isi yang berlaku di tempat Anda."
      >
        <Field label="DP berapa?" hint="Boleh persen atau rupiah tetap, contoh 30% atau Rp 500.000.">
          <input
            className={inputClass}
            value={data.pembayaran.dp}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                pembayaran: { ...current.pembayaran, dp: event.target.value },
              }))
            }
          />
        </Field>
        <Field label="Berlaku untuk pesanan mana?" hint="Contoh semua paket, atau hanya pesanan di atas 200 pax.">
          <input
            className={inputClass}
            value={data.pembayaran.berlakuUntuk}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                pembayaran: { ...current.pembayaran, berlakuUntuk: event.target.value },
              }))
            }
          />
        </Field>
        <Field label="Pelunasan paling lambat kapan?" hint="Contoh H-2, hari pengiriman, atau saat acara selesai.">
          <input
            className={inputClass}
            value={data.pembayaran.pelunasan}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                pembayaran: { ...current.pembayaran, pelunasan: event.target.value },
              }))
            }
          />
        </Field>
        <Field label="Cara bayar" hint="Contoh transfer bank (nama bank, nomor rekening, atas nama), QRIS, atau tunai.">
          <textarea
            rows={3}
            className={inputClass}
            value={data.pembayaran.metode}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                pembayaran: { ...current.pembayaran, metode: event.target.value },
              }))
            }
          />
        </Field>
        <Field label="Kalau acara batal atau pindah tanggal?" hint="DP hangus, bisa dialihkan, atau ada potongan.">
          <input
            className={inputClass}
            value={data.pembayaran.pembatalan}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                pembayaran: { ...current.pembayaran, pembatalan: event.target.value },
              }))
            }
          />
        </Field>
        <Field label="Biaya lain di luar harga menu?" hint="Contoh ongkir luar kota, sewa meja tambahan, atau petugas ekstra.">
          <input
            className={inputClass}
            value={data.pembayaran.biayaTambahan}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                pembayaran: { ...current.pembayaran, biayaTambahan: event.target.value },
              }))
            }
          />
        </Field>
      </Card>

      {/* Klaim */}
      <Card
        title="4. Klaim yang bisa dihidupkan lagi"
        intro="Bagian ini opsional. Isi hanya kalau datanya memang ada, karena semua yang masuk sini akan ditulis di website sebagai fakta."
      >
        <Field label="Tahun berdiri" hint="Contoh 2015. Kalau diisi, statistik tahun melayani bisa ditampilkan lagi.">
          <input
            className={inputClass}
            value={data.klaim.tahunBerdiri}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                klaim: { ...current.klaim, tahunBerdiri: event.target.value },
              }))
            }
          />
        </Field>
        <Field
          label="Sertifikat halal"
          hint="Kalau sudah punya: nomor dan masa berlakunya. Kalau belum, tulis belum ada. Klaim halal tidak dipakai sampai ada sertifikatnya."
        >
          <input
            className={inputClass}
            value={data.klaim.sertifikatHalal}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                klaim: { ...current.klaim, sertifikatHalal: event.target.value },
              }))
            }
          />
        </Field>
        <Field label="Rating asli" hint="Contoh 4,8 dari 56 ulasan Google. Sertakan sumbernya.">
          <input
            className={inputClass}
            value={data.klaim.rating}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                klaim: { ...current.klaim, rating: event.target.value },
              }))
            }
          />
        </Field>
        <Field label="Kapasitas harian" hint="Jumlah pax terbanyak yang sanggup dikerjakan dalam sehari.">
          <input
            className={inputClass}
            value={data.klaim.kapasitasHarian}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                klaim: { ...current.klaim, kapasitasHarian: event.target.value },
              }))
            }
          />
        </Field>
        <Field
          label="Daerah layanan di luar Banjarmasin"
          hint="Contoh Banjarbaru, Martapura, Kertak Hanyar, Gambut. Kosongkan kalau belum melayani."
        >
          <input
            className={inputClass}
            value={data.klaim.areaLuarBanjarmasin}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                klaim: { ...current.klaim, areaLuarBanjarmasin: event.target.value },
              }))
            }
          />
        </Field>
        <Field label="Ongkir ke luar kota" hint="Contoh 10 ribu per km, atau dihitung sesuai lokasi.">
          <input
            className={inputClass}
            value={data.klaim.ongkirLuarKota}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                klaim: { ...current.klaim, ongkirLuarKota: event.target.value },
              }))
            }
          />
        </Field>
        <Field label="Slogan website" hint="Yang sekarang dipakai: Catering rumahan, rasanya bikin balik lagi.">
          <input
            className={inputClass}
            value={data.klaim.slogan}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                klaim: { ...current.klaim, slogan: event.target.value },
              }))
            }
          />
        </Field>
        <Field
          label="Cerita asal-usul dapur"
          hint="Sekarang bagian Kenalan hanya memuat fakta. Kalau mau versi ceritanya, tulis singkat di sini."
        >
          <textarea
            rows={4}
            className={inputClass}
            value={data.klaim.cerita}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                klaim: { ...current.klaim, cerita: event.target.value },
              }))
            }
          />
        </Field>
        <Field
          label="Foto acara sendiri"
          hint="Kalau mau galeri memakai foto dokumentasi acara Anda, taruh fotonya di folder public/images lalu tulis nama berkasnya di sini."
        >
          <textarea
            rows={3}
            className={inputClass}
            value={data.klaim.fotoAcara}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                klaim: { ...current.klaim, fotoAcara: event.target.value },
              }))
            }
          />
        </Field>
      </Card>

      {/* Testimoni */}
      <Card
        title="5. Testimoni asli (kalau ada)"
        intro="Bagian testimoni sudah dihapus dari website karena isinya karangan. Kalau Anda punya ulasan asli dari pelanggan, isi di sini dan saya bangun lagi bagiannya."
      >
        {data.testimoni.map((row, index) => (
          <div
            key={index}
            className="grid gap-3 rounded-3xl border border-forest-800 bg-forest-950 p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className={labelClass}>Testimoni {index + 1}</span>
              <RemoveRowButton
                onClick={() =>
                  setData((current) => ({
                    ...current,
                    testimoni: current.testimoni.filter((_, itemIndex) => itemIndex !== index),
                  }))
                }
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nama atau inisial" hint="Contoh Dewi A.">
                <input
                  className={inputClass}
                  value={row.name}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      testimoni: current.testimoni.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, name: event.target.value } : item,
                      ),
                    }))
                  }
                />
              </Field>
              <Field label="Kota atau jenis acara" hint="Contoh Banjarmasin Selatan, atau acara syukuran.">
                <input
                  className={inputClass}
                  value={row.city}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      testimoni: current.testimoni.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, city: event.target.value } : item,
                      ),
                    }))
                  }
                />
              </Field>
            </div>
            <Field label="Ulasannya" hint="Tulis apa adanya seperti kata pelanggan, jangan dipoles.">
              <textarea
                rows={3}
                className={inputClass}
                value={row.quote}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    testimoni: current.testimoni.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, quote: event.target.value } : item,
                    ),
                  }))
                }
              />
            </Field>
          </div>
        ))}
        <AddRowButton
          disabled={data.testimoni.length >= 6}
          onClick={() =>
            setData((current) => ({
              ...current,
              testimoni: [...current.testimoni, { name: "", city: "", quote: "" }],
            }))
          }
        />
      </Card>

      {/* Catatan */}
      <Card
        title="6. Catatan tambahan"
        intro="Ada hal lain yang ingin diubah atau ditanyakan soal website? Tulis di sini."
      >
        <Field label="Catatan">
          <textarea
            rows={4}
            className={inputClass}
            value={data.catatan}
            onChange={(event) =>
              setData((current) => ({ ...current, catatan: event.target.value }))
            }
          />
        </Field>
      </Card>

      {/* Penutup */}
      <div className="flex flex-col gap-4 rounded-4xl border border-forest-800 bg-forest-900 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <p className="max-w-xl text-sm leading-relaxed text-forest-200">
          Sudah selesai mengisi? Tekan Simpan, lalu bilang ke saya bahwa isiannya sudah siap. Saya
          pakai datanya untuk memperbarui website, dan bagian yang belum ada datanya saya
          sembunyikan supaya tidak ada klaim kosong.
        </p>
        <button
          type="button"
          onClick={saveToProject}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold-500 bg-gold-400 px-6 py-3.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-300"
        >
          <Save size={16} aria-hidden />
          Simpan isian
          <ArrowRight size={16} aria-hidden />
        </button>
      </div>
    </div>
  );
}
