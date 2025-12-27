// Custom Hook: useToast
import { useState } from 'react';

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info', duration = 3000) => {
    // Implementation pending
  };

  const hideToast = (id) => {
    // Implementation pending
  };

  return { toasts, showToast, hideToast };
};

export default useToast;
