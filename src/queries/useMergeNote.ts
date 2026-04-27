import { useMutation, useQueryClient } from '@tanstack/react-query';

import { noteService } from '@/src/services/note.servise';

export const useMergeNote = (retroId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, targetNoteId, authorId }: { noteId: string; targetNoteId: string; authorId: number }) =>
      noteService.mergeNote(noteId, targetNoteId, authorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', retroId] });
    },
  });
};
