import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/** Gambar pratinjau yang muncul saat alamat website dibagikan di WhatsApp,
 *  Instagram, atau media sosial lain. Warnanya sengaja sama dengan situs:
 *  hijau cerah, krem, dan aksen emas, tanpa gradient. */
export const alt = `${site.name}: catering piringan, prasmanan, dan nasi kotak di ${site.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const packages = [
  "Piringan",
  "Prasmanan",
  "Nasi Kotak",
  "Cemilan",
  "Aqiqah",
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#085e42",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Ornamen bulat warna solid, bukan gradient */}
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -120,
            width: 420,
            height: 420,
            borderRadius: 9999,
            backgroundColor: "#0d6b4a",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: -140,
            width: 420,
            height: 420,
            backgroundColor: "#0d6b4a",
            borderRadius: 9999,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              color: "#e3c884",
              textTransform: "uppercase",
            }}
          >
            Catering {site.city}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 86,
              lineHeight: 1.05,
              color: "#fdfbf6",
              fontWeight: 700,
              maxWidth: 900,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 38,
              lineHeight: 1.25,
              color: "#c9ecdb",
              maxWidth: 880,
            }}
          >
            Masakan rumahan untuk resepsi, rapat, syukuran, dan aqiqah.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            {packages.map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  marginRight: 14,
                  padding: "12px 26px",
                  borderRadius: 9999,
                  border: "2px solid #117850",
                  backgroundColor: "#0d6b4a",
                  color: "#fdfbf6",
                  fontSize: 24,
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 26,
              color: "#d4ae57",
            }}
          >
            {site.addressShort} · {site.phoneLabel}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
