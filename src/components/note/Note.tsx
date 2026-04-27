import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { useMemo } from 'react';

import { IconName, IconSize } from '@/src/assets/iconCollection';
import { Button } from '@/src/components/button/Button';
import { Icon } from '@/src/components/icon/Icon';
import { NoteModel, VoteType } from '@/src/models/note.model';
import { useAuth } from '@/src/queries/useAuth';
import { useVoteNote } from '@/src/queries/useVoteNote';

interface NoteProps {
  projectId: string;
  retroId: string;
  note: NoteModel;
  isRetroActive: boolean;
  onDeleteNote: (noteId: string) => void;
  onEditNote: (note: NoteModel) => void;
  authorName: string;
  onToAction: (note: NoteModel) => void;
  isSelected: boolean;
  isMergeable: boolean;
  onSelectMerge: (note: NoteModel) => void;
  onMergeTarget: (note: NoteModel) => void;
}

export const Note = ({
  note,
  isRetroActive,
  onDeleteNote,
  onEditNote,
  authorName,
  onToAction,
  isSelected,
  isMergeable,
  onSelectMerge,
  onMergeTarget,
  projectId,
  retroId,
}: NoteProps) => {
  const { isPM } = useAuth();
  const { mutate: voteNote } = useVoteNote();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: note.id });

  const handleAgree = () => {
    voteNote({ noteId: Number(note.id), type: VoteType.AGREE, projectId, retroId });
  };

  const handleDisagree = () => {
    voteNote({ noteId: Number(note.id), type: VoteType.DISAGREE, projectId, retroId });
  };

  const handleEdit = () => {
    onEditNote(note);
  };

  const handleDelete = () => {
    onDeleteNote(note.id);
  };

  const handleToAction = () => {
    onToAction(note);
  };

  const handleSelectMerge = () => {
    onSelectMerge(note);
  };

  const handleMergeTarget = () => {
    onMergeTarget(note);
  };

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const staticStyle = useMemo(
    () => ({
      borderLeft: `3px solid ${note.color}`,
    }),
    [note.color]
  );

  const dynamicStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={clsx(
        'relative mb-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md',
        isSelected && 'cursor-pointer ring-2 ring-blue-500',
        isMergeable && 'cursor-pointer ring-2 ring-green-500'
      )}
      style={{ ...staticStyle, ...dynamicStyle }}
      ref={setNodeRef}
      onClick={handleStopPropagation}
    >
      {isMergeable && <div className="absolute inset-0 z-10" onClick={handleMergeTarget} />}
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <p className="mb-1 text-sm leading-relaxed text-gray-700">{note.text}</p>
      </div>
      <div className="flex-start flex">
        <span className="text-xs text-gray-400">{authorName}</span>
      </div>
      <div className="flex items-center justify-between">
        {isRetroActive && (
          <div className="mt-2 flex items-center gap-1">
            <Button
              onClick={handleAgree}
              className="flex items-center gap-1 rounded-md bg-green-50 px-2 py-1 text-xs font-bold text-green-600 transition hover:bg-green-100"
            >
              <Icon name={IconName.THUMBS_UP} size={IconSize.MD} color="green" /> {note.agree}
            </Button>
            <Button
              onClick={handleDisagree}
              className="flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-500 transition hover:bg-red-100"
            >
              <Icon name={IconName.THUMBS_DOWN} size={IconSize.MD} color="red" /> {note.disagree}
            </Button>

            <Button onClick={handleEdit} className="rounded-md p-1 text-xs transition hover:bg-blue-200">
              <Icon name={IconName.EDIT} size={IconSize.MD} color="blue" />
            </Button>
            <Button onClick={handleDelete} className="rounded-md p-1 text-xs transition hover:bg-red-200">
              <Icon name={IconName.DELETE} size={IconSize.MD} color="red" />
            </Button>
            {isPM && (
              <>
                <Button onClick={handleToAction} className="rounded-md p-1 text-xs transition hover:bg-orange-200">
                  <Icon name={IconName.ACTION} size={IconSize.MD} color="orange" />
                </Button>
                <Button
                  onClick={handleSelectMerge}
                  className={clsx(
                    'cursor-pointer rounded-md p-1 text-xs transition hover:bg-orange-200',
                    isSelected && 'bg-orange-200'
                  )}
                >
                  <Icon name={IconName.MERGE} size={IconSize.MD} color="orange"></Icon>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
