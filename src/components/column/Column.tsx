import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { ActionItem } from '@/src/components/action-item/ActionItem';
import { Button } from '@/src/components/button/Button';
import { Note } from '@/src/components/note/Note';
import { ActionItemModel } from '@/src/models/action-items-model';
import { ColumnModel, ColumnType } from '@/src/models/column.model';
import { NoteModel } from '@/src/models/note.model';
import { useAuth } from '@/src/queries/useAuth';

interface ColumnProps {
  column: ColumnModel;
  notes: NoteModel[];
  isRetroActive: boolean;
  onAddNote: (columnId: number) => void;
  onDeleteNote: (noteId: string) => void;
  onEditNote: (note: NoteModel) => void;
  onToAction: (note: NoteModel) => void;
  onEditActionItem: (actionItem: ActionItemModel) => void;
  actionItems: ActionItemModel[];
  userMap: Record<string, string>;
  projectId: string;
  retroId: string;
  onDeleteAction: (actionId: string) => void;
  onSelectMerge: (note: NoteModel) => void;
  onMergeTarget: (note: NoteModel) => void;
  noteToMerge: NoteModel | null;
}

export const Column = ({
  column,
  notes = [],
  isRetroActive,
  onAddNote,
  onDeleteNote,
  onEditNote,
  userMap,
  actionItems = [],
  retroId,
  projectId,
  onToAction,
  onEditActionItem,
  onDeleteAction,
  onMergeTarget,
  onSelectMerge,
  noteToMerge,
}: ColumnProps) => {
  const handleAddNote = () => onAddNote(column.id);

  const { isPM } = useAuth();

  const noteIds = notes.map((n) => n.id);

  const isActionColumn = column.columnType === ColumnType.ACTION_ITEMS;
  console.log(isActionColumn);

  const checkIsMergeable = (targetNote: NoteModel) => {
    if (!noteToMerge || noteToMerge.id === targetNote.id) return false;
    return (
      noteToMerge.color === targetNote.color &&
      noteToMerge.text === targetNote.text &&
      noteToMerge.columnId === targetNote.columnId
    );
  };

  return (
    <>
      <section className="mr-6 flex w-[255px] flex-col self-start rounded-2xl border border-gray-300 bg-white shadow">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h2 className="truncate text-lg font-semibold text-blue-800" title={column.name}>
            {column.name}
          </h2>
          {isRetroActive && (isPM || !isActionColumn) && (
            <Button
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-200"
              onClick={handleAddNote}
            >
              + {/*TODO +-t cserélni SVG-re*/}
            </Button>
          )}
        </div>
        {isActionColumn ? (
          <SortableContext
            items={actionItems.map((actionItem) => actionItem.actionId)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-1 flex-col gap-2 p-4">
              {actionItems.map((actionItem) => (
                <ActionItem
                  key={actionItem.actionId}
                  actionItem={actionItem}
                  assigneeName={userMap[actionItem.assignedId ?? '']}
                  projectId={projectId}
                  retroId={retroId}
                  onEdit={onEditActionItem}
                  onDelete={onDeleteAction}
                  isRetroActive={isRetroActive}
                />
              ))}
            </div>
          </SortableContext>
        ) : (
          <SortableContext items={noteIds} strategy={verticalListSortingStrategy}>
            <div className="flex flex-1 flex-col gap-2 p-4">
              {notes.map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  isRetroActive={isRetroActive}
                  onDeleteNote={onDeleteNote}
                  onEditNote={onEditNote}
                  authorName={userMap[note.authorId]}
                  onToAction={onToAction}
                  isSelected={noteToMerge?.id === note.id}
                  isMergeable={checkIsMergeable(note)}
                  onSelectMerge={onSelectMerge}
                  onMergeTarget={onMergeTarget}
                  projectId={projectId}
                  retroId={retroId}
                />
              ))}
            </div>
          </SortableContext>
        )}
      </section>
    </>
  );
};
