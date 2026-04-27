import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectService } from '@/src/services/project.service';

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { name?: string; description?: string; coverImage?: string }) =>
      projectService.updateProject(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
