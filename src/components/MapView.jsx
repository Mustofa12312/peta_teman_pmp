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
      <Tooltip permanent direction="top" offset={[0, -10]} opacity={1} className="custom-map-tooltip">
        <span>{friend.nama}</span>
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
      style={{ height: "100vh", width: "100vw", zIndex: 0 }}
      zoomControl={false} /* Better positioning using custom if needed, or disable mobile */
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" /* Use modern map tiles */
      />

      {/* MARKER TEMAN */}
      {friends.map((f) => (
        <FriendMarker key={f.id} friend={f} onSelect={onSelect} />
      ))}

      {/* MARKER GPS */}
      {gpsPin && (
        <Marker position={[gpsPin.lat, gpsPin.lng]}>
          <Tooltip permanent direction="top" offset={[0, -10]} className="custom-map-tooltip" style={{border: "1px solid #3b82f6 !important"}}>
            <span style={{ color: "#60a5fa"}}>📍 Lokasi Anda</span>
          </Tooltip>
        </Marker>
      )}
    </MapContainer>
  );
}
