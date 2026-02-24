// src/components/PhotoSheet.jsx
export default function PhotoSheet({ friend, onClose }) {
  if (!friend) return null;

  return (
    <div className="ui-overlay" onClick={onClose}>
      <div className="ui-sheet" onClick={(e) => e.stopPropagation()}>
        {/* HANDLE */}
        <div className="ui-drag-handle" />

        {/* FOTO */}
        <div style={{ position: "relative", width: "100%", borderRadius: "16px", overflow: "hidden", background: "#000", display: "flex", justifyContent: "center" }}>
          {friend.fotoUrl ? (
            <img
              src={friend.fotoUrl}
              alt={friend.nama}
              style={{ width: "100%", maxHeight: "60vh", objectFit: "contain" }}
              loading="lazy"
            />
          ) : (
            <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>Foto tidak tersedia</div>
          )}
        </div>

        {/* NAMA */}
        <h2 className="ui-title" style={{ marginTop: "24px" }}>{friend.nama}</h2>

        {/* TOMBOL */}
        <button className="ui-button ui-button-primary" onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
}
