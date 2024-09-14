import {
  getInterviewByTeacherRequest,
  deleteInterviewRequest,
} from "../api/interview";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

function ViewInterview() {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const userId = user.id;
        console.log("userId", userId);

        // Agrega un encabezado para evitar problemas de caché
        const response = await getInterviewByTeacherRequest(userId, {
          headers: {
            "Cache-Control": "no-cache", // Deshabilita la caché
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        // Asegúrate de actualizar el estado de las entrevistas
        setInterviews(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };

    fetchInterviews();
  }, [user.id]);

  const handleDelete = async (id) => {
    try {
      await deleteInterviewRequest(id);
      const response = await getInterviewByTeacherRequest(user.id, {
        headers: {
          "Cache-Control": "no-cache", // Deshabilita la caché también aquí
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setInterviews(response.data);
      toast.success("Entrevista eliminada con éxito");
    } catch (error) {
      console.error("Error deleting interview:", error);
    }
  };

  return (
    <>
      <div className="flex h-full w-full overflow-hidden rounded-lg bg-gradient-to-r from-rose-400 via-orange-200 to-purple-300">
        <div className="flex flex-col w-full h-full p-5 space-y-5 overflow-y-auto">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="flex flex-col bg-white rounded-lg p-5 space-y-5 mb-5"
            >
              <h2 className="text-lg font-bold">{interview.title}</h2>
              <p>{interview.description}</p>
              <div className="space-y-2">
                <p className="text-gray-500">
                  Empresa:{" "}
                  <strong className="uppercase">{interview.empresa}</strong>
                </p>
                <p className="text-gray-500">
                  Tipo de entrevista:{" "}
                  <strong className="uppercase">
                    {interview.tipoEntrevista}
                  </strong>
                </p>
              </div>
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center justify-center space-x-5">
                  <button
                    onClick={() => handleDelete(interview._id)}
                    className="bg-gradient-to-t from-red-600 to-red-500 rounded-lg p-2 flex items-center justify-center text-white"
                  >
                    Borrar
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-4 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <button className="bg-gradient-to-t from-emerald-600 to-emerald-500 rounded-lg p-2 flex items-center justify-center text-white">
                    Editar
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-4 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                </div>
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
    </>
  );
}

export default ViewInterview;
