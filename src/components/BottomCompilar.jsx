import { useState } from "react";
import WindowEditor from "../components/windowEditor";
import ConsolaOutput from "../components/consolaOutput";
import Select from "react-select";
import { languageOptions } from "../api/languajeOptions";
import axios from "axios";

const BottomCompilar = () => {
  const [code, setCode] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [processing, setProcessing] = useState(false);

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
    <div className="flex flex-col items-center w-full h-full border-4 p-2 rounded-lg bg-gradient-to-r from-purple-300 to-orange-300 ">
      <div className="mb-3 flex justify-between w-full">
        <Select
          options={languageOptions}
          value={selectedLanguage}
          onChange={onSelectChange}
          className="w-1/3 border-2 border-white rounded-md p-1 bg-gradient-to-t from-blue-500 to-blue-400 "
        />
        <button
          onClick={handleCompile}
          disabled={!code || processing}
          className="border-2 border-white rounded-lg px-4 py-2 bg-gradient-to-t from-blue-500 to-blue-400 text-white cursor-pointer"
        >
          {processing ? "Compilando..." : "Compilar y Ejecutar"}
        </button>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <WindowEditor
          code={code}
          onChange={onChange}
          language={selectedLanguage.value}
        />
      </div>

      <ConsolaOutput outputDetails={outputDetails} />
    </div>
  );
};

export default BottomCompilar;
