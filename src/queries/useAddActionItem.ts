import { useMutation, useQueryClient } from '@tanstack/react-query';

import { actionItemService } from '@/src/services/action-item.service';

export const useAddActionItem = (projectId: string, retroId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: {
      name: string;
      description?: string;
      dueDate?: string;
      boardId: string;
      assignedId?: string;
      order?: string;
    }) => actionItemService.addActionItem(body, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retro', projectId, retroId] });
    },
  });
};
