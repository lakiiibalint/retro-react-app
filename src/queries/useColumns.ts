import { useQuery } from '@tanstack/react-query';

import { retroService } from '@/src/services/retro.service';

export const useColumns = (retroId: string) => {
  return useQuery({
    queryKey: ['columns', retroId],
    queryFn: () => retroService.getColumns(retroId),
  });
};
