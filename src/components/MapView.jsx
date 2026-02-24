import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* =====================
   FIX ICON
   ===================== */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* =====================
   KOMPONEN MARKER TEMAN
   ===================== */
function FriendMarker({ friend, onSelect }) {
  const map = useMap();

  return (
    <Marker
      position={[friend.lat, friend.lng]}
      eventHandlers={{
        click: () => {
          map.flyTo([friend.lat, friend.lng], 16, {
            animate: true,
            duration: 0.7,
          });
          onSelect(friend);
        },
      }}
    >
      <Tooltip permanent direction="top" offset={[0, -10]} opacity={1}>
        <span style={nameLabel}>{friend.nama}</span>
      </Tooltip>
    </Marker>
  );
}

/* =====================
   MAP UTAMA
   ===================== */
export default function MapView({ friends, onSelect, gpsPin }) {
  return (
    <MapContainer
      center={[-2.5, 118]}
      zoom={5}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* MARKER TEMAN */}
      {friends.map((f) => (
        <FriendMarker key={f.id} friend={f} onSelect={onSelect} />
      ))}

      {/* MARKER GPS */}
      {gpsPin && (
        <Marker position={[gpsPin.lat, gpsPin.lng]}>
          <Tooltip permanent direction="top" offset={[0, -10]}>
            <span style={gpsLabel}>Lokasi Anda</span>
          </Tooltip>
        </Marker>
      )}
    </MapContainer>
  );
}

/* =====================
   STYLE
   ===================== */
const nameLabel = {
  fontSize: 12,
  fontWeight: 600,
  color: "#111",
  background: "white",
  padding: "2px 6px",
  borderRadius: 6,
  boxShadow: "0 2px 6px rgba(0,0,0,.25)",
  whiteSpace: "nowrap",
};

const gpsLabel = {
  ...nameLabel,
  background: "#3b82f6",
  color: "white",
};
