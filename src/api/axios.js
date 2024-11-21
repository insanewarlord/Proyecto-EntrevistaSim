import axios from "axios";

const isProduction = import.meta.env.VITE_ENV === "production";
console.log("isProduction", isProduction);
console.log("import.meta.env", import.meta.env.VITE_APP_BASE_URL_PROD);
console.log("import.meta.env", import.meta.env.VITE_APP_BASE_URL_DEV);
const instance = axios.create({
    baseURL: isProduction
        ? import.meta.env.VITE_APP_BASE_URL_PROD
        : import.meta.env.VITE_APP_BASE_URL_DEV,
    withCredentials: true,
});


const instanceInterview = axios.create({
    baseURL: isProduction
        ? import.meta.env.VITE_APP_INTERVIEW_BASE_URL_PROD
        : import.meta.env.VITE_APP_INTERVIEW_BASE_URL_DEV,
    withCredentials: true,
});

// Interceptor para manejar errores
const handleError = (error) => {
    const status = error.response?.status || "Sin conexión";
    const message = error.response?.data?.message || error.message || "Error desconocido";
    console.error(`Error (${status}): ${message}`);
    return Promise.reject(error);
};

instance.interceptors.response.use(
    (response) => response,
    handleError
);

instanceInterview.interceptors.response.use(
    (response) => response,
    handleError
);

export { instance, instanceInterview };
