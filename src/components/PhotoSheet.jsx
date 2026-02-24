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
        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <button className="ui-button ui-button-ghost" onClick={onClose} style={{ flex: 1 }}>
            Tutup
          </button>
          
          <button 
            className="ui-button ui-button-primary" 
            style={{ flex: 1 }}
            onClick={() => {
              const url = `https://www.google.com/maps/dir/?api=1&destination=${friend.lat},${friend.lng}`;
              window.open(url, "_blank");
            }}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style={{marginRight: "6px"}}>
              <path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"/>
            </svg>
            Google Maps
          </button>
        </div>
      </div>
    </div>
  );
}
