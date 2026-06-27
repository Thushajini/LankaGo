import { useNavigate } from "react-router-dom";
// import { FaMapMarkerAlt } from "react-icons/fa";
import bg from "../assets/images/splash.png";

export default function Splash() {
  const navigate = useNavigate();

  return (
     <div className="fixed  w-full bg-gray-100 flex justify-center items-center">
    
      <div className="min-h-screen w-full flex flex-col justify-end relative overflow-hidden">
        <img
          src={bg}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
     
      <div className="absolute bottom-0 w-full">
       <div className=" px-6 pt-4 pb-10 sm:pt-6 sm:pb-10 shadow-2xl text-center italic">
          <h2 className="text-2xl font-semibold mt-5 text-white">
            Discover amazing places
          </h2>
          <p className="text-white font-semibold text-xl mt-1">
            and create memories
          </p>
          </div>

          {/* Start Button */}
           <div className="fixed  bottom-0 left-0 right-0  shadow-xl  flex justify-between z-50"></div>
          <button
            onClick={() => navigate("/home")}
            className=" mt-10  w-full  bg-green-800 hover:bg-green-900  text-white  py-6  rounded-t-xl  text-xl md:text-2xl font-semibold transition duration-300 "
          >
            Start Exploring
          </button>
        </div>
      </div>
     </div>
  );
}
