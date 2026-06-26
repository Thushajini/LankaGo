import { BrowserRouter,Routes,Route } from "react-router-dom";
import Splash from "../pages/Splash.jsx";
import Home from "../pages/Home.jsx";
import Details from "../pages/Details.jsx";
import Favorites from "../pages/Favorites.jsx";
import About from "../pages/About.jsx";
import { useState,useEffect } from "react";
import Nearby from "../pages/Nearby.jsx";


function AppRoutes(){
  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});

useEffect(() => {
  localStorage.setItem(
    "theme",
    darkMode ? "dark" : "light"
  );
}, [darkMode]);
    const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
});

const toggleFavorite = (id) => {
  const numId = Number(id);
  setFavorites((prev) =>
    prev.includes(numId)
      ? prev.filter((item) => item !== numId)
      : [...prev, numId]
  );
};
useEffect(() => {
  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );
}, [favorites]);

  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home favorites={favorites} toggleFavorite={toggleFavorite}  darkMode={darkMode}
  setDarkMode={setDarkMode} />} />
        <Route path="/details/:id" element={<Details  favorites={favorites} toggleFavorite={toggleFavorite}   />} />
        <Route path="/favorites" element={<Favorites  favorites={favorites} toggleFavorite={toggleFavorite} setFavorites={setFavorites} />} />
        <Route path="/about" element={<About />} />
        <Route path="/nearby" element={<Nearby/>}/>
      </Routes>
    </BrowserRouter>
   
  );
}
export default AppRoutes;