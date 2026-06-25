import { FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getPlaceById } from "../services/api";
import { useState, useEffect } from "react";
import { LuSend } from "react-icons/lu";

export default function Details({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    async function loadPlace() {
      const data = await getPlaceById(id);
      setPlaces(data);
      setLoading(false);
    }

    loadPlace();
  }, [id]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(1);
  }

  const distance = userLocation
    ? calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        places.latitude,
        places.longitude,
      )
    : null;

    const openMap = (lat, lng) => {
  window.open(
    `https://www.google.com/maps?q=${lat},${lng}`,
    "_blank"
  );
};

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-bold text-green-600">Loading...</h1>
      </div>
    );
  }
  const isFavorite = favorites.includes(Number(places.id));
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="relative">
        <img
          src={places.image}
          alt={places.name}
          className="w-full h-80 object-cover hover:scale-100 transition duration-500 "
        />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 text-black  text-bold text-2xl bg-white rounded-full p-2 shadow transition duration-300 hover:scale-125"
        >
          ←
        </button>

        <button
          onClick={() => {
            console.log("clicked", places.id);
            toggleFavorite(Number(places.id));
          }}
          className="absolute top-6 right-5 text-3xl transition duration-300 hover:scale-125"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        {/* Dots */}

        {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <span className="w-2 h-2 bg-white rounded-full"></span>

          <span className="w-2 h-2 bg-gray-300 rounded-full"></span>

          <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
        </div>
      </div> */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[1, 2, 3].map((dot) => (
            <span
              key={dot}
              className={`w-3 h-3 rounded-full ${
                dot === 1 ? "bg-white" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">{places.name}</h1>

          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-medium">
            {places.category}
          </span>
        </div>

        <p className="text-yellow-500 mt-3 font-semibold">
          ⭐ {places.rating}
          <span className="text-gray-400 ml-1">({places.reviews} Reviews)</span>
        </p>

        <p className="text-gray-700 mt-5 leading-8 text-lg">
          {places.description}
        </p>

        <div className="flex items-center gap-2 mt-5">
          <FaMapMarkerAlt className="text-green-600" />

          <p className="font-medium">{places.location}</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-5 mt-6 flex justify-between items-center shadow-sm hover:shadow-lg transition duration-300">
          <div>
            <h2 className="font-bold text-2xl text-gray-800">
              You are
              {distance ? ` ${distance}km ` : "..."}
              away
            </h2>

            <p className="text-gray-500 mt-1 text-sm">from this place</p>
          </div>

          <LuSend className="text-green-600 text-3xl" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-7">
          <button
            onClick={() => toggleFavorite(Number(places.id))}
            className={` bg-white border-red-300 rounded-xl py-4 font-semibold border transition
duration-300
hover:scale-105 ${
              isFavorite
                ? "bg-red-500 text-black border-red-500"
                : "border-red-300"
            }`}
          >
            {isFavorite ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
          </button>

          <button
         onClick={() =>
            openMap(
                 places.latitude,
                 places.longitude
              )
             }
            className="bg-green-600 text-white rounded-xl py-4 font-semibold transition duration-300 hover:bg-green-700 hover:scale-105"
          >
            🗺️ Open in Maps
          </button>
        </div>
      </div>
    </div>
  );
}
