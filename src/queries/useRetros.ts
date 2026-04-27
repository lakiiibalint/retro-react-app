import { useQuery } from '@tanstack/react-query';

import { retroService } from '@/src/services/retro.service';

export const useRetros = (projectId: string) => {
  return useQuery({
    queryKey: ['retros', projectId],
    queryFn: () => retroService.getRetros(projectId),
  });
};
