
import { useNavigate } from "react-router-dom";

export default function PlaceCard({id, name, category, rating, image, location,isFavorite, toggleFavorite}) {
  const navigate = useNavigate();

  

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className="relative">
        <img src={image} alt={name} 
        onClick={() => navigate(`/details/${id}` )}
        className="w-full h-40 object-cover cursor-pointer  transition duration-300" />
       <button
  onClick={() => toggleFavorite(id)}
  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
>
  {isFavorite ? "❤️" : "🤍"}
</button>
      </div>
      <div className="p-4 flex flex-col">
        <h2 className="font-bold text-xl leading-7 line-clamp-2">{name}</h2>
        <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm w-fit">
          {category}
        </span>
        <p className="text-yellow-500  mt-3 ">⭐ {rating}</p>
        <p className="text-gray-500 mt-2 leading-6">📍 {location}</p>
        <button 
        onClick={() => navigate(`/details/${id}` )}
        className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition">
          View Details
        </button>
       
      </div>
    </div>
  );
}
