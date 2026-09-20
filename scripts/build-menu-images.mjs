/**
 * Salin foto hasil ekstraksi PDF ke public/images/menu sesuai item menu.
 *
 * Sumber: .next/pdf-images (hasil `scripts/extract-price-list-images.mjs`).
 * Pemetaan di bawah disusun dari halaman + posisi gambar di PDF, lalu
 * diperiksa dengan warna rata-rata bagian tengah gambar (mis. Matcha hijau,
 * Thai tea oranye, Mie Habang merah, Es Melon hijau).
 *
 * Kalau ada foto yang menurut Anda tidak cocok dengan menunya, cukup ubah
 * pasangan id -> nama berkas di PHOTO_BY_ITEM lalu jalankan ulang:
 *   node scripts/extract-price-list-images.mjs
 *   node scripts/build-menu-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const sourceDir = process.argv[2] ?? ".next/pdf-images";
const targetDir = "public/images/menu";
const MAX_WIDTH = 1100;
const QUALITY = 76;

/** id menu -> berkas gambar hasil ekstraksi. */
const PHOTO_BY_ITEM = {
  // Piringan (halaman 1: kolom kiri = minimalis, kanan = premium)
  "pi-minimalis": "p01-02-X9.jpg",
  "pi-premium": "p01-03-X13.jpg",

  // Prasmanan (halaman PDF prasmanan hanya berisi panel gelap, jadi dipakai
  // foto meja saji & aneka lauk dari halaman lain yang relevan)
  "pr-hemat": "p01-04-X5.jpg",
  "pr-premium": "p02-04-X9.jpg",
  "pr-banjar": "p02-05-X10.jpg",

  // Nasi kotak (foto latar halaman NASI KOTAK + foto hidangan piringan)
  "nk-hemat": "p04-01-X4.jpg",
  "nk-premium": "p01-01-X11.jpg",

  // Cemilan kekinian (halaman 5: baris 1 = batagor/jasuke/dimsum,
  // baris 2 = siomay/pentol mercon/kebab)
  "cm-batagor": "p05-04-X4.jpg",
  "cm-jasuke": "p05-05-X10.jpg",
  "cm-dimsum": "p05-06-X14.jpg",
  "cm-siomay": "p05-01-X8.jpg",
  "cm-pentol": "p05-03-X12.jpg",
  "cm-kebab": "p05-02-X16.jpg",

  // Aneka kue (halaman 6: baris 1 = brownis/puding/kue sus,
  // baris 2 = risol/pie buah/kue basah)
  "ku-brownis": "p06-07-X11.jpg",
  "ku-puding": "p06-06-X8.jpg",
  "ku-kue-sus": "p06-05-X14.jpg",
  "ku-risol": "p06-02-X22.jpg",
  "ku-pie-buah": "p06-04-X19.jpg",
  "ku-kue-basah": "p06-03-X25.jpg",

  // Minuman segar (halaman 7: kopi susu & es teler, thai tea & es dawet,
  // matcha & jus buah)
  "mn-kopi-susu": "p07-05-X4.jpg",
  "mn-es-teler": "p07-06-X9.jpg",
  "mn-thai-tea": "p07-03-X7.jpg",
  "mn-es-dawet": "p07-04-X11.jpg",
  "mn-matcha": "p07-01-X16.jpg",
  "mn-jus-buah": "p07-02-X18.jpg",

  // Es termos (halaman 11: sarang burung & melon, buah jadul & jeruk/sirup/teh)
  "et-sarang-burung": "p11-04-X10.jpg",
  "et-melon": "p11-03-X8.jpg",
  "et-buah-jadul": "p11-01-X4.jpg",
  "et-jeruk": "p11-02-X12.jpg",

  // Menu spesial
  "sp-rujak": "p08-01-X12.jpg",
  "sp-bakso": "p09-03-X8.jpg",
  "sp-mie-habang": "p10-03-X15.jpg",

  // Aqiqah
  "aq-kambing": "p02-07-X7.jpg",
};

fs.mkdirSync(targetDir, { recursive: true });

let written = 0;
const missing = [];

for (const [id, file] of Object.entries(PHOTO_BY_ITEM)) {
  const source = path.join(sourceDir, file);
  if (!fs.existsSync(source)) {
    missing.push(`${id} -> ${file}`);
    continue;
  }

  const target = path.join(targetDir, `${id}.jpg`);
  await sharp(source)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .flatten({ background: "#fdfbf6" })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(target);

  const { size } = fs.statSync(target);
  const meta = await sharp(target).metadata();
  written += 1;
  console.log(
    `${id.padEnd(18)} ${file.padEnd(18)} -> ${String(meta.width).padStart(4)}x${String(
      meta.height,
    ).padEnd(4)} ${String(Math.round(size / 1024)).padStart(4)}KB`,
  );
}

console.log(`\n${written} foto ditulis ke ${targetDir}`);
if (missing.length > 0) {
  console.error(`\nGambar sumber tidak ditemukan:\n${missing.join("\n")}`);
  process.exitCode = 1;
}
