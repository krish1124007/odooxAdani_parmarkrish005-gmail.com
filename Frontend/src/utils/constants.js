// Constants

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    SIGNUP: '/auth/signup',
    REFRESH: '/auth/refresh'
  },
  EQUIPMENT: {
    BASE: '/equipment',
    BY_ID: (id) => `/equipment/${id}`,
    MAINTENANCE_HISTORY: (id) => `/equipment/${id}/maintenance`
  },
  REQUESTS: {
    BASE: '/requests',
    BY_ID: (id) => `/requests/${id}`,
    UPDATE_STATUS: (id) => `/requests/${id}/status`
  },
  TEAMS: {
    BASE: '/teams',
    BY_ID: (id) => `/teams/${id}`,
    MEMBERS: (id) => `/teams/${id}/members`
  },
  SCHEDULE: {
    BASE: '/schedule',
    CALENDAR: '/schedule/calendar'
  },
  CATEGORIES: {
    MAINTENANCE: '/categories/maintenance',
    DEPARTMENTS: '/categories/departments',
    LOCATIONS: '/categories/locations',
    ASSETS: '/categories/assets'
  }
};

// Maintenance Request Status
export const REQUEST_STATUS = {
  NEW: 'new',
  IN_PROGRESS: 'in_progress',
  REPAIRED: 'repaired',
  SCRAP: 'scrap'
};

// Maintenance Types
export const MAINTENANCE_TYPES = {
  CORRECTIVE: 'corrective',
  PREVENTIVE: 'preventive'
};

// Equipment Status
export const EQUIPMENT_STATUS = {
  ACTIVE: 'active',
  UNDER_MAINTENANCE: 'under_maintenance',
  SCRAP: 'scrap'
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  TECHNICIAN: 'technician',
  USER: 'user'
};

// Toast Types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};
