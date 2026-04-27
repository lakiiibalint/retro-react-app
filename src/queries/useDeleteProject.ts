import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectService } from '@/src/services/project.service';

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return projectService.deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
