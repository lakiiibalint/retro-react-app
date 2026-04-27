import { ReactNode } from 'react';
import { Navigate } from 'react-router';

import { useAuth } from '@/src/queries/useAuth';

interface PMRouteProps {
  children: ReactNode;
}

export const PMRoute = ({ children }: PMRouteProps) => {
  const { isPM } = useAuth();

  if (!isPM) return <Navigate to="/" />;

  return <>{children}</>;
};
