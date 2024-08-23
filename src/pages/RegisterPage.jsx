import { useForm } from "react-hook-form";
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import Student from "../assets/Student.png";
import Teacher from "../assets/Teacher.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [role, setRole] = useState(null);
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (role === "student") {
        navigate("/student");
      } else if (role === "teacher") {
        navigate("/teacher");
      }
    }
  }, [isAuthenticated, navigate, role]);

  const onSubmit = handleSubmit(async (values) => {
    if (!role) {
      toast.warning("Por favor, selecciona tu rol.");
      return;
    }
    try {
      await signup({ ...values, role });
      console.log("Registro exitoso");
      console.log("Role seleccionado: ", role); // Verificar el valor de role
    } catch (error) {
      toast.error(
        "Error durante el registro: " + (error.response?.data || error.message)
      );
      console.error("Error durante el registro: ", error);
    }
  });

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-500 via-blue-500 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-2xl shadow-2xl backdrop-blur-md border-4 border-gray-300">
        <div className="flex flex-col items-center mb-8">
          <Link to={"/"}>
            <img
              src={Logo}
              alt="Logo"
              className="w-24 h-24 mb-4 animate-jump-in"
            />
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-800 text-center">
            Register InterviewSim
          </h1>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="relative mb-4">
            <input
              type="text"
              {...register("userName", { required: "Username es requerido" })}
              className="w-full px-4 py-3 text-sm font-semibold bg-white border border-gray-300 rounded-lg items-center justify-center shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-center"
              placeholder="Username"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          </div>

          <div className="relative mb-4">
            <input
              type="email"
              {...register("email", { required: "Email es requerido" })}
              className="w-full px-4 py-3 text-sm font-semibold bg-white border border-gray-300 rounded-lg items-center justify-center shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-center"
              placeholder="Email"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                />
              </svg>
            </div>
          </div>

          <div className="relative mb-4">
            <input
              type={passwordVisible ? "text" : "password"}
              {...register("password", { required: "Contraseña es requerida" })}
              className="w-full px-4 py-3 text-sm font-semibold bg-white border border-gray-300 rounded-lg items-center justify-center shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-center"
              placeholder="Password"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer z-20"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-around mb-6">
            <div
              className={`flex items-center space-x-2 p-2 border rounded-lg cursor-pointer ${
                role === "student"
                  ? "border-2 border-blue-500 bg-blue-200 "
                  : "border-2 border-gray-300"
              }`}
              onClick={() => setRole("student")}
            >
              <input
                type="radio"
                name="role"
                value="student"
                className="hidden"
                checked={role === "student"}
                readOnly
              />
              <img src={Student} alt="Student" className="w-10 h-10" />
              <span className="text-gray-700 font-semibold">Estudiante</span>
            </div>
            <div
              className={`flex items-center space-x-2 p-2 border rounded-lg cursor-pointer ${
                role === "teacher"
                  ? "border-2 border-blue-500 bg-blue-200 "
                  : "border-2 border-gray-300"
              }`}
              onClick={() => setRole("teacher")}
            >
              <input
                type="radio"
                name="role"
                value="teacher"
                className="hidden"
                checked={role === "teacher"}
                readOnly
              />
              <img src={Teacher} alt="Teacher" className="w-10 h-10" />
              <span className="font-semibold">Profesor</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-blue-500 font-bold hover:underline ml-4"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
