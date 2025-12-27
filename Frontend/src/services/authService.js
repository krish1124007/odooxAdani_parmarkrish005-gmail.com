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

// Authentication Service
const authService = {
  // Login user based on role - Backend expects: { email, password }
  login: async (credentials, role = 'user') => {
    try {
      let endpoint;
      switch (role) {
        case 'admin':
          endpoint = API_ENDPOINTS.ADMIN_LOGIN;
          break;
        case 'user':
          endpoint = API_ENDPOINTS.USER_LOGIN;
          break;
        case 'technician':
          endpoint = API_ENDPOINTS.TECHNICIAN_LOGIN;
          break;
        default:
          endpoint = API_ENDPOINTS.USER_LOGIN;
      }

      const response = await apiClient.post(endpoint, credentials);

      console.log('Login response:', response.data); // Debug log

      // Backend returns: { statusCode, message, data: { admin/user, token } }
      // Check if response is successful (statusCode 200-299)
      if (response.data && response.data.statusCode >= 200 && response.data.statusCode < 300) {
        const token = response.data.data?.token || response.data.data?.accessToken;
        if (token) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('userData', JSON.stringify(response.data.data));
          localStorage.setItem('userRole', role);
        }

        // Return success format for compatibility
        return {
          success: true,
          message: response.data.message,
          data: response.data.data
        };
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error); // Debug log
      throw error.response?.data || error;
    }
  },

  // Admin login - Backend expects: { email, password }
  adminLogin: async (credentials) => {
    return authService.login(credentials, 'admin');
  },

  // Logout user
  logout: async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('userRole');
    return { success: true, message: 'Logged out successfully' };
  },

  // Create account - Backend expects: { name, email, password, phone_number? }
  signup: async (userData, role = 'user') => {
    try {
      let endpoint;
      if (role === 'admin') {
        endpoint = API_ENDPOINTS.ADMIN_CREATE_ACCOUNT;
      } else if (role === 'technician') {
        endpoint = API_ENDPOINTS.TECHNICIAN_CREATE_ACCOUNT;
      } else {
        endpoint = API_ENDPOINTS.USER_CREATE_ACCOUNT;
      }

      const response = await apiClient.post(endpoint, userData);

      // Backend returns: { statusCode, message, data: { ...user } }
      if (response.data && response.data.statusCode >= 200 && response.data.statusCode < 300) {
        return {
          success: true,
          message: response.data.message,
          data: response.data.data
        };
      } else {
        throw new Error(response.data.message || 'Signup failed');
      }
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get current user from localStorage
  getCurrentUser: async () => {
    const userData = localStorage.getItem('userData');
    const userRole = localStorage.getItem('userRole');
    if (userData) {
      return {
        ...JSON.parse(userData),
        role: userRole || 'user'
      };
    }
    return null;
  },

  // Get current user role
  getUserRole: () => {
    return localStorage.getItem('userRole') || null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('authToken');
  }
};

export default authService;
