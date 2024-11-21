import axios from "axios";

const instance = axios.create({
    baseURL: `https://interviewsimbackend-180808156072.us-central1.run.app/api`,
    withCredentials: true,
});

const instanceInterview = axios.create({
    baseURL: `https://interviewsimbackend-180808156072.us-central1.run.app/interview`,
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