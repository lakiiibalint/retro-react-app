import { useMutation } from '@tanstack/react-query';

import { authService } from '@/src/services/auth.service';

export const useLogout = () => {
  return useMutation({
    mutationFn: () => authService.logout(),
  });
};
