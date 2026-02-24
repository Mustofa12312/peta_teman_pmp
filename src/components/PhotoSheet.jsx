// src/components/PhotoSheet.jsx
export default function PhotoSheet({ friend, onClose }) {
  if (!friend) return null;

  return (
    <div style={overlay} onClick={onClose}>
      <div style={sheet} onClick={(e) => e.stopPropagation()}>
        {/* HANDLE */}
        <div style={handle} />

        {/* FOTO */}
        {friend.fotoUrl ? (
          <img
            src={friend.fotoUrl}
            alt={friend.nama}
            style={photo}
            loading="lazy"
          />
        ) : (
          <div style={noPhoto}>Foto tidak tersedia</div>
        )}

        {/* NAMA */}
        <h2 style={name}>{friend.nama}</h2>

        {/* TOMBOL */}
        <button style={btn} onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
}

/* =======================
   🎨 STYLE
   ======================= */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.55)",
  zIndex: 1000,
  display: "flex",
  alignItems: "flex-end",
};

const sheet = {
  width: "100%",
  background: "#020617",
  borderRadius: "24px 24px 0 0",
  padding: 16,
  maxHeight: "90vh",
  overflowY: "auto",
};

const handle = {
  width: 36,
  height: 4,
  background: "#444",
  borderRadius: 999,
  margin: "0 auto 12px",
};

const photo = {
  width: "100%",
  maxHeight: "60vh",
  objectFit: "contain",
  borderRadius: 16,
  background: "#000",
};

const noPhoto = {
  height: 200,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#888",
};

const name = {
  marginTop: 12,
  marginBottom: 16,
  color: "white",
  textAlign: "center",
};

const btn = {
  width: "100%",
  padding: 14,
  borderRadius: 16,
  border: "none",
  background: "#3b82f6",
  color: "white",
  fontSize: 16,
};
