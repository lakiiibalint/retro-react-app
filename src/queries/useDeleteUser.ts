import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userService } from '@/src/services/user.service';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => userService.deleteUser(userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
};
