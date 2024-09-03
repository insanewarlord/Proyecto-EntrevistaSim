import { useForm } from "react-hook-form";
import { createInterviewRequest } from "../api/interview.js";
import { useAuth } from "../context/authContext.jsx";
import { toast } from "react-toastify";

function CreateInterview() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();

  const onSubmit = async (values) => {
    const userId = user.id;
    try {
      const data = { ...values, userId };
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
    <div className="h-full w-full flex overflow-hidden space-x-5">
      <div className="w-1/2 h-full bg-cover bg-center  rounded-lg border-4">
        <img
          src="https://coderslink.com/wp-content/uploads/2023/06/Entrevista-Tecnica-Animado.jpeg"
          alt="Crear Entrevista"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col p-8 w-1/2 h-full bg-gradient-to-l from-purple-300 via-orange-300 to-rose-400  rounded-lg border-4 ">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Crear Entrevista
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Título:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full text-center px-4 py-3 text-sm font-semibold bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              {...register("title", { required: "El título es requerido" })}
              placeholder="Título de la entrevista"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Descripción:
            </label>
            <textarea
              name="description"
              id="description"
              className="w-full text-center px-4 py-3 text-sm font-semibold bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              {...register("description", {
                required: "La descripción es requerida",
              })}
              placeholder="Descripción de la entrevista"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="empresa"
              className="text-sm font-medium text-gray-700"
            >
              Empresa:
            </label>
            <input
              type="text"
              name="empresa"
              id="empresa"
              className="w-full text-center px-4 py-3 text-sm font-semibold bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              {...register("empresa", {
                required: "La empresa es requerida",
              })}
              placeholder="Empresa de la entrevista"
            />
            {errors.empresa && (
              <span className="text-red-500 text-sm">
                {errors.empresa.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Dificultad"
              className="text-sm font-medium text-gray-700"
            >
              Dificultad:
            </label>
            <select
              name="Dificultad"
              id="Dificultad"
              className="w-full text-center px-4 py-3 text-sm font-semibold bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              {...register("Dificultad", {
                required: "La dificultad es requerida",
              })}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {errors.Dificultad && (
              <span className="text-red-500 text-sm">
                {errors.Dificultad.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-40 h-14 bg-gradient-to-t from-blue-500 to-blue-600 text-white font-bold rounded-lg items-center justify-center mx-auto flex hover:scale-105 transform duration-300 ease-in-out"
          >
            Crear Entrevista
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateInterview;
