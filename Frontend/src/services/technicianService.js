import axios from 'axios';
import { apiConfig, API_ENDPOINTS } from './apiConfig';

// Create axios instance
const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: apiConfig.headers,
});

// Add request interceptor to include token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Technician Service
const technicianService = {
  // Create new technician - Backend expects: { name, email, password, team }
  createTechnician: async (technicianData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CREATE_TECHNICIAN, technicianData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create technician' };
    }
  },

  // Get all technicians
  getAllTechnicians: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.READ_TECHNICIAN);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch technicians' };
    }
  },

  // Get technician by ID
  getTechnicianById: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.READ_TECHNICIAN}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch technician' };
    }
  },

  // Update technician - Backend expects: { name?, email?, password?, team? }
  updateTechnician: async (id, technicianData) => {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.UPDATE_TECHNICIAN}/${id}`, technicianData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update technician' };
    }
  },

  // Delete technician
  deleteTechnician: async (id) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.DELETE_TECHNICIAN}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete technician' };
    }
  },
};

export default technicianService;
