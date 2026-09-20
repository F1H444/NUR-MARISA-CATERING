import { writeFile } from "node:fs/promises";
import path from "node:path";

/** Nama berkas jawaban di root project. */
export const DATA_FILE = "isi-data.json";

/**
 * Menyimpan jawaban form isi data ke berkas di root project, supaya isinya
 * bisa langsung dipakai untuk memperbarui website.
 *
 * Sengaja hanya aktif di mode development: kalau website ini sudah dipasang di
 * server (mode production), alamat ini balas 404 dan tidak bisa menulis apa pun.
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ ok: false, message: "Tidak tersedia." }, { status: 404 });
  }

  try {
    const payload: unknown = await request.json();
    const serialized = JSON.stringify(payload, null, 2);

    if (serialized.length > 200_000) {
      return Response.json({ ok: false, message: "Datanya terlalu besar." }, { status: 413 });
    }

    await writeFile(path.join(process.cwd(), DATA_FILE), `${serialized}\n`, "utf8");

    return Response.json({ ok: true, file: DATA_FILE });
  } catch {
    return Response.json({ ok: false, message: "Gagal menyimpan berkas." }, { status: 500 });
  }
}
