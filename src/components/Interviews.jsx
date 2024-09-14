import { useState, useEffect } from "react";
import { getInterviewsRequest } from "../api/interview";
import { Link } from "react-router-dom";

function PanelInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await getInterviewsRequest();
        setInterviews(response.data);
      } catch (error) {
        console.error(
          "Error al traer las entrevistas:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full min-h-screen relative">
        <div role="status" className="flex flex-col items-center">
          <svg
            aria-hidden="true"
            className="w-28 h-28 animate-spin"
            viewBox="0 0 100 101"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00bfff" />
                <stop offset="50%" stopColor="#ff69b4" />
                <stop offset="100%" stopColor="#32cd32" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset="75"
            />
          </svg>

          <span className="absolute text-center text-gray-400 text-xl bottom-10">
            Cargando...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full bg-gradient-to-r from-lime-300 via-red-100 to-purple-200 rounded-lg  overflow-hidden">
      <div
        className="flex flex-col w-full h-full p-5 space-y-5 overflow-y-auto"
        key={interviews.title}
      >
        {interviews.map((interview) => (
          <div
            key={interview.id}
            className="flex flex-col bg-white rounded-lg p-5 space-y-5 mb-5"
          >
            <h2 className="text-lg font-bold">{interview.title}</h2>
            <p>{interview.description}</p>
            <div className="space-y-2">
              <p className="text-gray-500">Empresa: {interview.empresa}</p>
              <p className="text-gray-500">
                Tipo de entrevista: {interview.tipoEntrevista}
              </p>
            </div>
            <div className="flex w-full justify-between items-center">
              <Link
                to={`/interview/${interview._id}`}
                rel="noreferrer"
                className="text-blue-500 cursor-pointer"
              >
                Hacer entrevista
              </Link>
              <div className="flex space-x-1 items-center justify-center">
                <span className="text-gray-500">Dificultad:</span>
                <p className="m-1"> {interview.Dificultad}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#FFFF00"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-6 text-yellow-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PanelInterviews;
