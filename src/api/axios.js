import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

const instanceInterview = axios.create({
    baseURL: "http://localhost:3000/interwiew",
    withCredentials: true,
});

export { instance, instanceInterview };