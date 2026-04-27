import { useQuery } from '@tanstack/react-query';

import { actionItemService } from '@/src/services/action-item.service';

export const useActionItem = (projectId: string) => {
  return useQuery({
    queryKey: ['actionItems', projectId],
    queryFn: () => actionItemService.getActionItems(projectId),
  });
};
