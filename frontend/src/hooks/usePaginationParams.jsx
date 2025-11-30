// src/hooks/usePaginationParams.jsx
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export function usePaginationParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => {
    const p = parseInt(searchParams.get('page') || '1', 10);
    return isNaN(p) || p < 1 ? 1 : p;
  }, [searchParams]);

  const limit = useMemo(() => {
    const l = parseInt(searchParams.get('limit') || '10', 10);
    return [10, 20, 50].includes(l) ? l : 10;
  }, [searchParams]);

  const sortOrder = useMemo(() => {
    const order = searchParams.get('sortOrder') || 'desc';
    return order === 'asc' || order === 'desc' ? order : 'desc';
  }, [searchParams]);

  const setPage = (newPage) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(newPage));
      return next;
    });
  };

  const setLimit = (newLimit) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('limit', String(newLimit));
      next.set('page', '1'); // Reset to first page
      return next;
    });
  };

  const setSortOrder = (newOrder) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('sortOrder', newOrder);
      next.set('page', '1'); // Reset to first page
      return next;
    });
  };

  return {
    page,
    limit,
    sortOrder,
    setPage,
    setLimit,
    setSortOrder,
  };
}

