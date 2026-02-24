export default function BottomNav({ onAdd, onGPS }) {
  return (
    <div className="bottom-nav-container">
      {/* BAR */}
      <div className="bottom-nav-bar">
        {/* HOME / MAP */}
        <button className="bottom-nav-icon active" aria-label="Peta">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
          </svg>
        </button>

        {/* SPACER TENGAH (RUANG FAB) */}
        <div style={{ width: 56 }} />

        {/* GPS */}
        <button className="bottom-nav-icon" aria-label="GPS" onClick={onGPS}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
          </svg>
        </button>
      </div>

      {/* FAB (ADD FRIEND) */}
      <button className="bottom-nav-fab" onClick={onAdd} aria-label="Tambah teman">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      </button>
    </div>
  );
}
