/**
 * Ekstrak semua gambar dari price list PDF beserta posisi, ukuran, dan warna
 * rata-ratanya (warna dipakai untuk memeriksa apakah gambar cocok dengan menu).
 *
 * PDF-nya memakai xref klasik (bukan object stream), jadi objek dan stream bisa
 * dibaca langsung tanpa library parsing PDF. Gambar JPEG (/DCTDecode) disalin
 * apa adanya, sedangkan gambar /FlateDecode didekode manual (termasuk unfilter
 * PNG predictor) lalu dikonversi ke JPEG memakai sharp.
 *
 * Pemakaian:
 *   node scripts/extract-price-list-images.mjs "assets-src/Price list Nurmarisa Catering.pdf" .next/pdf-images
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import crypto from "node:crypto";
import sharp from "sharp";

const pdfPath = process.argv[2] ?? "assets-src/Price list Nurmarisa Catering.pdf";
const outDir = process.argv[3] ?? ".next/pdf-images";

const buf = fs.readFileSync(pdfPath);
const s = buf.toString("latin1");

/** Baca dictionary PDF mulai dari posisi tertentu (mengikuti kedalaman << >>). */
function readDict(start) {
  const open = s.indexOf("<<", start);
  if (open === -1 || open - start > 4) return null;
  let depth = 0;
  let i = open;
  while (i < s.length) {
    if (s[i] === "<" && s[i + 1] === "<") {
      depth += 1;
      i += 2;
      continue;
    }
    if (s[i] === ">" && s[i + 1] === ">") {
      depth -= 1;
      i += 2;
      if (depth === 0) return { start: open, end: i, text: s.slice(open, i) };
      continue;
    }
    i += 1;
  }
  return null;
}

/** Indeks semua objek top-level: nomor objek -> dictionary + rentang stream. */
const objects = new Map();
const objRe = /(\d+)\s+0\s+obj\b/g;
let match;
while ((match = objRe.exec(s))) {
  const num = Number(match[1]);
  const bodyStart = match.index + match[0].length;
  const dict = readDict(bodyStart);
  if (!dict) continue;

  let streamStart = -1;
  let streamEnd = -1;
  const streamKeyword = s.indexOf("stream", dict.end);
  const endobj = s.indexOf("endobj", dict.end);

  if (streamKeyword !== -1 && (endobj === -1 || streamKeyword < endobj)) {
    streamStart = streamKeyword + "stream".length;
    if (s[streamStart] === "\r") streamStart += 1;
    if (s[streamStart] === "\n") streamStart += 1;

    const directLength = /\/Length\s+(\d+)(?!\s+0\s+R)/.exec(dict.text);
    streamEnd = directLength
      ? streamStart + Number(directLength[1])
      : s.indexOf("endstream", streamStart);
  }

  objects.set(num, { num, dict: dict.text, streamStart, streamEnd });
}

const refOf = (text, key) => {
  const found = new RegExp(`/${key}\\s+(\\d+)\\s+0\\s+R`).exec(text);
  return found ? Number(found[1]) : null;
};

const refsOf = (text, key) => {
  const arrayMatch = new RegExp(`/${key}\\s*\\[([^\\]]*)\\]`).exec(text);
  if (!arrayMatch) return [];
  return [...arrayMatch[1].matchAll(/(\d+)\s+0\s+R/g)].map((m) => Number(m[1]));
};

const numberOf = (text, key) => {
  const found = new RegExp(`/${key}\\s+(\\d+)`).exec(text);
  return found ? Number(found[1]) : null;
};

const nameOf = (text, key) => {
  const found = new RegExp(`/${key}\\s*/([A-Za-z0-9#._-]+)`).exec(text);
  return found ? found[1] : null;
};

/** Isi stream mentah sebuah objek. */
function rawStream(obj) {
  if (obj.streamStart < 0 || obj.streamEnd < 0) return null;
  return buf.subarray(obj.streamStart, obj.streamEnd);
}

/** Isi stream setelah didekompresi (FlateDecode). */
function inflatedStream(obj) {
  const raw = rawStream(obj);
  if (!raw) return null;
  if (!/FlateDecode/.test(obj.dict)) return raw;
  try {
    return zlib.inflateSync(raw);
  } catch {
    return null;
  }
}

function textOf(obj) {
  const data = inflatedStream(obj);
  return data ? data.toString("latin1") : "";
}

