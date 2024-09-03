import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

function MenuTeacher() {
  return (
    <div className="h-full border-4 rounded-lg flex flex-col items-center justify-center bg-gradient-to-r from-purple-300  to-rose-400 p-8 shadow-xl">
      <div className="p-4 flex items-center justify-center cursor-pointer mb-8">
        <img
          src={Logo}
          alt="Logo"
          className="h-20 w-20 bg-white rounded-full p-3 shadow-xl transform hover:scale-110 transition-transform duration-300"
        />
        <h1 className="text-4xl font-extrabold text-gray-900 ml-4 hidden lg:block">
          InterviewSim
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full space-y-8">
        <Link
          to="/crear-entrevista"
          className="px-6 py-4 flex items-center justify-center font-bold text-lg rounded-lg bg-white text-gray-900 shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7 w-7 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Crear Entrevista
        </Link>
        <Link
          to="/ver-entrevistas"
          className="px-6 py-4 flex items-center justify-center font-bold text-lg rounded-lg bg-white text-gray-900 shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7 w-7 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          Ver Entrevistas
        </Link>
        <Link
          to="/ver-estadisticas"
          className="px-6 py-4 flex items-center justify-center font-bold text-lg rounded-lg bg-white text-gray-900 shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7 w-7 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Ver Estadísticas
        </Link>
      </div>
    </div>
  );
}

export default MenuTeacher;
