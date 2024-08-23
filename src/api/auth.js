import axios from './axios.js';

// Registro
export const registerRequest = (userData) => axios.post(`/register`, userData);

// Login
export const LoginRequest = (userData) => axios.post(`/login`, userData);

// Verificar token
export const verifyTokenRequest = () => axios.get(`/verify`);
