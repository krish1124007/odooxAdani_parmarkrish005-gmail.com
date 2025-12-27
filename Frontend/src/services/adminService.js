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

// Admin Service for all admin operations
const adminService = {
    // Helper to normalize response
    normalizeResponse: (response) => {
        if (response && response.statusCode >= 200 && response.statusCode < 300) {
            return {
                success: true,
                message: response.message,
                data: response.data
            };
        }
        return response;
    },

    // ==================== Technician Management ====================

    // Get all technicians
    getTechnicians: async () => {
        try {
            const response = await apiClient.get(API_ENDPOINTS.READ_TECHNICIAN);
            return adminService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch technicians' };
        }
    },

    // Create new technician
    createTechnician: async (technicianData) => {
        try {
            const response = await apiClient.post(API_ENDPOINTS.CREATE_TECHNICIAN, technicianData);
            return adminService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to create technician' };
        }
    },

    // Update technician
    updateTechnician: async (id, technicianData) => {
        try {
            const response = await apiClient.put(`${API_ENDPOINTS.UPDATE_TECHNICIAN}/${id}`, technicianData);
            return adminService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update technician' };
        }
    },

    // Delete technician
    deleteTechnician: async (id) => {
        try {
            const response = await apiClient.delete(`${API_ENDPOINTS.DELETE_TECHNICIAN}/${id}`);
            return adminService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to delete technician' };
        }
    },

    // ==================== Maintenance Team Management ====================

    // Get all maintenance teams
    getMaintenanceTeams: async () => {
        try {
            const response = await apiClient.get(API_ENDPOINTS.READ_MAINTENANCE);
            return adminService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch maintenance teams' };
        }
    },

    // Create new maintenance team
    createMaintenanceTeam: async (teamData) => {
        try {
            const response = await apiClient.post(API_ENDPOINTS.CREATE_MAINTENANCE, teamData);
            return adminService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to create maintenance team' };
        }
    },

    // Update maintenance team
    updateMaintenanceTeam: async (id, teamData) => {
        try {
            const response = await apiClient.put(`${API_ENDPOINTS.UPDATE_MAINTENANCE}/${id}`, teamData);
            return adminService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update maintenance team' };
        }
    },

    // Delete maintenance team
    deleteMaintenanceTeam: async (id) => {
        try {
            const response = await apiClient.delete(`${API_ENDPOINTS.DELETE_MAINTENANCE}/${id}`);
            return adminService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to delete maintenance team' };
        }
    },

    // ==================== Equipment Management ====================

    // Get all equipment
    getEquipment: async () => {
        try {
            const response = await apiClient.get(API_ENDPOINTS.READ_EQUIPMENT);
            return adminService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch equipment' };
        }
    },

    // Add new equipment
    addEquipment: async (equipmentData) => {
        try {
            const response = await apiClient.post(API_ENDPOINTS.ADD_EQUIPMENT, equipmentData);
            return adminService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to add equipment' };
        }
    },

    // Update equipment
    updateEquipment: async (id, equipmentData) => {
        try {
            const response = await apiClient.put(`${API_ENDPOINTS.UPDATE_EQUIPMENT}/${id}`, equipmentData);
            return adminService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update equipment' };
        }
    },

    // Delete equipment
    deleteEquipment: async (id) => {
        try {
            const response = await apiClient.delete(`${API_ENDPOINTS.DELETE_EQUIPMENT}/${id}`);
            return adminService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to delete equipment' };
        }
    },
};

export default adminService;
