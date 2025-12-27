// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
};

// API Endpoints
export const API_ENDPOINTS = {
  // User Auth
  LOGIN: '/user/login',
  CREATE_ACCOUNT: '/user/create-account',
  
  // Admin Routes (will be added later)
  CREATE_TECHNICIAN: '/admin/createTechnician',
  READ_TECHNICIAN: '/admin/readTechnician',
  UPDATE_TECHNICIAN: '/admin/updateTechnician',
  DELETE_TECHNICIAN: '/admin/deleteTechnician',
  CREATE_MAINTENANCE: '/admin/createMaintenance',
  READ_MAINTENANCE: '/admin/readMaintenance',
  UPDATE_MAINTENANCE: '/admin/updateMaintenance',
  DELETE_MAINTENANCE: '/admin/deleteMaintenance',
};

export default apiConfig;
