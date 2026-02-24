import { useState } from "react";
import { addFriend } from "../services/friends";
import { compressImage } from "../utils/compressImage";
import { uploadToCloudinary } from "../utils/uploadCloudinary";

export default function AddFriendSheet({ open, onClose, onSaved }) {
  const [nama, setNama] = useState("");
  const [foto, setFoto] = useState(null);
  const [pos, setPos] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =====================
     📍 GPS
     ===================== */
  function ambilGPS() {
    if (!navigator.geolocation) {
      alert("GPS tidak didukung");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPos({
          lat: p.coords.latitude,
          lng: p.coords.longitude,
        });
      },
      () => alert("Gagal ambil lokasi, aktifkan GPS"),
      { enableHighAccuracy: true, timeout: 15000 }
    );
  }

  /* =====================
     💾 SUBMIT (FIX FINAL)
     ===================== */
  async function submit(e) {
    e.preventDefault();

    if (!nama || !foto || !pos) {
      alert("Nama, foto, dan lokasi wajib");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ KOMPRES FOTO
      const compressed = await compressImage(foto, {
        maxSize: 1200,
        quality: 0.7,
      });

      // 2️⃣ UPLOAD KE CLOUDINARY (URL HTTPS)
      const fotoUrl = await uploadToCloudinary(compressed);

      // 3️⃣ SIMPAN KE FIRESTORE
      await addFriend({
        nama: nama.trim(),
        lat: pos.lat,
        lng: pos.lng,
        fotoUrl,
      });

      // 🔥 INI KUNCI UTAMA
      onSaved?.();

      // RESET FORM
      setNama("");
      setFoto(null);
      setPos(null);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Upload gagal");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div style={overlay} onClick={onClose}>
      <div style={sheet} onClick={(e) => e.stopPropagation()}>
        <div style={handle} />
        <h3 style={{ marginBottom: 8 }}>MUSI MAPS</h3>

        <form onSubmit={submit}>
          <input
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={input}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
            style={input}
          />

          <button type="button" onClick={ambilGPS} style={btnGhost}>
            📍 Ambil GPS
          </button>

          {pos && <p style={{ fontSize: 12 }}>Lokasi siap ✓</p>}

          <button disabled={loading} style={btnPrimary}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* =====================
   🎨 STYLE
   ===================== */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.45)",
  zIndex: 1000,
};

const sheet = {
  position: "absolute",
  bottom: 0,
  width: "100%",
  background: "#0f172a",
  padding: 16,
  borderRadius: "22px 22px 0 0",
};

const handle = {
  width: 36,
  height: 4,
  background: "#555",
  borderRadius: 999,
  margin: "0 auto 12px",
};

const input = {
  width: "100%",
  padding: 12,
  marginTop: 10,
  borderRadius: 14,
  background: "#020617",
  color: "white",
  border: "1px solid #333",
};

const btnPrimary = {
  marginTop: 14,
  padding: 14,
  width: "100%",
  borderRadius: 16,
  background: "#3b82f6",
  color: "white",
  border: "none",
};

const btnGhost = {
  marginTop: 10,
  padding: 12,
  width: "100%",
  borderRadius: 14,
  background: "transparent",
  color: "white",
  border: "1px solid #333",
};
