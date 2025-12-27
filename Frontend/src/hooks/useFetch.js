// Custom Hook: useFetch
import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Implementation pending

  return { data, loading, error, refetch: () => {} };
};

export default useFetch;
