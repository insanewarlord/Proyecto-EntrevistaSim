import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_CONNECTION ? `${import.meta.env.VITE_SERVER_CONNECTION}/api` : "http://localhost:8000/api",
    withCredentials: true,
});

const instanceInterview = axios.create({
    baseURL: import.meta.env.VITE_SERVER_CONNECTION ? `${import.meta.env.VITE_SERVER_CONNECTION}/interwiew` : "http://localhost:8000/interwiew",
    withCredentials: true,
});

export { instance, instanceInterview };