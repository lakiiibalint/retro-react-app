import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { authService } from '@/src/services/auth.service';
import { setUser } from '@/src/store/slices/authSlice';

export const useMe = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ['me'],
    queryFn: () => authService.me(),
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setUser(query.data));
    }
  }, [query.data, dispatch]);

  return query;
};
