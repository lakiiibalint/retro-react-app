import { useMutation } from '@tanstack/react-query';

import { authService } from '@/src/services/auth.service';

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => authService.login(email, password),
  });
};
