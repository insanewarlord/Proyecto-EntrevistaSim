import { useForm } from "react-hook-form";
import { createInterviewRequest } from "../api/interview.js";
import { useAuth } from "../context/authContext.jsx";
import { toast } from "react-toastify";
import { useState } from "react";

function CreateInterview() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const [tipoEntrevista, setTipoEntrevista] = useState("");

  const onSubmit = async (values) => {
    const userId = user.id;
    try {
      const data = { ...values, userId, tipoEntrevista };
      console.log("Datos enviados:", data);
      await createInterviewRequest(data);
      toast.success("Entrevista creada con éxito");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Error al crear la entrevista");
    }
  };

  return (
    <div className="h-full w-full flex overflow-hidden space-x-5 items-center justify-center">
      <div className="w-1/2 h-full bg-cover bg-center rounded-lg">
        <img
          src="https://coderslink.com/wp-content/uploads/2023/06/Entrevista-Tecnica-Animado.jpeg"
          alt="Crear Entrevista"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col p-6 w-1/2 h-full bg-gradient-to-l from-purple-300 via-orange-300 to-rose-400 rounded-lg  overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 items-center justify-center my-auto overflow-y-auto"
        >
          <div className="flex flex-col space-y-8 p-6 bg-white  rounded-lg shadow-xl">
            <h1 className="flex items-center justify-center">
              <span className="text-2xl font-bold text-black">
                Crear Entrevista
              </span>
            </h1>
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="text-md font-medium text-gray-700 mb-1"
              >
                Título:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="w-full text-center px-3 py-2 text-sm font-semibold bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                {...register("title", { required: "El título es requerido" })}
                placeholder="Título de la entrevista"
              />
              {errors.title && (
                <span className="text-red-500 text-base items-center justify-center">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-md font-medium text-gray-700 mb-1"
              >
                Descripción:
              </label>
              <textarea
                name="description"
                id="description"
                className="w-full text-center p-2 text-sm font-semibold bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                {...register("description", {
                  required: "La descripción es requerida",
                })}
                placeholder="Descripción de la entrevista"
              />
              {errors.description && (
                <span className="text-red-500 text-base items-center justify-center">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="empresa"
                className="text-md font-medium text-gray-700 mb-1"
              >
                Empresa:
              </label>
              <input
                type="text"
                name="empresa"
                id="empresa"
                className="w-full text-center px-3 py-2 text-sm font-semibold bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                {...register("empresa", {
                  required: "La empresa es requerida",
                })}
                placeholder="Empresa de la entrevista"
              />
              {errors.empresa && (
                <span className="text-red-500 text-base items-center justify-center">
                  {errors.empresa.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="Dificultad"
                className="text-md font-medium text-gray-700 mb-1"
              >
                Dificultad:
              </label>
              <select
                name="Dificultad"
                id="Dificultad"
                className="w-full text-start px-3 py-2 text-sm font-semibold bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                {...register("Dificultad", {
                  required: "La dificultad es requerida",
                })}
              >
                <option value="" className="text-gray-700 bg-white">
                  Selecciona la dificultad
                </option>
                <option value="0" className="text-gray-700 bg-white">
                  0
                </option>
                <option value="1" className="text-gray-700 bg-white">
                  1
                </option>
                <option value="2" className="text-gray-700 bg-white">
                  2
                </option>
                <option value="3" className="text-gray-700 bg-white">
                  3
                </option>
                <option value="4" className="text-gray-700 bg-white">
                  4
                </option>
                <option value="5" className="text-gray-700 bg-white">
                  5
                </option>
              </select>
              {errors.Dificultad && (
                <span className="text-red-500 text-base items-center justify-center">
                  {errors.Dificultad.message}
                </span>
              )}
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="tipoEntrevista"
                className="text-md font-medium text-gray-700 mb-1"
              >
                Tipo de entrevista:
              </label>
              <div className="flex justify-between space-x-4">
                <div
                  className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors duration-300 justify-center ${
                    tipoEntrevista === "opcionMultiple"
                      ? "border-green-500 bg-emerald-500 text-white"
                      : "border-gray-300 bg-white hover:bg-emerald-200"
                  } w-1/2 h-12`}
                  onClick={() => setTipoEntrevista("opcionMultiple")}
                >
                  <input
                    type="radio"
                    name="tipoEntrevista"
                    value="opcionMultiple"
                    className="hidden"
                    checked={tipoEntrevista === "opcionMultiple"}
                    readOnly
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                    />
                  </svg>
                  <span className="text-md font-medium">Opción Múltiple</span>
                </div>
                <div
                  className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors duration-300 justify-center ${
                    tipoEntrevista === "programacion"
                      ? "border-green-500 bg-emerald-500 text-white"
                      : "border-gray-300 bg-white hover:bg-emerald-200"
                  } w-1/2 h-12`}
                  onClick={() => setTipoEntrevista("programacion")}
                >
                  <input
                    type="radio"
                    name="tipoEntrevista"
                    value="programacion"
                    className="hidden"
                    checked={tipoEntrevista === "programacion"}
                    readOnly
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                    />
                  </svg>
                  <span className="text-md font-medium">Programación</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="px-4 py-2 w-48  h-10 text-md font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Crear Entrevista
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateInterview;
