import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectService } from '@/src/services/project.service';

export const useAddProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { name: string; description: string; coverImage?: string; memberIds: number[] }) =>
      projectService.addProject(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
