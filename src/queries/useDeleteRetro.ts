import { useMutation, useQueryClient } from '@tanstack/react-query';

import { retroService } from '@/src/services/retro.service';

export const useDeleteRetro = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (retroId: string) => retroService.deleteRetro(projectId, retroId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retros', projectId] });
    },
  });
};