/** Peta nama XObject -> nomor objek dari dictionary halaman/form. */
function xobjectsOf(dictText) {
  let text = dictText;
  const resourceRef = refOf(dictText, "Resources");
  if (resourceRef) {
    const resourceObj = objects.get(resourceRef);
    if (resourceObj) text = resourceObj.dict;
  }

  const map = {};
  const inline = /\/XObject\s*<<([^>]*)>>/.exec(text);
  if (inline) {
    for (const m of inline[1].matchAll(/\/([A-Za-z0-9#._-]+)\s+(\d+)\s+0\s+R/g)) {
      map[m[1]] = Number(m[2]);
    }
    return map;
  }

  const indirect = refOf(text, "XObject");
  if (indirect) {
    const xobjDict = objects.get(indirect);
    if (xobjDict) {
      for (const m of xobjDict.dict.matchAll(/\/([A-Za-z0-9#._-]+)\s+(\d+)\s+0\s+R/g)) {
        map[m[1]] = Number(m[2]);
      }
    }
  }
  return map;
}

/** Cari operasi gambar (`/Nama Do`) di content stream beserta posisi/ukurannya. */
function findImages(content, xobjects) {
  const tokens = content.match(/\/[A-Za-z0-9#._-]+|[-+]?[\d.]+|cm|Do|q|Q/g) ?? [];
  const placements = [];
  let pendingNumbers = [];
  let ctm = [1, 0, 0, 1, 0, 0];
  const matrixStack = [];
  let lastName = null;

  for (const token of tokens) {
    if (/^[-+]?[\d.]+$/.test(token)) {
      pendingNumbers.push(Number(token));
      continue;
    }
    if (token.startsWith("/")) {
      lastName = token.slice(1);
      pendingNumbers = [];
      continue;
    }
    if (token === "cm") {
      if (pendingNumbers.length >= 6) ctm = pendingNumbers.slice(-6);
      pendingNumbers = [];
      continue;
    }
    if (token === "q") {
      matrixStack.push([...ctm]);
      pendingNumbers = [];
      continue;
    }
    if (token === "Q") {
      const popped = matrixStack.pop();
      if (popped) ctm = popped;
      pendingNumbers = [];
      continue;
    }
    if (token === "Do") {
      if (lastName && xobjects[lastName]) {
        placements.push({
          name: lastName,
          objNum: xobjects[lastName],
          x: ctm[4],
          y: ctm[5],
          width: Math.abs(ctm[0]),
          height: Math.abs(ctm[3]),
        });
      }
      pendingNumbers = [];
      continue;
    }
    pendingNumbers = [];
  }

  return placements;
}

/** Telusuri gambar sampai ke dalam Form XObject (desain halaman dibungkus form). */
function collectPlacements(content, xobjects, offset, scale, depth, out) {
  if (depth > 6) return out;

  for (const placement of findImages(content, xobjects)) {
    const target = objects.get(placement.objNum);
    if (!target) continue;

    const x = offset.x + placement.x * scale;
    const y = offset.y + placement.y * scale;

    if (/\/Subtype\s*\/Form/.test(target.dict)) {
      const matrix = /\/Matrix\s*\[([^\]]*)\]/.exec(target.dict);
      const values = matrix ? matrix[1].trim().split(/\s+/).map(Number) : [1, 0, 0, 1, 0, 0];
      collectPlacements(
        textOf(target),
        xobjectsOf(target.dict),
        { x: x + (values[4] || 0) * scale, y: y + (values[5] || 0) * scale },
        scale * Math.abs(values[0] || 1),
        depth + 1,
        out,
      );
      continue;
    }

    out.push({
      name: placement.name,
      objNum: placement.objNum,
      x,
      y,
      width: placement.width * scale,
      height: placement.height * scale,
    });
  }

  return out;
}

/** Kumpulkan objek halaman sesuai urutan page tree. */
function collectPages() {
  let catalog = null;
  for (const obj of objects.values()) {
    if (/\/Type\s*\/Catalog/.test(obj.dict)) {
      catalog = obj;
      break;
    }
  }

  const pages = [];
  const visit = (num, depth = 0) => {
    if (depth > 12 || !num) return;
    const obj = objects.get(num);
    if (!obj) return;
    if (/\/Type\s*\/Page\b/.test(obj.dict)) {
      pages.push(obj);
      return;
    }
    for (const kid of refsOf(obj.dict, "Kids")) visit(kid, depth + 1);
  };

  const pagesRoot = catalog ? refOf(catalog.dict, "Pages") : null;
  if (pagesRoot) visit(pagesRoot);

  if (pages.length === 0) {
    for (const obj of objects.values()) {
      if (/\/Type\s*\/Page\b/.test(obj.dict)) pages.push(obj);
    }
    pages.sort((a, b) => a.num - b.num);
  }
  return pages;
}

/** Batalkan filter PNG predictor (predictor >= 10) pada data gambar Flate. */
function unfilterPng(data, width, height, channels) {
  const bpp = channels;
  const stride = width * channels;
  const out = Buffer.alloc(height * stride);
  const zero = Buffer.alloc(stride);
  let pos = 0;

  for (let y = 0; y < height; y += 1) {
    const filter = data[pos];
    pos += 1;
    const row = data.subarray(pos, pos + stride);
    pos += stride;
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : zero;
    const cur = out.subarray(y * stride, (y + 1) * stride);

    for (let i = 0; i < stride; i += 1) {
      const a = i >= bpp ? cur[i - bpp] : 0;
      const b = prev[i];
      const c = i >= bpp ? prev[i - bpp] : 0;
      const x = row[i];
      let value;
      switch (filter) {
        case 1:
          value = x + a;
          break;
        case 2:
          value = x + b;
          break;
        case 3:
          value = x + ((a + b) >> 1);
          break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          value = x + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
          break;
        }
        default:
          value = x;
      }
      cur[i] = value & 0xff;
    }
  }
  return out;
}

const hex = (rgb) => `#${rgb.map((v) => v.toString(16).padStart(2, "0")).join("")}`;

function hueOf([r, g, b]) {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const delta = max - min;
  if (delta === 0) return { hue: 0, sat: 0 };
  let hue;
  if (max === r / 255) hue = ((g - b) / 255 / delta) % 6;
  else if (max === g / 255) hue = (b - r) / 255 / delta + 2;
  else hue = (r - g) / 255 / delta + 4;
  hue *= 60;
  if (hue < 0) hue += 360;
  return {
    hue: Math.round(hue),
    sat: Math.round((delta / (max || 1)) * 100),
  };
}

/**
 * Ringkasan warna gambar: rata-rata seluruh gambar dan rata-rata bagian tengah.
 * Dipakai untuk memeriksa apakah gambar cocok dengan nama menunya
 * (mis. matcha hijau, es jeruk oranye, brownis coklat gelap).
 */
async function colorProfile(file) {
  try {
    const meta = await sharp(file).metadata();
    const { data: whole } = await sharp(file)
      .resize(1, 1, { fit: "fill" })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = meta.width ?? 0;
    const height = meta.height ?? 0;
    const { data: center } = await sharp(file)
      .extract({
        left: Math.round(width * 0.28),
        top: Math.round(height * 0.28),
        width: Math.max(1, Math.round(width * 0.44)),
        height: Math.max(1, Math.round(height * 0.44)),
      })
      .resize(1, 1, { fit: "fill" })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const stats = await sharp(file).stats();
    const spread = Math.max(...stats.channels.map((channel) => channel.stdev));
    const { hue, sat } = hueOf([center[0], center[1], center[2]]);

    return {
      averageColor: hex([whole[0], whole[1], whole[2]]),
      centerColor: hex([center[0], center[1], center[2]]),
      centerHue: hue,
      centerSat: sat,
      spread: Math.round(spread),
    };
  } catch {
    return {
      averageColor: null,
      centerColor: null,
      centerHue: null,
      centerSat: null,
      spread: null,
    };
  }
}

/** Tulis gambar: JPEG disalin langsung, Flate didekode lalu dijadikan JPEG. */
async function writeImage(bytes, dict, file) {
  if (/\/DCTDecode/.test(dict)) {
    fs.writeFileSync(file, bytes);
    return "jpeg";
  }

  if (!/FlateDecode/.test(dict)) return null;
  if (/\/ImageMask\s+true/.test(dict)) return null;

  const width = numberOf(dict, "Width");
  const height = numberOf(dict, "Height");
  const bits = numberOf(dict, "BitsPerComponent") ?? 8;
  const colorSpace = nameOf(dict, "ColorSpace") ?? "DeviceRGB";
  const channels = { DeviceGray: 1, DeviceRGB: 3, DeviceCMYK: 4 }[colorSpace];
  if (!width || !height || bits !== 8 || !channels) return null;

  let raw;
  try {
    raw = zlib.inflateSync(bytes);
  } catch {
    return null;
  }

  const predictor = Number(/\/Predictor\s+(\d+)/.exec(dict)?.[1] ?? 1);
  if (predictor >= 10) raw = unfilterPng(raw, width, height, channels);
  if (raw.length < width * height * channels) return null;

  try {
    await sharp(raw, { raw: { width, height, channels } })
      .jpeg({ quality: 92 })
      .toFile(file);
    return "flate";
  } catch {
    return null;
  }
}

const pages = collectPages();
fs.mkdirSync(outDir, { recursive: true });
for (const entry of fs.readdirSync(outDir)) {
  if (entry.endsWith(".jpg")) fs.unlinkSync(path.join(outDir, entry));
}

const manifest = [];
const seen = new Map();

for (const [pageIndex, pageObj] of pages.entries()) {
  const xobjects = xobjectsOf(pageObj.dict);
  const contentsRefs = [...refsOf(pageObj.dict, "Contents")];
  const single = refOf(pageObj.dict, "Contents");
  if (single) contentsRefs.push(single);

  const content = contentsRefs
    .map((num) => {
      const obj = objects.get(num);
      return obj ? textOf(obj) : "";
    })
    .join("\n");

  const placements = collectPlacements(content, xobjects, { x: 0, y: 0 }, 1, 0, []);

  // Urutkan seperti dibaca manusia: baris atas dulu, lalu kiri ke kanan.
  placements.sort((a, b) => (Math.abs(a.y - b.y) < 12 ? a.x - b.x : b.y - a.y));

  let index = 0;
  for (const placement of placements) {
    const imageObj = objects.get(placement.objNum);
    if (!imageObj || !/\/Subtype\s*\/Image/.test(imageObj.dict)) continue;

    const bytes = rawStream(imageObj);
    const pixelWidth = numberOf(imageObj.dict, "Width") ?? 0;
    const pixelHeight = numberOf(imageObj.dict, "Height") ?? 0;
    if (!bytes || pixelWidth < 120 || pixelHeight < 120) continue;

    const hash = crypto.createHash("sha1").update(bytes).digest("hex").slice(0, 10);
    const duplicateOf = seen.get(hash) ?? null;
    seen.set(hash, `p${pageIndex + 1}/${placement.name}`);

    index += 1;
    const file = path.join(
      outDir,
      `p${String(pageIndex + 1).padStart(2, "0")}-${String(index).padStart(2, "0")}-${placement.name}.jpg`,
    );
    const kind = await writeImage(bytes, imageObj.dict, file);
    if (!kind) {
      index -= 1;
      continue;
    }

    const colors = await colorProfile(file);

    manifest.push({
      page: pageIndex + 1,
      file: path.basename(file),
      kind,
      x: Math.round(placement.x),
      y: Math.round(placement.y),
      drawWidth: Math.round(placement.width),
      drawHeight: Math.round(placement.height),
      pixelWidth,
      pixelHeight,
      bytes: bytes.length,
      ...colors,
      maybeBackground: pixelWidth * pixelHeight > 6_000_000,
      duplicateOf,
    });
  }
}

fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));

console.log(`Halaman: ${pages.length} · gambar tersimpan: ${manifest.length}`);
console.log(`Output: ${outDir}\n`);

for (const entry of manifest) {
  console.log(
    [
      `p${String(entry.page).padStart(2, "0")}`,
      entry.kind.padEnd(5),
      `pos(${String(entry.x).padStart(6)},${String(entry.y).padStart(5)})`,
      `${String(entry.drawWidth).padStart(5)}x${String(entry.drawHeight).padEnd(5)}`,
      `px ${entry.pixelWidth}x${entry.pixelHeight}`.padEnd(18),
      `${String(Math.round(entry.bytes / 1024)).padStart(4)}KB`,
      `avg ${entry.averageColor ?? "-"}`,
      `tengah ${entry.centerColor ?? "-"} h${String(entry.centerHue ?? "-").padStart(3)} s${String(entry.centerSat ?? "-").padStart(3)}`,
      `sebar ${String(entry.spread ?? "-").padStart(3)}`,
      entry.maybeBackground ? "LATAR" : "     ",
      entry.duplicateOf ? `dup:${entry.duplicateOf}` : "",
      entry.file,
    ].join("  "),
  );
}
