import { useState, useEffect } from "react";
import WindowEditor from "./windowEditor";
import ConsolaOutput from "./consolaOutput";
import Select from "react-select";
import { languageOptions } from "../api/languajeOptions";
import axios from "axios";
import PropTypes from "prop-types";

const BottomCompilar = ({
  IAresult,
  nombreEntrevista,
  dificultad,
  tipoEntrevista,
}) => {
  console.log("IAresult", IAresult);
  console.log("nombreEntrevista", nombreEntrevista);
  console.log("dificultad", dificultad);
  console.log("tipoEntrevista", tipoEntrevista);
  const [code, setCode] = useState("");
  const questions = IAresult.questions || [];
  const [outputDetails, setOutputDetails] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [processing, setProcessing] = useState(false);
  const [Stikers, setStikers] = useState("");
  const apikey = "n3JalNYJjweFvncRtnefK4xOrhh4dqLY";

  useEffect(() => {
    let isFetching = false;

    const fetchStiker = async () => {
      if (isFetching) return;
      isFetching = true;

      try {
        const response = await fetch(
          `https://api.giphy.com/v1/stickers/random?api_key=${apikey}&tag=funny`
        );
        const data = await response.json();
        if (data.data) {
          setStikers(data.data.images.original.url);
        } else {
          console.error("No se encontró un Stiker");
        }
      } catch (error) {
        console.error("Error al obtener la imagen:", error);
      } finally {
        isFetching = false;
      }
    };

    fetchStiker();
    const intervalId = setInterval(fetchStiker, 30000);

    return () => clearInterval(intervalId);
  }, []);

  // Definir las constantes reutilizables
  const RAPID_API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
  const RAPID_API_HOST = "judge0-ce.p.rapidapi.com";
  const RAPID_API_KEY = "9dd58574b7msh667bbe109a2a380p1ffdbfjsn7be279fb6108";

  const onChange = (action, data) => {
    if (action === "code") {
      setCode(data);
    }
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: selectedLanguage.id,
      // codifica el código fuente en base64
      source_code: btoa(code),
    };
    const options = {
      method: "POST",
      url: RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": RAPID_API_HOST,
        "X-RapidAPI-Key": RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: `${RAPID_API_URL}/${token}`,
      headers: {
        "X-RapidAPI-Host": RAPID_API_HOST,
        "X-RapidAPI-Key": RAPID_API_KEY,
      },
    };

    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
      }
    } catch (err) {
      console.error("Error al consultar el estado:", err);
      setProcessing(false);
    }
  };

  const onSelectChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    setCode("");
  };

  return (
    <div className="flex h-full w-full overflow-hidden space-x-5">
      <div className="flex flex-col w-1/2 h-full space-y-5">
        <div className="flex flex-col w-full h-2/3 p-5 overflow-y-auto justify-center items-center rounded-lg bg-gradient-to-r from-purple-300 to-orange-300">
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
              key={nombreEntrevista}
              className="flex flex-col items-center justify-center w-full space-y-8"
            >
              {questions.length > 0 ? (
                questions.map((question, index) => (
                  <div
                    key={index}
                    className="w-full border-4 text-center p-6 rounded-lg space-y-4 mx-auto"
                  >
                    <h3 className="text-xl font-bold text-gray-800">
                      {question.question}
                    </h3>
                  </div>
                ))
              ) : (
                <p className="text-gray-700">No hay preguntas disponibles.</p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-t  from-orange-300 via-pink-300 to-purple-300 rounded-lg h-1/3 w-full flex items-center justify-center">
          <img
            src={Stikers}
            alt="Stikers"
            className="h-full w-full rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-1/2 h-full  p-5 rounded-lg bg-gradient-to-l from-red-300 to-orange-300">
        <div className="mb-3 flex justify-between w-full">
          <Select
            options={languageOptions}
            value={selectedLanguage}
            onChange={onSelectChange}
            className="w-1/3 border-2 border-white rounded-md p-1 bg-gradient-to-t from-blue-500 to-blue-400"
          />
          <button
            onClick={handleCompile}
            disabled={!code || processing}
            className="border-2 border-white rounded-lg px-4 py-2 bg-gradient-to-t from-blue-500 to-blue-400 text-white cursor-pointer"
          >
            {processing ? "Compilando..." : "Compilar y Ejecutar"}
          </button>
        </div>
        <div className="w-full flex-grow flex flex-col h-full">
          <div className="flex-grow-0 h-2/3">
            <WindowEditor
              code={code}
              onChange={onChange}
              language={selectedLanguage.value}
            />
          </div>
          <div className="mt-3 flex-grow h-1/3">
            <ConsolaOutput outputDetails={outputDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomCompilar;

BottomCompilar.propTypes = {
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
