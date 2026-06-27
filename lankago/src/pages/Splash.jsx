import { useNavigate } from "react-router-dom";
import bg from "../assets/images/splash.png";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  flex justify-center items-center">
      {/* Mobile Frame */}
      <div className="relative w-full  h-screen overflow-hidden  shadow-2xl rounded-none md:rounded-3xl bg-black">

        {/* Background Image */}
        <img
          src={bg}
          alt="Background"
          className=" absolute inset-0 w-full h-full object-top object-cover"
        />

        {/* Dark Overlay */}
       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 w-full">

          {/* Text */}
       <div className="absolute bottom-28 left-0 w-full px-6 text-center">
            <h2 className="text-white text-3xl font-bold">
              Discover Amazing Places
            </h2>

            <p className="text-white/90 text-lg mt-2">
              and create unforgettable memories
            </p>
          </div>

          {/* Button */}
          <button
            onClick={() => navigate("/home")}
            className="w-full bg-green-800 hover:bg-green-900 text-white py-5 text-xl font-semibold rounded-t-3xl transition-all duration-300"
          >
            Start Exploring →
          </button>

        </div>
      </div>
    </div>
  );
}