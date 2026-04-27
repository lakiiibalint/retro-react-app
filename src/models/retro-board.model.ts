import { ActionItemModel } from '@/src/models/action-items-model';
import { ColumnModel } from '@/src/models/column.model';
import { NoteModel } from '@/src/models/note.model';
import { RetroModel } from '@/src/models/retro.model';

export interface RetroBoardResponse {
  retro: RetroModel;
  columns: ColumnModel[];
  notes: NoteModel[];
  actionItems: ActionItemModel[];
}
