
import {instance} from './axios.js';

// Registro
export const registerRequest = (userData) => instance.post(`/register`, userData);

// Login
export const LoginRequest = (userData) => instance.post(`/login`, userData);

// Verificar token
export const verifyTokenRequest = () => instance.get(`/verify`);

//loagout
export const logoutRequest = () => instance.post(`/logout`);

//Eliminar usuario
export const deleteUserRequest = (userData) => instance.delete(`/deleteUser`,userData);


//traer calificaciones
export const getGradesRequest = () => instance.get(`/getGrades`);


//traer calificaciones de profesor
export const getGradesTeacherRequest = () => instance.get(`/getGradesTeacher`);