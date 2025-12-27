// Custom Hook: useAuth
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Implementation pending

  return {
    user,
    loading,
    isAuthenticated,
    login: () => {},
    logout: () => {},
    signup: () => {}
  };
};

export default useAuth;
