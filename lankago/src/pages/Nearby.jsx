import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import BottomNavbar from "../components/BottomNav";

const icon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function NearbyMapPage() {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [filter, setFilter] = useState("restaurant");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  

  const fetchPlaces = async (lat, lng, type) => {
    setLoading(true);

   let query;

switch (type) {
  case "restaurant":
    query = `node(around:3000,${lat},${lng})[amenity=restaurant];`;
    break;

  case "temple":
    query = `node(around:3000,${lat},${lng})[amenity=place_of_worship];`;
    break;

  case "beach":
    query = `node(around:3000,${lat},${lng})[natural=beach];`;
    break;

  default:
    query = `
      node(around:3000,${lat},${lng})[amenity];
      node(around:3000,${lat},${lng})[tourism];
    `;
    break;
}

    const res = await axios.post(
      "https://overpass-api.de/api/interpreter",
      `[out:json];(${query});out;`,
      { headers: { "Content-Type": "text/plain" } }
    );

    const data = res.data.elements.map((item) => ({
      id: item.id,
      name: item.tags.name || "Unknown",
      lat: item.lat,
      lng: item.lon,
      type: item.tags.amenity || item.tags.tourism || "place",
    }));

    setPlaces(data);
    setLoading(false);
  };

 useEffect(() => {
  if (!userLocation) return;

  const loadPlaces = async () => {
    await fetchPlaces(userLocation.lat, userLocation.lng, filter);
  };

  loadPlaces();
}, [userLocation, filter]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  if (!userLocation)
    return (
      <p className="text-center mt-10 text-gray-500">
        📍 Getting your location...
      </p>
    );

  return (
  <div className="flex flex-col md:flex-row h-screen font-sans">

    {/* LEFT PANEL */}
    <div className="
      w-full md:w-[30%]
      p-6 bg-gray-100
      overflow-auto
      h-[45vh] md:h-screen
    ">

      <h2 className="text-3xl font-bold text-green-700 mb-5">
        Nearby Places
      </h2>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-2 mb-4">

        <button
          onClick={() => setFilter("restaurant")}
          className={`px-3 py-2 text-sm rounded-full border transition ${
            filter === "restaurant"
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          🍽️ Restaurant
        </button>

        <button
          onClick={() => setFilter("temple")}
          className={`px-3 py-2 text-sm rounded-full border transition ${
            filter === "temple"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          🛕 Temple
        </button>

        <button
          onClick={() => setFilter("beach")}
          className={`px-3 py-2 text-sm rounded-full border transition ${
            filter === "beach"
              ? "bg-yellow-400 text-black border-yellow-400"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          🏖️ Beach
        </button>

        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-2 text-sm rounded-full border transition ${
            filter === "all"
              ? "bg-green-500 text-white border-green-500"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          🌍 All
        </button>

      </div>

      <hr className="mb-3" />

      {loading && (
        <p className="text-gray-500">Loading places...</p>
      )}

      {/* LIST */}
      <div className="space-y-3">
        {places.map((p) => (
          <div
            key={p.id}
            className="bg-white p-3 rounded-lg shadow hover:shadow-md transition"
          >
            <b className="text-gray-800">{p.name}</b>

            <p className="text-sm text-gray-600">
              📍{" "}
              {getDistance(
                userLocation.lat,
                userLocation.lng,
                p.lat,
                p.lng
              ).toFixed(2)} km
            </p>

            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {p.type}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* MAP SECTION */}
    <div className="w-full md:w-[70%] flex flex-col h-[55vh] md:h-full">

      {/* MAP */}
      <div className="flex-1 ">
        <MapContainer
          center={userLocation}
          zoom={14}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={userLocation} icon={icon}>
            <Popup>You are here 📍</Popup>
          </Marker>

          {places.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
              <Popup>
                <b>{p.name}</b>
                <br />
                {p.type}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* BOTTOM NAVBAR */}
      <div className="h-[60px] w-full">
        <BottomNavbar />
      </div>

    </div>

  </div>
);
}