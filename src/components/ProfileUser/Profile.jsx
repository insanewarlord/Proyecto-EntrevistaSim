import { useAuth } from "../../context/authContext";
import Logo from "../../assets/logo.png";
import Info from "./Info";
import Opciones from "./Opciones";
import Buttons from "./buttons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useAuth();
  console.log(user);
  const Back = () => {
    window.history.back();
  };

  const [profileImage, setProfileImage] = useState(Logo);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [indetifiquer, setIndetifiquer] = useState("");
  const [fechas, setFechas] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      try {
        const firstLetter = user?.userName?.charAt(0).toUpperCase();
        const image = await import(`../../assets/letras/${firstLetter}.png`);
        setProfileImage(image.default);
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
        setProfileImage(Logo);
      }
    };

    if (user?.userName) {
      loadImage();
    }
  }, [user]);

  useEffect(() => {
    setUsername(user.userName);
    setEmail(user.email);
    setIndetifiquer(user.id);
    setFechas(user.date);
    setRole(user.role);
  }, [user]);

  return (
    <div className="h-screen w-full p-5">
      <div className="flex flex-col items-start h-full">
        <div className="w-full flex justify-between items-center rounded-lg space-x-6 mx-auto">
          <button
            onClick={Back}
            className="rounded-full p-4 bg-gradient-to-r from-pink-400 via-amber-300 to-yellow-400 shadow-md hover:scale-110 transform duration-200 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <div className="flex text-center bg-gradient-to-l from-emerald-300 via-red-300 to-yellow-300 rounded-lg w-full justify-between shadow-md px-10 mx-auto items-center">
            <div className="p-1 flex items-center justify-center cursor-pointer">
              <img
                src={Logo}
                alt="Logo"
                className="h-14 w-14 bg-white rounded-full p-1"
              />
              <h1 className="text-2xl font-bold text-gray-900 ml-1 hidden lg:block lg:text-2xl">
                InterviewSim
              </h1>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-xl font-bold text-gray-900 mr-5 hidden lg:block md:text-base">
                ¡Bienvenido a tu perfil 👋❤️!
              </p>
              <div className="flex h-10 items-center rounded-3xl animate-jump-in bg-white text-gray-900 p-2">
                <img
                  className="w-14 h-14 rounded-full p-1 md:block text-sm md:text-base font-bold text-gray-900"
                  src={profileImage}
                  alt="Profile"
                />
                <span className="sm:text-xl md:text-sm font-bold hidden md:block mr-1 text-gray-900">
                  {user.userName}
                </span>
              </div>
            </div>
          </div>
          <Link
            to={`/student`}
            className="rounded-full p-4 bg-gradient-to-l from-lime-300 via-green-300 to-emerald-300 shadow-md hover:scale-110 transform duration-200 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full space-y-5 lg:space-y-0 lg:space-x-5 mt-5 mb-5">
          <div className="w-full lg:w-1/2 flex justify-center items-center border-4 rounded-lg h-full">
            <Info
              name={username}
              email={email}
              indetifiquer={indetifiquer}
              date={fechas}
              role={role}
            />
          </div>
          <div className="w-full lg:w-1/2 flex justify-center items-center border-4 rounded-lg h-full">
            <Opciones />
          </div>
        </div>
        <div className="bottom-0 w-full flex justify-center items-center mt-5 border-4 h-1/4 rounded-lg">
          <Buttons />
        </div>
      </div>
    </div>
  );
}

export default Profile;
