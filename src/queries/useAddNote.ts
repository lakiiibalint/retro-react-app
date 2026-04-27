import { useMutation, useQueryClient } from '@tanstack/react-query';

import { noteService } from '@/src/services/note.servise';

export const useAddNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      projectId,
      retroId,
      body,
    }: {
      projectId: string;
      retroId: string;
      body: { text: string; color: string; columnId: number; order: string };
    }) => {
      return noteService.addNote(projectId, retroId, body);
    },
    onSuccess: (_, { projectId, retroId }) => {
      queryClient.invalidateQueries({ queryKey: ['retro', projectId, retroId] });
    },
  });
};
