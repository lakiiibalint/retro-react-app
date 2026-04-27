import { useQuery } from '@tanstack/react-query';

import { retroService } from '@/src/services/retro.service';

export const useRetro = (projectId: string, retroId: string) => {
  return useQuery({
    queryKey: ['retro', projectId, retroId],
    queryFn: () => retroService.getRetroById(projectId, retroId),
  });
};
