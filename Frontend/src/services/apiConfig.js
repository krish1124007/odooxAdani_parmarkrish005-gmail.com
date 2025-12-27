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
  USER_LOGIN: '/user/login',
  USER_CREATE_ACCOUNT: '/user/create-account',

  // Admin Auth
  ADMIN_LOGIN: '/admin/login',
  ADMIN_CREATE_ACCOUNT: '/admin/create-account',

  // Technician Management
  CREATE_TECHNICIAN: '/admin/createTechnician',
  READ_TECHNICIAN: '/admin/readTechnician',
  UPDATE_TECHNICIAN: '/admin/updateTechnician',
  DELETE_TECHNICIAN: '/admin/deleteTechnician',

  // Maintenance Team Management
  CREATE_MAINTENANCE: '/admin/createMaintenance',
  READ_MAINTENANCE: '/admin/readMaintenance',
  UPDATE_MAINTENANCE: '/admin/updateMaintenance',
  DELETE_MAINTENANCE: '/admin/deleteMaintenance',

  // Equipment Management (Note: Backend uses "Quipment" spelling)
  ADD_EQUIPMENT: '/admin/addQuipment',
  READ_EQUIPMENT: '/admin/readQuipment',
  UPDATE_EQUIPMENT: '/admin/updateQuipment',
  DELETE_EQUIPMENT: '/admin/deleteQuipment',

  // User Request Management
  USER_CREATE_REQUEST: '/user/create-request',
  USER_READ_REQUEST: '/user/read-request',
  USER_SUGGESTION: '/user/suggestion',

  // Technician Specific
  TECHNICIAN_LOGIN: '/technician/login',
  TECHNICIAN_CREATE_ACCOUNT: '/technician/create-account',
  TECHNICIAN_REFRESH_TOKEN: '/technician/refresh-token',

  // Comments (Shared pattern, but URLs are usually /api/v1/user/:id/...)
  // The router defines: /:requestId/add-comment, etc. 
  // We will construct these URLs dynamically in the services.
};

export default apiConfig;
