import { useMutation, useQueryClient } from '@tanstack/react-query';

import { noteService } from '@/src/services/note.servise';

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ noteId }: { noteId: string; projectId: string; retroId: string }) => {
      return noteService.deleteNote(noteId);
    },
    onSuccess: (_, { projectId, retroId }) => {
      queryClient.invalidateQueries({ queryKey: ['retro', projectId, retroId] });
    },
  });
};
