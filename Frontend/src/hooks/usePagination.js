// Custom Hook: usePagination
import { useState } from 'react';

const usePagination = (initialPage = 1, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  return {
    currentPage,
    pageSize,
    goToPage,
    nextPage,
    prevPage,
    setPageSize
  };
};

export default usePagination;
