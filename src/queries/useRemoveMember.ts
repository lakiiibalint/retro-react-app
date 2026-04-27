import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectService } from '@/src/services/project.service';

export const useRemoveMember = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => projectService.removeMember(projectId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
