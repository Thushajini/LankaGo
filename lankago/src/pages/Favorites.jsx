import FavoriteCard from "../components/FavoriteCard";
// import places from "../data/places";
import BottomNavbar from "../components/BottomNav";
import { useEffect, useState } from "react";
import { getPlaces } from "../services/api";
import { imageMap } from "../utils/imageMap";
export default function Favorites({ favorites, toggleFavorite, setFavorites }) {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    getPlaces()
      .then((data) => {
        setPlaces(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const favoritePlaces = (places || []).filter((places) =>
    favorites?.includes(Number(places.id)),
  );
  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => item !== id);
    setFavorites(updated);
  };
  console.log("favorites in page:", favorites);

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20">
      {/* Header */}
      <div className="bg-white rounded-b-3xl shadow-sm px-7 py-9 relative flex items-center justify-center">
        {/* Center Title */}
        <h1 className="text-3xl font-bold text-green-700">Favourites</h1>

        {/* Right Delete Button */}
        <button
          onClick={clearAllFavorites}
          className="absolute right-8 text-2xl text-gray-700 hover:text-red-500 transition"
        >
          🗑️
        </button>
      </div>

      <div className="p-5">
        {favoritePlaces.length === 0 ? (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-bold">No Favorites Yet</h2>

            <p className="text-gray-500 mt-2">Add your favorite places ❤️</p>
          </div>
        ) : (
          favoritePlaces.map((places) => (
            <FavoriteCard
              key={places.id}
              id={places.id}
              name={places.name}
              image={imageMap[places.image]}
              category={places.category}
              rating={places.rating}
              toggleFavorite={toggleFavorite}
              onRemove={() => removeFavorite(Number(places.id))}
            />
          ))
        )}
        <BottomNavbar />
      </div>
    </div>
  );
}
