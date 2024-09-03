import { Link } from "react-router-dom";
import Fondo from "../assets/Banner.jpg";
import Logo from "../assets/Logo.png";

export default function HomePage() {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={Fondo} alt="Fondo" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-rose-500 to-orange-500 opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center text-center text-white p-4 bg-opacity-40 rounded-xl max-w-lg mx-4 sm:mx-8 lg:mx-16">
        <div className="bg-white rounded-full p-3 animate-jump-in mb-4">
          <img src={Logo} alt="Logo" className="w-40 h-40 md:w-32 md:h-32" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-jump">
          InterviewSim
        </h1>
        <p className="bg-gray-400 bg-opacity-50 text-white p-4 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl max-w-md mx-auto">
          Domina tu entrevista con confianza: Práctica inteligente y
          personalizada para desarrolladores, impulsada por IA.
        </p>
        <div className="flex flex-col sm:flex-row sm:space-x-8 mt-6">
          <Link
            to={"/login"}
            className="block px-4 py-2 bg-gradient-to-t from-rose-500 to-purple-500 text-white font-semibold rounded-md shadow-md border-2 border-white hover:scale-110 transition-transform duration-200 ease-in-out mb-2 sm:mb-0"
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className="block px-4 py-2 bg-gradient-to-t from-blue-500 to-green-400 text-white font-semibold rounded-md shadow-md border-2 border-white hover:scale-110 transition-transform duration-200 ease-in-out"
          >
            Register
          </Link>
        </div>
      </div>
      <footer className="absolute bottom-0 left-0 w-full text-white flex justify-center items-center bg-opacity-60 p-2">
        <p className="text-xs sm:text-sm text-center">
          © 2024 InterviewSim. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
