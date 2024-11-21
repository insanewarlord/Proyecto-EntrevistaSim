import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_CONNECTION}/api`,
    withCredentials: true,
});

const instanceInterview = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_CONNECTION}/interview`,
    withCredentials: true,
});

// Interceptor para manejar errores
instance.interceptors.response.use(
    response => response,
    error => {
        console.error("Error en la solicitud:", error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);

instanceInterview.interceptors.response.use(
    response => response,
    error => {
        console.error("Error en la solicitud:", error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);

export { instance, instanceInterview };