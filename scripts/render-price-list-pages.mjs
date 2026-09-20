/**
 * Mengubah setiap halaman price list PDF menjadi gambar JPG supaya brosur bisa
 * ditampilkan langsung di halaman menu (bukan lewat penampil PDF bawaan
 * peramban, yang tidak jalan di ponsel).
 *
 * Pemakaian:
 *   node scripts/render-price-list-pages.mjs [pdf] [outDir] [lebar] [kualitas] [batasHalaman]
 *
 * Hasilnya ditulis ke public/images/price-list/page-NN.jpg + manifest.json
 * berisi ukuran tiap halaman (dipakai untuk mencegah layout shift).
 */
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import * as pdfToImg from "pdf-to-img";
import sharp from "sharp";

const render = pdfToImg.pdf ?? pdfToImg.default;

const pdfPath = process.argv[2] ?? "assets-src/Price list Nurmarisa Catering.pdf";
const outDir = process.argv[3] ?? "public/images/price-list";
const targetWidth = Number(process.argv[4] ?? 1500);
const quality = Number(process.argv[5] ?? 80);
const limit = Number(process.argv[6] ?? Number.POSITIVE_INFINITY);

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const startedAt = Date.now();
const doc = await render(pdfPath, { scale: 2 });
console.log(`PDF   : ${pdfPath}`);
console.log(`Halaman: ${doc.length}`);

const pages = [];
let index = 0;

for await (const rawPage of doc) {
  index += 1;
  if (index > limit) break;

  const jpeg = await sharp(rawPage)
    .resize({ width: targetWidth })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality, progressive: true, chromaSubsampling: "4:4:4" })
    .toBuffer();

  const meta = await sharp(jpeg).metadata();
  const file = `page-${String(index).padStart(2, "0")}.jpg`;
  await writeFile(path.join(outDir, file), jpeg);

  pages.push({
    page: index,
    src: `/images/price-list/${file}`,
    width: meta.width,
    height: meta.height,
    bytes: jpeg.length,
  });

  console.log(
    `  ${file}  ${meta.width}x${meta.height}  ${(jpeg.length / 1024).toFixed(0)} KB`,
  );
}

await writeFile(
  path.join(outDir, "manifest.json"),
  `${JSON.stringify({ source: path.basename(pdfPath), targetWidth, quality, pages }, null, 2)}\n`,
);

const totalMb = (pages.reduce((sum, page) => sum + page.bytes, 0) / 1024 / 1024).toFixed(2);

console.log(
  `Selesai dalam ${((Date.now() - startedAt) / 1000).toFixed(1)}s: ${pages.length} halaman, ${totalMb} MB total`,
);
