import { useMutation, useQueryClient } from '@tanstack/react-query';

import { retroService } from '@/src/services/retro.service';

export const useAddColumn = (retroId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { name: string; position: number }) => retroService.addColumn(retroId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retro', projectId, retroId] });
    },
  });
};
