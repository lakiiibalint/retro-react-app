import { useMutation, useQueryClient } from '@tanstack/react-query';

import { retroService } from '@/src/services/retro.service';

export const useUpdateColumn = (retroId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ columnId, body }: { columnId: number; body: { name?: string; position?: number } }) =>
      retroService.updateColumn(columnId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retro', projectId, retroId] });
    },
  });
};
