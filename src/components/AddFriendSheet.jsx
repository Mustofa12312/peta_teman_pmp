import { useState } from "react";
import { addFriend } from "../services/friends";
import { compressImage } from "../utils/compressImage";
import { uploadToCloudinary } from "../utils/uploadCloudinary";
import toast from "react-hot-toast";

export default function AddFriendSheet({ open, onClose, onSaved }) {
  const [nama, setNama] = useState("");
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [pos, setPos] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =====================
     📍 GPS
     ===================== */
  function ambilGPS() {
    if (!navigator.geolocation) {
      toast.error("GPS tidak didukung oleh browser Anda");
      return;
    }

    const toastId = toast.loading("Mencari lokasi...", { id: "gpsAdd" });

    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPos({
          lat: p.coords.latitude,
          lng: p.coords.longitude,
        });
        toast.success("Lokasi terdeteksi", { id: toastId });
      },
      () => toast.error("Gagal ambil lokasi, aktifkan GPS", { id: toastId }),
      { enableHighAccuracy: true, timeout: 15000 }
    );
  }

  /* =====================
     💾 SUBMIT (FIX FINAL)
     ===================== */
  async function submit(e) {
    e.preventDefault();

    if (!nama || !foto || !pos) {
      toast.error("Nama, foto, dan lokasi wajib diisi!", { duration: 3000 });
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
      toast.success("Berhasil menambahkan data teman!");

      // RESET FORM
      setNama("");
      setFoto(null);
      setFotoPreview(null);
      setPos(null);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengunggah wajah, file mungkin terlalu besar.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="ui-overlay" onClick={onClose}>
      <div className="ui-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="ui-drag-handle" />
        <h3 className="ui-title">MUSI MAPS</h3>

        <form onSubmit={submit}>
          <input
            placeholder="Nama Teman"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="ui-input"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFoto(file);
                setFotoPreview(URL.createObjectURL(file));
              }
            }}
            className="ui-input"
          />

          {/* FOTO PREVIEW */}
          {fotoPreview && (
            <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
              <img 
                src={fotoPreview} 
                alt="Preview" 
                style={{ height: 120, width: "auto", borderRadius: 14, border: "2px solid rgba(255,255,255,0.1)", objectFit: "contain" }} 
              />
            </div>
          )}

          <button type="button" onClick={ambilGPS} className="ui-button ui-button-ghost">
            <svg className="icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
            </svg>
            Ambil Lokasi GPS Saat Ini
          </button>

          {pos && <p className="ui-text-muted" style={{ textAlign: "center", marginTop: "12px", marginBottom: "4px" }}>✅ Lokasi tersimpan!</p>}

          <button disabled={loading} className="ui-button ui-button-primary" style={{ marginTop: "16px" }}>
            {loading ? "Menyimpan Pindai..." : "Simpan Data"}
          </button>
        </form>
      </div>
    </div>
  );
}
