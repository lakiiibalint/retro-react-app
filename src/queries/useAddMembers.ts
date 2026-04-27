import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectService } from '@/src/services/project.service';

export const useAddMembers = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userIds: number[]) => projectService.addMembers(projectId, userIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
