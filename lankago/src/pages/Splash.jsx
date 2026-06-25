import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import bg from "../assets/images/splash.png";
import { useState } from "react";

export default function Splash() {
  const navigate = useNavigate();
    const [active, setActive] = useState(0);

  return (
    // <div className="min-h-screen  w-full bg-gray-100 flex justify-center items-center">
<div>
     <div className=" h-screen w-full relative flex items-center justify-center "
        style={{
          backgroundImage: `url(${bg})`,
           backgroundSize: "cover",
        backgroundPosition: "center",
        }}
      >
      {/* Green Overlay */}
      <div className=" absolute inset-0 bg-green-600/20"></div>
 </div>
      
     

      {/* Bottom Card */}
       <div className="absolute bottom-0 w-full">
        <div className="bg-white rounded-t-3xl px-6 pt-6 pb-10 shadow-2xl text-center">
          
          {/* Icon */}
          <div className="w-14 h-14 mx-auto -mt-12 bg-white rounded-full shadow flex items-center justify-center">
            <FaMapMarkerAlt className="text-green-600 text-2xl" />
          </div>

          {/* Text */}
          <h2 className="text-lg font-semibold mt-4 text-gray-800">
            Discover amazing places
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            and create memories
          </p>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  active === i
                    ? "w-6 bg-green-600"
                    : "w-2 bg-green-300"
                }`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

        {/* Start Button */}
        <button
          onClick={() => navigate("/home")}
          className=" mt-10  w-full  bg-green-600 hover:bg-green-700  text-white  py-4  rounded-full  text-lg md:text-xl font-semibold transition duration-300 "
        >
          Start Exploring
        </button>
      </div>
   </div>
 </div> 
  );
}

