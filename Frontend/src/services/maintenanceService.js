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

// Maintenance Team Service
const maintenanceService = {
  // Create new maintenance team - Backend expects: { name, code, description?, isActive? }
  createMaintenanceTeam: async (teamData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CREATE_MAINTENANCE, teamData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create maintenance team' };
    }
  },

  // Get all maintenance teams
  getAllMaintenanceTeams: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.READ_MAINTENANCE);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch maintenance teams' };
    }
  },

  // Get maintenance team by ID
  getMaintenanceTeamById: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.READ_MAINTENANCE}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch maintenance team' };
    }
  },

  // Update maintenance team - Backend expects: { name?, code?, description?, isActive? }
  updateMaintenanceTeam: async (id, teamData) => {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.UPDATE_MAINTENANCE}/${id}`, teamData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update maintenance team' };
    }
  },

  // Delete maintenance team
  deleteMaintenanceTeam: async (id) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.DELETE_MAINTENANCE}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete maintenance team' };
    }
  },

  // Get active maintenance teams only
  getActiveMaintenanceTeams: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.READ_MAINTENANCE);
      // Filter active teams on frontend
      if (response.data.data) {
        return {
          ...response.data,
          data: response.data.data.filter(team => team.isActive)
        };
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch active maintenance teams' };
    }
  },
};

export default maintenanceService;
