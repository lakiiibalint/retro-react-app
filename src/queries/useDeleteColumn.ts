import { useMutation, useQueryClient } from '@tanstack/react-query';

import { retroService } from '@/src/services/retro.service';

export const useDeleteColumn = (retroId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (columnId: number) => {
      return retroService.deleteColumn(columnId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retro', projectId, retroId] });
    },
  });
};
