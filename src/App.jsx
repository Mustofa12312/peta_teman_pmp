import { useEffect, useState, useCallback } from "react";
import { fetchFriends } from "./services/friends";
import { Toaster, toast } from "react-hot-toast";

import MapView from "./components/MapView";
import PhotoSheet from "./components/PhotoSheet";
import AddFriendSheet from "./components/AddFriendSheet";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
      toast.error("GPS tidak didukung di perangkat ini");
      return;
    }

    const toastId = toast.loading("Mencari lokasi...", { id: "gps" });

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // reset dulu supaya Leaflet pasti update
        setGpsPin(null);

        setTimeout(() => {
          setGpsPin({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          toast.success("Area lokasi Anda ditemukan!", { id: toastId });
        }, 50);
      },
      (err) => {
        console.error(err);
        toast.error(
          err.code === 1 ? "Izin lokasi ditolak" : "Gagal mengambil lokasi GPS", 
          { id: toastId }
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
      <div className="loading-screen">
        <h2>Memuat peta...</h2>
      </div>
    );
  }

  const filteredFriends = friends.filter((f) =>
    f.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* 🔔 TOASTER NOTIFICATION */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)'
          },
        }} 
      />

      {/* 🔍 SEARCH BAR FLOATING */}
      <div className="search-bar-container">
        <input 
          type="search" 
          placeholder="🔍 Tulis nama teman..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ui-input search-input"
        />
      </div>

      {/* 🗺️ MAP */}
      <MapView friends={filteredFriends} gpsPin={gpsPin} onSelect={setSelectedFriend} />

      {/* 🖼️ FOTO BESAR */}
      <PhotoSheet
        friend={selectedFriend}
        onClose={() => setSelectedFriend(null)}
        onDeleted={() => {
          setSelectedFriend(null);
          loadFriends();
        }}
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
