import { useQuery } from '@tanstack/react-query';

import { ProjectModel } from '@/src/models/project.model';
import { projectService } from '@/src/services/project.service';

export const useProjects = () => {
  return useQuery<ProjectModel[]>({
    queryKey: ['projects'],
    queryFn: () => projectService.getProjects(),
  });
};
