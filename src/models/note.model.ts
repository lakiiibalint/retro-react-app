export interface NoteModel {
  id: string;
  text: string;
  color: string;
  columnId: number;
  retroId: string;
  order: string;
  authorId: number;
  agree: number;
  disagree: number;
}

export const enum VoteType {
  AGREE = 'agree',
  DISAGREE = 'disagree',
}
