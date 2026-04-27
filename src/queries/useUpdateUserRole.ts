import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserRole } from '@/src/models/user.model';
import { userService } from '@/src/services/user.service';

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: { userId: number; role: UserRole }) => userService.updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
