import { useMutation, useQueryClient } from '@tanstack/react-query';

import { retroService } from '@/src/services/retro.service';

export const useUpdateColumnPosition = (retroId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ columnId, swapWithColumnId }: { columnId: number; swapWithColumnId: number }) =>
      retroService.updateColumnPosition(columnId, swapWithColumnId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retro', projectId, retroId] });
    },
  });
};
