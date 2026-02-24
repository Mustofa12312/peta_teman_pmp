import { useEffect, useState, useCallback } from "react";
import { fetchFriends } from "./services/friends";

import MapView from "./components/MapView";
import PhotoSheet from "./components/PhotoSheet";
import AddFriendSheet from "./components/AddFriendSheet";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

  // 📍 GPS pin untuk map
  const [gpsPin, setGpsPin] = useState(null);

  /* =====================
     🔥 LOAD / RELOAD FIRESTORE
     ===================== */
  const loadFriends = useCallback(async () => {
    try {
      const list = await fetchFriends();
      setFriends(list);
    } catch (err) {
      console.error("Gagal load friends:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // load pertama kali
  useEffect(() => {
    loadFriends();
  }, [loadFriends]);

  /* =====================
     📍 GPS HANDLER
     ===================== */
  function handleGPS() {
    if (!navigator.geolocation) {
      alert("GPS tidak didukung di perangkat ini");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // reset dulu supaya Leaflet pasti update
        setGpsPin(null);

        setTimeout(() => {
          setGpsPin({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        }, 50);
      },
      (err) => {
        console.error(err);
        alert(
          err.code === 1 ? "Izin lokasi ditolak" : "Gagal mengambil lokasi GPS"
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }

  /* =====================
     ⏳ LOADING
     ===================== */
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          background: "#0b0f17",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui",
        }}
      >
        <h2>Memuat peta…</h2>
      </div>
    );
  }

  return (
    <>
      {/* 🗺️ MAP */}
      <MapView friends={friends} gpsPin={gpsPin} onSelect={setSelectedFriend} />

      {/* 🖼️ FOTO BESAR */}
      <PhotoSheet
        friend={selectedFriend}
        onClose={() => setSelectedFriend(null)}
      />

      {/* ➕ ADD FRIEND (INI KUNCI) */}
      <AddFriendSheet
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSaved={loadFriends} // 🔥 WAJIB
      />

      {/* 📱 BOTTOM NAV */}
      <BottomNav onAdd={() => setOpenAdd(true)} onGPS={handleGPS} />
    </>
  );
}
