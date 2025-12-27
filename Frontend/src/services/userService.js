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

const userService = {
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

    // Create a new request
    createRequest: async (requestData) => {
        try {
            // requestData should include: equipment_id, description, department, priority, images (if any)
            // Note: If images are involved, headers might need 'multipart/form-data', but backend routes suggest JSON mostly unless established otherwise.
            // Assuming JSON for now based on other services.
            const response = await apiClient.post(API_ENDPOINTS.USER_CREATE_REQUEST, requestData);
            return userService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to create request' };
        }
    },

    // Read user's requests
    getMyRequests: async () => {
        try {
            const response = await apiClient.get(API_ENDPOINTS.USER_READ_REQUEST);
            return userService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch requests' };
        }
    },

    // Submit a suggestion
    submitSuggestion: async (suggestionData) => {
        try {
            // suggestionData: { suggestion_text } presumably
            const response = await apiClient.get(API_ENDPOINTS.USER_SUGGESTION, { params: suggestionData });
            // Note: Route is GET /suggestion in user.routes.ts, usually GET doesn't have body, so maybe query params?
            // Or it might be a mistake in backend router definition (usually submit is POST).
            // Checking user.routes.ts: router.route("/suggestion").get(authMiddleware, suggestion)
            // It is indeed GET.
            return userService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to submit suggestion' };
        }
    },

    // Add comment to a request
    addComment: async (requestId, commentData) => {
        try {
            const response = await apiClient.post(`/user/${requestId}/add-comment`, commentData);
            return userService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to add comment' };
        }
    },

    // Get comments for a request
    getComments: async (requestId) => {
        try {
            const response = await apiClient.get(`/user/${requestId}/get-comments`);
            return userService.normalizeResponse(response.data);
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch comments' };
        }
    }
};

export default userService;
