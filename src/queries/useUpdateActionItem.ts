import { useMutation, useQueryClient } from '@tanstack/react-query';

import { actionItemService } from '@/src/services/action-item.service';

export const useUpdateActionItem = (projectId: string, retroId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      actionId,
      body,
    }: {
      actionId: string;
      body: {
        name?: string;
        description?: string;
        status?: string;
        dueDate?: string;
        assignedId?: string;
      };
    }) => actionItemService.updateActionItem(actionId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retro', projectId, retroId] });
    },
  });
};
