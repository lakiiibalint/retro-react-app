import { ReactNode } from 'react';
import { Navigate } from 'react-router';

import { useAuth } from '@/src/queries/useAuth';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};
