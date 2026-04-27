import { useMutation, useQueryClient } from '@tanstack/react-query';

import { retroService } from '@/src/services/retro.service';

export const useAddRetro = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, body }: { projectId: string; body: { name: string; description?: string } }) =>
      retroService.addRetro(projectId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retros'] });
    },
  });
};
