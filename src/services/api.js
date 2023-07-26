import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllEmployees = () => api.get('/employees');
export const getEmployeeById = (id) => api.get(`/employee/${id}`);