import { useAppSelector } from '@/src/hooks/store.hooks';

export const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  return {
    user,
    isPM: user?.role === 'PM',
  };
};
