import axios from "axios";

const instance = axios.create({
    baseURL:`${import.meta.env.VITE_SERVER_CONNECTION}/api`,
    withCredentials: true,
});

const instanceInterview = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_CONNECTION}/interwiew`,
    withCredentials: true,
});

export { instance, instanceInterview };