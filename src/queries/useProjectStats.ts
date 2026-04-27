import { useQuery } from '@tanstack/react-query';

import { projectService } from '@/src/services/project.service';

export const useProjectStats = (projectId: string) => {
  return useQuery({
    queryKey: ['stats', projectId],
    queryFn: () => projectService.getProjectStats(projectId),
  });
};
