import { useQuery } from '@tanstack/react-query';

import { projectService } from '@/src/services/project.service';

export const useProject = (id: string) => {
  return useQuery({
    queryFn: () => {
      return projectService.getProjectById(id);
    },
    queryKey: ['project', id],
  });
};
