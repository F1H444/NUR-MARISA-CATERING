/**
 * Mengompres price list PDF: setiap halaman dirender via pdf-to-img lalu
 * dirakit ulang menjadi PDF baru berisi gambar JPEG (pdf-lib). Teks tidak lagi
 * bisa diseleksi, tapi isi visual tiap halaman tetap identik, dan ukuran berkas
 * turun drastis karena foto-foto di PDF asli tidak lagi dibawa tanpa
 * kompresi ulang.
 *
 * Pemakaian:
 *   node scripts/compress-price-list-pdf.mjs [pdfSumber] [pdfKeluar] [lebar] [kualitas]
 *
 * Default menghasilkan A4 portrait (595.28 x 841.89 pt) dengan halaman
 * 1654 px lebar, setara hasil render bawaan tapi jauh lebih ringan.
 */
import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument } from "pdf-lib";
import * as pdfToImg from "pdf-to-img";
import sharp from "sharp";

const render = pdfToImg.pdf ?? pdfToImg.default;

// A4 portrait dalam point (1 pt = 1/72 inci).
const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;

const sourcePath = process.argv[2] ?? "assets-src/Price list Nurmarisa Catering.pdf";
const outPath = process.argv[3] ?? "public/Price list Nurmarisa Catering.pdf";
const targetWidth = Number(process.argv[4] ?? 1654);
const quality = Number(process.argv[5] ?? 80);

await mkdir(path.dirname(outPath), { recursive: true });

const startedAt = Date.now();
const doc = await render(sourcePath, { scale: 2 });
console.log(`Sumber : ${sourcePath} (${doc.length} halaman)`);
console.log(`Keluar : ${outPath} (lebar ${targetWidth}px, kualitas JPEG ${quality})`);

const outPdf = await PDFDocument.create();
outPdf.setTitle("Price list Nurmarisa Catering");
outPdf.setProducer("compress-price-list-pdf.mjs");

let index = 0;

for await (const rawPage of doc) {
  index += 1;

  const jpeg = await sharp(rawPage)
    .resize({ width: targetWidth })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality, progressive: true, chromaSubsampling: "4:2:0" })
    .toBuffer();

  const image = await outPdf.embedJpg(jpeg);

  // Semua halaman price list berformat A4 portrait, dipasang pas satu halaman.
  const page = outPdf.addPage([A4_WIDTH, A4_HEIGHT]);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: A4_WIDTH,
    height: A4_HEIGHT,
  });

  console.log(
    `  hal ${String(index).padStart(2, "0")}  ${(jpeg.length / 1024).toFixed(0)} KB`,
  );
}

const pdfBytes = await outPdf.save({ useObjectStreams: true });
await writeFile(outPath, pdfBytes);

const sourceStat = await stat(sourcePath);
const outStat = await stat(outPath);
const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);

console.log(
  `Selesai dalam ${((Date.now() - startedAt) / 1000).toFixed(1)}s: ` +
    `${index} halaman, ${mb(pdfBytes.length)} MB ` +
    `(dari ${mb(sourceStat.size)} MB, jadi ${(outStat.size / sourceStat.size * 100).toFixed(1)}%)`,
);
