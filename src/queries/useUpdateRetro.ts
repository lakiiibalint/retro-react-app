import { useMutation, useQueryClient } from '@tanstack/react-query';

import { retroService } from '@/src/services/retro.service';

export const useUpdateRetro = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ retroId, isActive }: { retroId: string; isActive: boolean | null }) =>
      retroService.updateRetro(projectId, retroId, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retros', projectId] });
    },
  });
};
