import { useForm } from "react-hook-form";
import Logo from "../assets/Logo.png";
import Student from "../assets/Student.png";
import Teacher from "../assets/Teacher.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [role, setRole] = useState(null);
  const { signin, isAuthenticated, errorMesage } = useAuth();
  const navigate = useNavigate();
  const [roleError, setRoleError] = useState("");
  const [loading, setLoading] = useState(false);
  const { language } = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      if (role === "student") {
        navigate("/student");
      } else if (role === "teacher") {
        navigate("/teacher");
      }
    }
  }, [isAuthenticated, navigate, role]);

  const onSubmit = async (values) => {
    if (!role) {
      setRoleError(t('role_required', language));
      return;
    } else {
      setRoleError("");
    }
    setLoading(true);
    if (values.password.length < 6) {
      setError("password", { type: "manual", message: t('password_min', language) });
      setLoading(false);
      return;
    }
    const response = await signin({ ...values, role });
    if (response.error === true) {
      setError("apiError", { type: "manual", message: response.message });
    } else {
      toast.success(t('login_success', language));
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#283e56] via-[#4fc3f7] to-[#283e56]">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-95 rounded-2xl shadow-2xl backdrop-blur-md border-2 border-[#ffd700]" style={{boxShadow: '0 8px 32px 0 rgba(40,62,86,0.25)'}}>
        <div className="flex flex-col items-center mb-8">
          <Link to={"/"}>
            <img
              src={Logo}
              alt="Logo"
              className="w-32 h-32 mb-4 animate-jump-in border-2 border-[#ffd700] bg-white rounded-full shadow-md"
            />
          </Link>
          <h1 className="text-3xl font-extrabold text-center text-black">
            {t('login_title', language)}
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="relative mb-3">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: t('email_required', language),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t('email_invalid', language)
                }
              })}
              onChange={() => clearErrors("email")}
              className="w-full text-center px-4 py-3 text-sm font-semibold bg-white border border-[#ffd700] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-[#283e56]"
              placeholder={t('email', language)}
              aria-label={t('email', language)}
            />
            {errors.email && (
              <span className="text-red-500 text-xs absolute left-0 -bottom-5">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="relative mb-3">
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              {...register("password", {
                required: t('password_required', language),
                minLength: { value: 6, message: t('password_min', language) }
              })}
              onChange={() => clearErrors("password")}
              className="w-full px-4 py-3 text-sm font-semibold bg-white border border-[#ffd700] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent text-center text-[#283e56]"
              placeholder={t('password', language)}
              aria-label={t('password', language)}
            />
            {errors.password && (
              <span className="text-red-500 text-xs absolute left-0 -bottom-5">{errors.password.message}</span>
            )}
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

          {/* Selección de rol */}
          <div className="flex flex-wrap justify-around mb-6">
            <div
              className={`flex items-center space-x-2 p-2 border rounded-lg cursor-pointer ${
                role === "student"
                  ? "border-2 border-[#4fc3f7] bg-[#e3f7fd] text-[#283e56]"
                  : "border-2 border-[#ffd700]"
              }`}
              onClick={() => {
                setRole("student");
                setRoleError("");
              }}
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
              <span className="font-semibold">{t('student', language)}</span>
            </div>
            <div
              className={`flex items-center space-x-2 p-2 border rounded-lg cursor-pointer ${
                role === "teacher"
                  ? "border-2 border-[#4fc3f7] bg-[#e3f7fd] text-[#283e56]"
                  : "border-2 border-[#ffd700]"
              }`}
              onClick={() => {
                setRole("teacher");
                setRoleError("");
              }}
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
              <span className="font-semibold">{t('teacher', language)}</span>
            </div>
          </div>
          {roleError && (
            <span className="text-red-500 text-xs block text-center mb-2">{t('role_required', language)}</span>
          )}

          {/* Error de API */}
          {errors.apiError && (
            <span className="text-red-500 text-xs block text-center mb-2">{errors.apiError.message}</span>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#283e56] text-[#ffd700] font-bold rounded-lg shadow-md border-2 border-[#ffd700] hover:bg-[#ffd700] hover:text-[#283e56] transition duration-200"
            disabled={loading}
            style={{boxShadow: '0 2px 8px #283e56aa'}}
          >
            {loading ? t('logging_in', language) : t('login', language)}
          </button>
          <div className="text-center text-black dark:text-white mt-6">
            <p>
              {t('no_account', language)}{" "}
              <Link
                to={"/register"}
                className="text-[#4fc3f7] font-bold hover:text-[#ffd700] transition"
              >
                {t('register_here', language)}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
