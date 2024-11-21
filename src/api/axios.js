import axios from "axios";
// con condiciones de subida a producción

const instance = axios.create({
    baseURL: "https://plataformainterviewsim-180808156072.us-central1.run.app/api", 
    withCredentials: true,
});

// Instancia para las rutas de entrevista
const instanceInterview = axios.create({
    baseURL: "https://plataformainterviewsim-180808156072.us-central1.run.app/interview",
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
