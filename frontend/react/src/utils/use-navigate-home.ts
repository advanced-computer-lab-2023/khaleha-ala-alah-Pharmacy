import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export function useNavigateHome() {
  const navigate = useNavigate();

  return useCallback(() => navigate('/'), []);
}
