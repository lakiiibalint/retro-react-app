import { useMutation, useQueryClient } from '@tanstack/react-query';

import { noteService } from '@/src/services/note.servise';

export const useEditNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      noteId,
      body,
    }: {
      noteId: string;
      projectId: string;
      retroId: string;
      body: { text?: string; color?: string; columnId?: number; order?: string };
    }) => {
      return noteService.editNote(noteId, body);
    },
    onSuccess: (_, { projectId, retroId }) => {
      queryClient.invalidateQueries({ queryKey: ['retro', projectId, retroId] });
    },
  });
};
