import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initAuth = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                const userRole = authService.getUserRole();

                if (currentUser && authService.isAuthenticated()) {
                    setUser(currentUser);
                    setRole(userRole);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    // Login function
    const login = async (credentials, userRole = 'user') => {
        try {
            const response = await authService.login(credentials, userRole);

            if (response.success) {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
                setRole(userRole);
                setIsAuthenticated(true);
                return response;
            }

            throw new Error(response.message || 'Login failed');
        } catch (error) {
            throw error;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            setRole(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Check if user has specific role
    const hasRole = (requiredRole) => {
        return role === requiredRole;
    };

    const value = {
        user,
        role,
        isAuthenticated,
        isLoading,
        login,
        logout,
        hasRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
