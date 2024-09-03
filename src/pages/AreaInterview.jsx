import { useEffect, useState } from "react";
import { getInterviewByIdRequest } from "../api/interview";
import { Link, useParams } from "react-router-dom";
import Logo from "../assets/logo.png";
import BottomCompilar from "../components/BottomCompilar";
import ProblemaEntrevista from "../components/ProblemaEntrevista";
import Spinner from "../components/Spinner"; // Asegúrate de importar correctamente el spinner

function AreaInterview() {
  const { id } = useParams();
  const [interview, setInterview] = useState({});
  const [IAresult, setIAresult] = useState("");
  const [loading, setLoading] = useState(true); // Estado para controlar el spinner

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await getInterviewByIdRequest(id);
        setInterview(response.data.interview);
        setIAresult(response.data.IAresult);
      } catch (error) {
        console.error(
          "Error al traer la entrevista:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false); // Ocultar el spinner después de cargar los datos
      }
    };

    fetchInterview();
  }, [id]);

  const Back = () => {
    window.history.back();
  };

  if (loading) {
    return <Spinner />; // Mostrar el spinner mientras se cargan los datos
  }

  return (
    <div className="h-screen w-full p-5">
      <div className="flex flex-col items-start h-full">
        <div className="w-full flex justify-between items-center rounded-lg space-x-6 mx-auto">
          <button
            onClick={Back}
            className="rounded-full p-4 bg-gradient-to-l from-purple-300 via-fuchsia-300 to-blue-300 shadow-md hover:scale-110 transform duration-200 ease-in-out"
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
          <div className="flex text-center bg-gradient-to-r from-purple-300 via-fuchsia-300 to-red-300  rounded-lg w-full justify-between shadow-md px-10 mx-auto items-center">
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
              <div className="flex h-10 items-center rounded-3xl animate-jump-in bg-white text-gray-900 p-3">
                <span className="sm:text-xl md:text-sm font-bold hidden md:block mr-1 text-gray-900">
                  {interview.title}
                </span>
              </div>
            </div>
          </div>
          <Link
            to={`/student`}
            onClick={Back}
            className="rounded-full p-4 bg-gradient-to-r from-red-300 via-rose-300 to-orange-300 shadow-md hover:scale-110 transform duration-200 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
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
        <div className="w-full flex flex-row space-x-5 h-full overflow-hidden mt-5">
          <div className="w-1/2 flex flex-col space-y-5 h-full">
            <ProblemaEntrevista
              IAresult={IAresult}
              nombre={interview.title}
              dificultad={interview.Dificultad}
            />
          </div>
          <div className="w-1/2 flex flex-col space-y-5 h-full">
            <BottomCompilar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AreaInterview;
