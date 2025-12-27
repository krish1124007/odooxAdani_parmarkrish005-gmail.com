

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/admin';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
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

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || { message: 'Network Error' });
  }
);

const adminService = {
  // Technician APIs
  getTechnicians: async () => {
    const response = await axiosInstance.get('/readTechnician');
    return response;
  },

  createTechnician: async (technicianData) => {
    const response = await axiosInstance.post('/createTechnician', technicianData);
    return response;
  },

  updateTechnician: async (id, technicianData) => {
    const response = await axiosInstance.put(`/updateTechnician/${id}`, technicianData);
    return response;
  },

  deleteTechnician: async (id) => {
    const response = await axiosInstance.delete(`/deleteTechnician/${id}`);
    return response;
  },

  // Maintenance Team APIs
  getMaintenanceTeams: async () => {
    const response = await axiosInstance.get('/readMaintenance');
    return response;
  },

  createMaintenance: async (teamData) => {
    const response = await axiosInstance.post('/createMaintenance', teamData);
    return response;
  },

  updateMaintenance: async (id, teamData) => {
    const response = await axiosInstance.put(`/updateMaintenance/${id}`, teamData);
    return response;
  },

  deleteMaintenance: async (id) => {
    const response = await axiosInstance.delete(`/deleteMaintenance/${id}`);
    return response;
  },

  // Equipment APIs
  getEquipment: async () => {
    const response = await axiosInstance.get('/readQuipment');
    return response;
  },

  addEquipment: async (equipmentData) => {
    const response = await axiosInstance.post('/addQuipment', equipmentData);
    return response;
  },

  updateEquipment: async (id, equipmentData) => {
    const response = await axiosInstance.put(`/updateQuipment/${id}`, equipmentData);
    return response;
  },

  deleteEquipment: async (id) => {
    const response = await axiosInstance.delete(`/deleteQuipment/${id}`);
    return response;
  }
};

export default adminService;