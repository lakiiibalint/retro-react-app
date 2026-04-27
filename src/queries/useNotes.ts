import { useQuery } from '@tanstack/react-query';

import { noteService } from '@/src/services/note.servise';

export const useNotes = (retroId: string) => {
  return useQuery({
    queryKey: ['notes', retroId],
    queryFn: () => noteService.getNotes(retroId),
  });
};
