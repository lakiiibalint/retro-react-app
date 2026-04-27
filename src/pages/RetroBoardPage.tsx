import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { generateKeyBetween } from 'fractional-indexing';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { IconName, IconSize } from '@/src/assets/iconCollection';
import { Button, ButtonVariants } from '@/src/components';
import { AddActionFormType, AddActionItemModal } from '@/src/components/add-action-item-modal/AddActionItemModal';
import { AddNoteFormType, AddNoteModal } from '@/src/components/add-note-modal/AddNoteModal';
import { Column } from '@/src/components/column/Column';
import { Icon } from '@/src/components/icon/Icon';
import { Modal } from '@/src/components/modal/Modal';
import { Sidebar } from '@/src/components/sidebar/Sidebar';
import { ActionItemModel } from '@/src/models/action-items-model';
import { ColumnType } from '@/src/models/column.model';
import { NoteModel } from '@/src/models/note.model';
import { useAddActionItem } from '@/src/queries/useAddActionItem';
import { useAddNote } from '@/src/queries/useAddNote';
import { useAuth } from '@/src/queries/useAuth';
import { useDeleteActionItem } from '@/src/queries/useDeleteActionItem';
import { useDeleteNote } from '@/src/queries/useDeleteNote';
import { useEditNote } from '@/src/queries/useEditNote';
import { useMergeNote } from '@/src/queries/useMergeNote';
import { useNoteToAction } from '@/src/queries/useNoteToAction';
import { useRetro } from '@/src/queries/useRetro';
import { useUpdateActionItem } from '@/src/queries/useUpdateActionItem';
import { useUpdateRetro } from '@/src/queries/useUpdateRetro';
import { useUsers } from '@/src/queries/useUsers';

