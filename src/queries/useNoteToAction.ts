import { useMutation, useQueryClient } from '@tanstack/react-query';

import { actionItemService } from '@/src/services/action-item.service';

export const useNoteToAction = (projectId: string, retroId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      noteId,
      body,
    }: {
      noteId: string;
      body: {
        name: string;
        description: string;
        assignedId?: string;
        status: string;
        dueDate?: string;
        projectId: string;
      };
    }) => actionItemService.noteToActionItem(noteId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retro', projectId, retroId] });
    },
  });
};
