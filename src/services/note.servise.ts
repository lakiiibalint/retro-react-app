import { mockNotes } from '@/src/mocks/notes.mock';
import { NoteModel } from '@/src/models/note.model';
import request, { Methods } from '@/src/utils/request';

class NoteService {
  async getNotes(retroId: string): Promise<NoteModel[]> {
    return request<NoteModel[]>({
      resource: `/api/retros/${retroId}/notes`,
      method: Methods.GET,
    });
  }

  async voteNote(noteId: number, type: 'agree' | 'disagree'): Promise<{ agree: number; disagree: number }> {
    return request<{ agree: number; disagree: number }>({
      resource: `/api/notes/${noteId}/vote`,
      method: Methods.POST,
      body: type === 'agree',
    });
  }

  async addNote(
    projectId: string,
    retroId: string,
    body: { text: string; color: string; columnId: number; order: string }
  ): Promise<NoteModel> {
    return request<NoteModel>({
      resource: `/api/retros/${retroId}/notes`,
      method: Methods.POST,
      body: {
        description: body.text,
        color: body.color,
        columnId: Number(body.columnId),
        position: body.order ?? '',
      },
    });
  }

  async editNote(
    noteId: string,
    body: { text?: string; color?: string; columnId?: number; order?: string }
  ): Promise<NoteModel> {
    return request<NoteModel>({
      resource: `/api/notes/${noteId}`,
      method: Methods.PUT,
      body: {
        description: body.text,
        color: body.color,
        columnId: body.columnId,
        position: body.order ?? '',
      },
    });
  }

  async deleteNote(noteId: string): Promise<void> {
    return request<void>({
      resource: `/api/notes/${noteId}`,
      method: Methods.DELETE,
    });
  }

  async mergeNote(noteId: string, targetNoteId: string, authorId: number): Promise<NoteModel> {
    const note = mockNotes.find((nt) => nt.id === noteId);
    const targetNote = mockNotes.find((nt) => nt.id === targetNoteId);

    const noteIndex = mockNotes.findIndex((nt) => nt.id === noteId);
    const targetIndex = mockNotes.findIndex((nt) => nt.id === targetNoteId);

    mockNotes.splice(Math.max(noteIndex, targetIndex), 1);
    mockNotes.splice(Math.min(noteIndex, targetIndex), 1);

    if (!note || !targetNote) throw new Error('Nincs ilyen note');

    const mergedNote: NoteModel = {
      id: crypto.randomUUID(),
      text: note.text,
      color: note.color,
      columnId: note.columnId,
      retroId: note.retroId,
      order: note.order,
      authorId: authorId,
      agree: note.agree + targetNote.agree,
      disagree: note.disagree + targetNote.disagree,
    };
    mockNotes.push(mergedNote);
    return Promise.resolve({ ...mergedNote });
  }
}

export const noteService = new NoteService();
