import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, isLoading, role } = useAuth();

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check role if required
    if (requiredRole && role !== requiredRole) {
        // Redirect to appropriate dashboard based on role
        switch (role) {
            case 'admin':
                return <Navigate to="/dashboard" replace />;
            case 'user':
                return <Navigate to="/user" replace />;
            case 'technician':
                return <Navigate to="/technician" replace />;
            default:
                return <Navigate to="/login" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
