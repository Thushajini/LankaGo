import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed  bottom-0 left-0 right-0 bg-white rounded-xl shadow-xl px-8 py-4 flex justify-between z-50">
      {/* Home */}

      <button
        onClick={() => navigate("/home")}
        className={`flex flex-col items-center ${
          isActive("/home") ? "text-green-600" : "text-gray-500"
        }`}
      >
        🏠
        <span className="text-sm">Home</span>
      </button>

      {/* Favorites */}
      <button
        onClick={() => navigate("/favorites")}
        className={`flex flex-col items-center ${
          isActive("/favorites") ? "text-green-600" : "text-gray-500"
        }`}
      >
        ❤️
        <span className="text-sm">Favorites</span>
      </button>

      <button
        onClick={() => navigate("/nearby")}
        className={`flex flex-col items-center ${
          isActive("/about") ? "text-green-600" : "text-gray-500"
        }`}
      >
         📍
        <span className="text-sm">Nearby</span>
      </button>
    </div>
  );
}
