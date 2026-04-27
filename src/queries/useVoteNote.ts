import { useMutation, useQueryClient } from '@tanstack/react-query';

import { noteService } from '@/src/services/note.servise';

export const useVoteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      noteId,
      type,
    }: {
      noteId: number;
      type: 'agree' | 'disagree';
      projectId: string;
      retroId: string;
    }) => {
      return noteService.voteNote(noteId, type);
    },
    onSuccess: (_, { projectId, retroId }) => {
      queryClient.invalidateQueries({ queryKey: ['retro', projectId, retroId] });
    },
  });
};
