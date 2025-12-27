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
  // Login user - Backend expects: { email, password }
  login: async (credentials) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
      
      // Backend returns: { success, message, data: { ...user, accessToken } }
      if (response.data.data && response.data.data.accessToken) {
        localStorage.setItem('authToken', response.data.data.accessToken);
        localStorage.setItem('userData', JSON.stringify(response.data.data));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },
  
  // Logout user
  logout: async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    return { success: true, message: 'Logged out successfully' };
  },
  
  // Create account - Backend expects: { name, email, password, phone_number? }
  signup: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CREATE_ACCOUNT, userData);
      
      // Backend returns: { success, message, data: { ...user } }
      // Note: User needs to login separately after signup
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Signup failed' };
    }
  },
  
  // Get current user from localStorage
  getCurrentUser: async () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
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
