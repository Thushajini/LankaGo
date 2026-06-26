import BottomNavbar from "../components/BottomNav";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import PlaceCard from "../components/PlaceCard";
import { useState, useEffect } from "react";

import { getPlaces } from "../services/api";
import {imageMap} from "../utils/imageMap";

function Home({ favorites, toggleFavorite }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlaces() {
      const data = await getPlaces();
      console.log("API DATA:", data);
      setPlaces(data);
      setLoading(false);
    }

    loadPlaces();
  }, []);

  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || place.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20">
      <div className="bg-white px-5 pt-6 pb-5 shadow-sm rounded-b-3xl">
        <div className="flex items-center justify-center ">
          {/* <button className="text-2xl text-gray-700">☰</button> */}

          <h1 className="text-3xl font-bold text-green-700 ">LankaGo</h1>

          {/* <button className="text-2xl p-6">🔔</button> */}
        </div>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="px-5 mt-6">
        
         <div className="flex justify-between items-center px-5 mt-6 mb-4">
      <h2 className="text-2xl font-bold text-gray-900">Popular Places</h2>
      
    </div>
        {/* PLACE CARDS */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              id={place.id}
              name={place.name}
              category={place.category}
              rating={place.rating}
              image={imageMap[place.image]}
              location={place.location}
              isFavorite={favorites.includes(Number(place.id))}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        <BottomNavbar />
      </div>
    </div>
  );
}

export default Home;
