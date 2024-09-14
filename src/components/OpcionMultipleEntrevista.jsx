import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  calificarInterviewRequest,
  obtenerRecomendacionesRequest,
} from "../api/interview";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import RecomendacionesIA from "./RecomendacionesIA";

function ProblemaOpcionMultiple({
  IAresult,
  nombreEntrevista,
  dificultad,
  tipoEntrevista,
}) {
  const questions = IAresult.questions || [];
  const [respuestaUser, setRespuestaUser] = useState([]);
  const [resultado, setResultado] = useState(null);
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [key, setKey] = useState(0);
  const { user } = useAuth();
  const [gifUrl, setGifUrl] = useState("");
  const [loading, setLoading] = useState(false); // Estado carga
  const apikey = "n3JalNYJjweFvncRtnefK4xOrhh4dqLY";

  const handleRadioChange = (questionIndex, option) => {
    setRespuestaUser((prevState) => {
      const newState = [...prevState];
      newState[questionIndex] = option;
      return newState;
    });
  };

  const handleSubmit = async () => {
    setLoading(true); // Activar estado de carga
    try {
      const response = await calificarInterviewRequest({
        respuestaIA: questions.map((q) => q.answer),
        respuestaUser,
        userID: user.id,
        nombreEntrevista,
        dificultad,
        tipoEntrevista,
      });
      const recomendacionesResponse = await obtenerRecomendacionesRequest({
        preguntas: questions.map((q) => q.question),
        respuestaUser,
        respuestaIA: questions.map((q) => q.answer),
      });
      console.log("Respuesta del servidor:", response.data);
      console.log(
        "Recomendaciones del servidor:",
        recomendacionesResponse.data
      );

      // Actualiza el estado con las recomendaciones
      setResultado(response.data);
      setRecomendaciones(recomendacionesResponse.data);
      toast.success("Respuestas enviadas correctamente");
      setRespuestaUser([]);
      setKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error al enviar las respuestas:", error);
      toast.error("Error al procesar las respuestas");
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  useEffect(() => {
    let isFetching = false;

    const fetchGif = async () => {
      if (isFetching) return;
      isFetching = true;

      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/random?api_key=${apikey}&tag=programming,funny`
        );
        const data = await response.json();
        if (data.data) {
          setGifUrl(data.data.images.original.url);
        } else {
          console.error("No se encontró un GIF");
        }
      } catch (error) {
        console.error("Error al obtener la imagen:", error);
      } finally {
        isFetching = false;
      }
    };

    fetchGif();
    const intervalId = setInterval(fetchGif, 30000);

    return () => clearInterval(intervalId);
  }, [apikey]);

  const handleHacerOtraEntrevista = () => {
    window.location.reload();
  };

  const handleRepetirEntrevista = () => {
    setResultado(null);
    setRespuestaUser([]);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="flex h-full w-full overflow-hidden space-x-5">
      <div className="flex w-1/2 bg-gradient-to-t from-orange-300 via-pink-300 to-purple-300 rounded-lg ">
        <div className="flex flex-col w-full h-full p-5 overflow-y-auto ">
          <div className="flex flex-col bg-white rounded-lg p-6 space-y-6 justify-center items-center">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-extrabold text-gray-900">
                Preguntas de la Entrevista con IA
              </h2>
              <p className="text-gray-500">
                Responde cuidadosamente a cada pregunta para ayudar a tu
                aprendizaje
              </p>
            </div>
            <div
              key={key}
              className="flex flex-col items-center justify-center w-full space-y-8"
            >
              {questions.length > 0 ? (
                questions.map((question, index) => (
                  <div
                    key={index}
                    className="w-full border-4 bg-transparent p-6 rounded-lg  space-y-4 mx-auto"
                  >
                    <h3 className="text-xl font-bold text-gray-800">
                      {index + 1}. {question.question}
                    </h3>

                    {question.options && (
                      <div
                        role="radiogroup"
                        className="flex flex-col space-y-4 mt-5 justify-center items-center"
                      >
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className="flex items-center space-x-3"
                          >
                            <input
                              type="radio"
                              id={`question-${index}-option-${optIndex}`}
                              name={`question-${index}`}
                              value={option}
                              className="hidden peer"
                              onChange={() => handleRadioChange(index, option)}
                            />
                            <label
                              htmlFor={`question-${index}-option-${optIndex}`}
                              className="flex items-center cursor-pointer bg-white border-2 border-gray-300 rounded-full px-4 py-2 text-gray-800 font-medium hover:bg-indigo-50 peer-checked:bg-indigo-500 peer-checked:text-white peer-checked:border-white transition-colors duration-200 ease-in-out w-full"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-700">No hay preguntas disponibles.</p>
              )}
            </div>
            {!resultado && (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`mt-4 text-white px-4 py-2 rounded-lg ${
                  loading
                    ? " cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600"
                }`}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-10 w-10 text-violet-500 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  "Enviar Respuestas"
                )}
              </button>
            )}

            {resultado && (
              <div className="flex items-center justify-between mt-4 text-center w-full">
                <div className="flex space-x-4">
                  <button
                    onClick={handleHacerOtraEntrevista}
                    className="flex items-center justify-center p-2 bg-blue-500 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-white hover:animate-spin"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleRepetirEntrevista}
                    className="flex items-center justify-center p-2 bg-blue-500 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-xl font-bold text-white bg-blue-500 p-3 rounded-lg shadow-lg">
                  Resultado de la entrevista: {resultado.score} /{" "}
                  {resultado.total}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/2 space-y-5 h-full">
        <div className="bg-gradient-to-t from-orange-300 via-pink-300 to-purple-300 rounded-lg h-1/2 relative">
          <img src={gifUrl} alt="" className="h-full w-full rounded-lg" />
          <div className="absolute bottom-0 right-0 bg-gray-400 bg-opacity-70 m-3 rounded-full shadow-lg">
            <p className="p-4 text-white text-2xl font-bold">
              ¡Inicio la entrevista, buena suerte!
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-t from-orange-300 via-pink-300 to-purple-300 rounded-lg h-1/2">
          <RecomendacionesIA recomendaciones={recomendaciones} />
        </div>
      </div>
    </div>
  );
}

ProblemaOpcionMultiple.propTypes = {
  IAresult: PropTypes.shape({
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string),
        answer: PropTypes.string,
      })
    ),
  }).isRequired,
  nombreEntrevista: PropTypes.string.isRequired,
  dificultad: PropTypes.string.isRequired,
  tipoEntrevista: PropTypes.string.isRequired,
};

export default ProblemaOpcionMultiple;
