export default function BottomNav({ onAdd, onGPS }) {
  return (
    <div style={wrapper}>
      {/* BAR */}
      <div style={bar}>
        {/* HOME / MAP */}
        <button style={iconBtn} aria-label="Peta">
          🗺️
        </button>

        {/* SPACER TENGAH (RUANG FAB) */}
        <div style={{ width: 56 }} />

        {/* GPS */}
        <button style={iconBtn} aria-label="GPS" onClick={onGPS}>
          📍
        </button>
      </div>

      {/* FAB (ADD FRIEND) */}
      <button style={fab} onClick={onAdd} aria-label="Tambah teman">
        +
      </button>
    </div>
  );
}

/* =====================
   STYLES
===================== */

const wrapper = {
  position: "fixed",
  left: 0,
  right: 0,

  // 🔥 INI KUNCI iOS
  bottom: "env(safe-area-inset-bottom)",

  padding: "12px 16px",
  display: "flex",
  justifyContent: "center",
  zIndex: 900,
};

const bar = {
  position: "relative",
  width: "100%",
  maxWidth: 420,
  height: 64,

  background: "rgba(15,23,42,.9)",
  backdropFilter: "blur(18px)",

  borderRadius: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 28px",

  boxShadow: "0 12px 30px rgba(0,0,0,.45)",
};

const iconBtn = {
  background: "none",
  border: "none",
  color: "white",
  fontSize: 22,
  opacity: 0.85,
  cursor: "pointer",
};

const fab = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",

  // 🔥 naik dari safe area
  bottom: "calc(32px + env(safe-area-inset-bottom))",

  width: 60,
  height: 60,
  borderRadius: "50%",
  background: "#3b82f6",
  color: "white",
  fontSize: 34,
  border: "none",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  boxShadow: "0 16px 32px rgba(59,130,246,.55)",
  zIndex: 2,
};
