import {instanceInterview} from './axios.js';

//traer todas las entrevistas
export const getInterviewsRequest = async ()=> instanceInterview.get(`/allIterview`);
export const getInterviewByIdRequest = async (id) => instanceInterview.get(`/interview/${id}`);
export const createInterviewRequest = async (data) => instanceInterview.post(`/createInterview`, data);