export const RetroBoardPage = () => {
  const { t } = useTranslation();

  const { retroId, id } = useParams<{ retroId: string; id: string }>();

  const { data: retroBoard, isLoading: retroLoading, isError: retroError } = useRetro(id ?? '', retroId ?? '');
  const retro = retroBoard?.retro;
  const columns = retroBoard?.columns;
  const notes = retroBoard?.notes;
  const actionItems = retroBoard?.actionItems;
  const { data: users } = useUsers();

  console.log('actionItems:', actionItems);

  const [activeColumnId, setActiveColumnId] = useState<number | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [showActionItemModal, setShowActionItemModal] = useState(false);
  const [noteForAction, setNoteForAction] = useState<NoteModel | null>(null);
  const [actionItemToEdit, setActionItemToEdit] = useState<ActionItemModel | null>(null);
  const [actionItemToDelete, setActionItemToDelete] = useState<string | null>(null);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [noteToMerge, setNoteToMerge] = useState<NoteModel | null>(null);
  const [mergeTarget, setMergeTarget] = useState<NoteModel | null>(null);

  const { mutate: addNote } = useAddNote();
  const { mutate: deleteNote } = useDeleteNote();
  const { mutate: editNote } = useEditNote();
  const { mutate: addActionItem } = useAddActionItem(id ?? '', retroId ?? '');
  const { mutate: noteToAction } = useNoteToAction(id ?? '', retroId ?? '');
  const { mutate: updateActionItem } = useUpdateActionItem(id ?? '', retroId ?? '');
  const { mutate: deleteActionItem } = useDeleteActionItem(id ?? '', retroId ?? '');
  const { mutate: updateRetro } = useUpdateRetro(id ?? '');
  const { mutate: mergeNote } = useMergeNote(retroId ?? '');

  const { isPM, user: currentUser } = useAuth();

  const navigate = useNavigate();

  const [dndActionItems, setDndActionItems] = useState<ActionItemModel[] | null>(null);

  const boardActionItems = useMemo(() => {
    return actionItems?.filter((actionItem) => Number(actionItem.boardId) === Number(retroId)) ?? [];
  }, [actionItems, retroId]);

  const [dndNotes, setDndNotes] = useState<{
    source: NoteModel[];
    ordered: NoteModel[];
  } | null>(null);

  const effectiveNotes = useMemo(() => {
    if (dndNotes && dndNotes.source === notes) return dndNotes.ordered;
    return notes ?? [];
  }, [dndNotes, notes]);

  const effectiveActionItems = useMemo(() => {
    return dndActionItems ?? boardActionItems;
  }, [dndActionItems, boardActionItems]);

  const userMap = useMemo(() => {
    const map: Record<number, string> = {};
    (users?.items ?? []).forEach((user) => (map[user.id] = user.username));
    return map;
  }, [users]);

  const notesByColumn = useMemo(() => {
    const map: Record<number, NoteModel[]> = {};
    (columns ?? []).forEach((column) => {
      map[column.id] = effectiveNotes
        .filter((note) => note.columnId === column.id)
        .sort((a, b) => a.order.localeCompare(b.order));
    });
    return map;
  }, [columns, effectiveNotes]);

  const sortedColumns = useMemo(() => [...(columns ?? [])].sort((a, b) => a.position - b.position), [columns]);

  const isRetroActive = retro?.status === 'Active';

  const handleAddNote = (columnId: number) => {
    setActiveColumnId(columnId);
  };

  const handleAddNoteCloseClick = () => {
    setActiveColumnId(null);
  };

  const handleSubmitNote = (data: AddNoteFormType) => {
    const colNotes = effectiveNotes
      .filter((note) => note.columnId === activeColumnId)
      .sort((a, b) => a.order.localeCompare(b.order));

    let newOrder: string;
    try {
      const lastOrder = colNotes[colNotes.length - 1]?.order ?? null;
      newOrder = generateKeyBetween(lastOrder, null);
    } catch {
      newOrder = String(colNotes.length + 1);
    }

    addNote({
      projectId: id ?? '',
      retroId: retroId ?? '',
      body: {
        text: data.description,
        color: data.color,
        columnId: activeColumnId!,
        order: newOrder,
      },
    });

    handleAddNoteCloseClick();
  };

  const handleDeleteNote = (noteId: string) => {
    setNoteToDelete(noteId);
  };

  const handleDeleteNoteCloseClick = () => {
    setNoteToDelete(null);
  };

  const handleConfirmDeleteNote = () => {
    if (!noteToDelete) return;
    deleteNote({ noteId: noteToDelete, projectId: id ?? '', retroId: retroId ?? '' });
    setNoteToDelete(null);
  };

  const handleEditNote = (note: NoteModel) => {
    setNoteToEdit(note);
  };

  const handleSubmitNoteEdit = (data: AddNoteFormType) => {
    if (!noteToEdit) return;

    editNote({
      noteId: noteToEdit.id,
      projectId: id ?? '',
      retroId: retroId ?? '',
      body: {
        text: data.description,
        color: data.color,
        order: noteToEdit.order,
        columnId: noteToEdit.columnId,
      },
    });
    setNoteToEdit(null);
  };

  const handleSubmitCloseClick = () => {
    setNoteToEdit(null);
  };

  const handleOpenActionItemModal = () => setShowActionItemModal(true);

  const handleCloseActionItemModal = () => setShowActionItemModal(false);

  const handleSubmitActionItem = (data: AddActionFormType) => {
    addActionItem({
      name: data.name,
      assignedId: data.assignedId,
      dueDate: data.dueDate,
      boardId: retroId ?? '',
      description: data.description,
      order: '',
    });
    handleCloseActionItemModal();
    setDndActionItems(null);
  };

  const handleNoteToAction = (note: NoteModel) => {
    setNoteForAction(note);
  };

  const handleCloseToActionModal = () => {
    setNoteForAction(null);
  };

  const handleSubmitToAction = (data: AddActionFormType) => {
    if (!noteForAction) return;
    noteToAction({
      noteId: noteForAction.id,
      body: {
        name: data.name,
        description: data.description,
        assignedId: data.assignedId ?? '',
        status: 'ToDo',
        dueDate: data.dueDate,
        projectId: id ?? '',
      },
    });
    handleCloseToActionModal();
    setDndActionItems(null);
  };

  const handleActionItemEdit = (actionItem: ActionItemModel) => {
    setActionItemToEdit(actionItem);
  };

  const handleCloseEditActionItemModal = () => {
    setActionItemToEdit(null);
  };

  const handleSubmitEditActionItem = (data: AddActionFormType) => {
    if (!actionItemToEdit) return;
    updateActionItem({
      actionId: actionItemToEdit.actionId,
      body: {
        name: data.name,
        description: data.description,
        assignedId: data.assignedId ?? '',
        dueDate: data.dueDate ?? '',
        status: actionItemToEdit.status,
      },
    });
    handleCloseEditActionItemModal();
    setDndActionItems(null);
  };

  const handleDeleteActionItem = (actionId: string) => {
    setActionItemToDelete(actionId);
  };

  const handleCloseDeleteActionItemModal = () => {
    setActionItemToDelete(null);
  };

  const handleConfirmDeleteActionItem = () => {
    if (!actionItemToDelete) return;
    deleteActionItem(actionItemToDelete ?? '');
    setActionItemToDelete(null);
    setDndActionItems(null);
  };

  const handleOpenCloseModal = () => setShowCloseModal(true);

  const handleCloseModal = () => setShowCloseModal(false);

  const handleConfirmClose = () => {
    updateRetro({ retroId: retroId ?? '', isActive: false });
    handleCloseModal();
    navigate(`/projects/${id}`);
  };

  const handleSelectMerge = (note: NoteModel) => {
    if (note.id === noteToMerge?.id) {
      setNoteToMerge(null);
      return;
    }
    setNoteToMerge(note);
  };

  const handleMergeTarget = (note: NoteModel) => {
    setMergeTarget(note);
  };

  const handleCloseMergeModal = () => {
    setMergeTarget(null);
    setNoteToMerge(null);
  };

  const handleConfirmMerge = () => {
    if (!noteToMerge || !mergeTarget || !currentUser) return;
    mergeNote({
      noteId: noteToMerge.id,
      targetNoteId: mergeTarget.id,
      authorId: currentUser.id,
    });
    setNoteToMerge(null);
    setMergeTarget(null);
  };

  const handleClearMerge = () => setNoteToMerge(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const currentNotes = effectiveNotes;
    const activeNote = currentNotes.find((note) => note.id === active.id);
    const overNote = currentNotes.find((note) => note.id === over.id);

    const activeActionItem = effectiveActionItems.find((actionItem) => actionItem.actionId === active.id);
    const overActionItem = effectiveActionItems.find((actionItem) => actionItem.actionId === over.id);

    if (activeActionItem && overActionItem) {
      const originalPos = effectiveActionItems.findIndex((actionItem) => actionItem.actionId == active.id);
      const newPos = effectiveActionItems.findIndex((actionItem) => actionItem.actionId === over.id);
      setDndActionItems(arrayMove(effectiveActionItems, originalPos, newPos));
      return;
    }

    if (!activeNote || !overNote) return;

    if (activeNote.columnId !== overNote.columnId) return;

    const columnNotes = currentNotes
      .filter((note) => note.columnId === activeNote.columnId)
      .sort((a, b) => a.order.localeCompare(b.order));

    const originalPos = columnNotes.findIndex((note) => note.id === active.id);
    const newPos = columnNotes.findIndex((note) => note.id === over.id);

    const reordered = arrayMove(columnNotes, originalPos, newPos);

    const orders: string[] = [];
    reordered.forEach((_, i) => {
      orders.push(generateKeyBetween(orders[i - 1] ?? null, null));
    });

    const reorderedWithOrder = reordered.map((note, i) => ({
      ...note,
      order: orders[i],
    }));

    const updatedNotes = currentNotes.map(
      (note) => reorderedWithOrder.find((reorderedNote) => reorderedNote.id === note.id) ?? note
    );

    setDndNotes({ source: notes!, ordered: updatedNotes });

    reorderedWithOrder.forEach((note) => {
      editNote({
        noteId: note.id,
        projectId: id ?? '',
        retroId: retroId ?? '',
        body: {
          text: note.text,
          color: note.color,
          order: note.order,
          columnId: note.columnId,
        },
      });
    });
  };

  if (retroLoading) return <div>{t('RETRO.COLUMNS.LOADING')}</div>;

  if (retroError) return <div>{t('RETRO.COLUMNS.ERROR')}</div>;

  if (!columns) return null;

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6" onClick={handleClearMerge}>
        <div className="max-w-8xl flex min-h-[95vh] w-full overflow-x-auto rounded-3xl bg-white shadow-2xl">
          <Sidebar />
          <main className="flex-1 space-y-12 bg-gray-50 p-8">
            <header className="flex items-center justify-between">
              <div>
                <Link to={`/projects/${id}`} className="text-sm text-gray-600 hover:text-gray-800">
                  <Icon name={IconName.BACK} size={IconSize.LG} color="blue" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">{retro?.name}</h1>
                <p className="text-sm text-gray-500">
                  {retro?.startedAt ?? retro?.startsAt ?? '-'} • {retro?.noteCount} {t('RETRO.NOTE')} •{' '}
                  {retro?.actionItemCount} {t('RETRO.ACTION_ITEMS.ACTION_ITEM')}
                </p>
              </div>
              {isPM && isRetroActive && (
                <Button
                  variant={ButtonVariants.PRIMARY}
                  className="bg-red-500 transition hover:bg-red-600"
                  onClick={handleOpenCloseModal}
                >
                  {t('RETRO.CLOSE')}
                </Button>
              )}
            </header>
            <div className="flex items-start">
              {sortedColumns.map((column) => (
                <Column
                  retroId={retroId ?? ''}
                  key={column.id}
                  column={column}
                  notes={notesByColumn[column.id]}
                  actionItems={effectiveActionItems}
                  isRetroActive={isRetroActive}
                  onAddNote={column.columnType === ColumnType.ACTION_ITEMS ? handleOpenActionItemModal : handleAddNote}
                  onDeleteNote={handleDeleteNote}
                  onEditNote={handleEditNote}
                  userMap={userMap}
                  projectId={id ?? ''}
                  onToAction={handleNoteToAction}
                  onEditActionItem={handleActionItemEdit}
                  onDeleteAction={handleDeleteActionItem}
                  onSelectMerge={handleSelectMerge}
                  onMergeTarget={handleMergeTarget}
                  noteToMerge={noteToMerge}
                />
              ))}
            </div>
          </main>
        </div>
        <Modal
          show={activeColumnId !== null}
          title={t('RETRO.NOTES.ADD_MODAL.TITLE')}
          onClose={handleAddNoteCloseClick}
        >
          <AddNoteModal onClose={handleAddNoteCloseClick} onSubmit={handleSubmitNote}></AddNoteModal>
        </Modal>

        <Modal
          show={noteToDelete !== null}
          title={t('RETRO.NOTES.DELETE_MODAL.TITLE')}
          onClose={handleDeleteNoteCloseClick}
        >
          <div className="mt-2 flex justify-start gap-2">
            <Button
              variant={ButtonVariants.PRIMARY}
              className="bg-red-500 transition hover:bg-red-600"
              onClick={handleConfirmDeleteNote}
            >
              {t('COMMON.BUTTONS.DELETE')}
            </Button>

            <Button variant={ButtonVariants.PRIMARY} onClick={handleDeleteNoteCloseClick}>
              {t('COMMON.BUTTONS.CANCEL')}
            </Button>
          </div>
        </Modal>
        <Modal show={noteToEdit !== null} onClose={handleSubmitCloseClick} title={t('RETRO.NOTES.EDIT_MODAL.TITLE')}>
          <AddNoteModal
            onSubmit={handleSubmitNoteEdit}
            onClose={handleSubmitCloseClick}
            isEditing={noteToEdit !== null}
            defaultValues={{ description: noteToEdit?.text ?? '', color: noteToEdit?.color ?? '' }}
          ></AddNoteModal>
        </Modal>
        <Modal
          show={showActionItemModal}
          onClose={handleCloseActionItemModal}
          title={t('RETRO.ACTION_ITEMS.MODAL.TITLE')}
        >
          <AddActionItemModal
            onClose={handleCloseActionItemModal}
            onSubmit={handleSubmitActionItem}
            users={users?.items}
          />
        </Modal>

        <Modal
          show={noteForAction !== null}
          onClose={handleCloseToActionModal}
          title={t('RETRO.ACTION_ITEMS.MODAL.NOTE_TO_ACTION_MODAL_TITLE')}
        >
          <AddActionItemModal
            onClose={handleCloseToActionModal}
            onSubmit={handleSubmitToAction}
            users={users?.items}
            defaultValues={{
              name: '',
              description: noteForAction?.text ?? '',
            }}
          />
        </Modal>

        <Modal
          show={actionItemToEdit !== null}
          onClose={handleCloseEditActionItemModal}
          title={t('RETRO.ACTION_ITEMS.MODAL.EDIT_MODAL_TITLE')}
        >
          <AddActionItemModal
            onClose={handleCloseEditActionItemModal}
            onSubmit={handleSubmitEditActionItem}
            isEditing={actionItemToEdit !== null}
            users={users?.items}
            defaultValues={{
              name: actionItemToEdit?.name ?? '',
              description: actionItemToEdit?.description ?? '',
            }}
          />
        </Modal>

        <Modal
          show={actionItemToDelete !== null}
          title={t('RETRO.NOTES.DELETE_MODAL.TITLE')}
          onClose={handleCloseDeleteActionItemModal}
        >
          <div className="mt-2 flex justify-start gap-2">
            <Button
              variant={ButtonVariants.PRIMARY}
              className="bg-red-500 transition hover:bg-red-600"
              onClick={handleConfirmDeleteActionItem}
            >
              {t('COMMON.BUTTONS.DELETE')}
            </Button>

            <Button variant={ButtonVariants.PRIMARY} onClick={handleCloseDeleteActionItemModal}>
              {t('COMMON.BUTTONS.CANCEL')}
            </Button>
          </div>
        </Modal>
        <Modal show={showCloseModal} title={t('RETRO.CLOSE_MODAL_TITLE')} onClose={handleCloseModal}>
          <div className="mt-2 flex justify-start gap-2">
            <Button
              variant={ButtonVariants.PRIMARY}
              className="bg-red-500 transition hover:bg-red-600"
              onClick={handleConfirmClose}
            >
              {t('COMMON.BUTTONS.CONFIRM')}
            </Button>

            <Button variant={ButtonVariants.PRIMARY} onClick={handleCloseModal}>
              {t('COMMON.BUTTONS.CANCEL')}
            </Button>
          </div>
        </Modal>
        <Modal show={mergeTarget !== null} onClose={handleCloseMergeModal} title={t('RETRO.NOTES.MERGE_MODAL.TITLE')}>
          <div className="mt-2 flex justify-start gap-2">
            <Button variant={ButtonVariants.PRIMARY} onClick={handleConfirmMerge}>
              {t('COMMON.BUTTONS.CONFIRM')}
            </Button>
            <Button variant={ButtonVariants.PRIMARY} onClick={handleCloseMergeModal}>
              {t('COMMON.BUTTONS.CANCEL')}
            </Button>
          </div>
        </Modal>
      </div>
    </DndContext>
  );
};
