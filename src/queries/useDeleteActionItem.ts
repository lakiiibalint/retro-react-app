import { useMutation, useQueryClient } from '@tanstack/react-query';

import { actionItemService } from '@/src/services/action-item.service';

export const useDeleteActionItem = (projectId: string, retroId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (actionId: string) => {
      return actionItemService.deleteActionItem(actionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retro', projectId, retroId] });
    },
  });
};
