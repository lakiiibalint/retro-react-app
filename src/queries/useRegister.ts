import { useMutation } from '@tanstack/react-query';

import { authService } from '@/src/services/auth.service';

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      authService.register(name, email, password),
  });
};
