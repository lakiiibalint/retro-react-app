import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AddColumnFormType, AddColumnModal } from '@/src/components/add-column-modal/AddColumnModal';
import { Button, ButtonVariants } from '@/src/components/button/Button';
import { ColumnSettingsRow } from '@/src/components/column-settings-row/ColumnSettingsRow';
import { Modal } from '@/src/components/modal/Modal';
import { NativeSelect } from '@/src/components/select/NativeSelect';
import { ColumnType } from '@/src/models/column.model';
import { RetroStatus } from '@/src/models/retro.model';
import { useAddColumn } from '@/src/queries/useAddColumn';
import { useDeleteColumn } from '@/src/queries/useDeleteColumn';
import { useRetro } from '@/src/queries/useRetro';
import { useRetros } from '@/src/queries/useRetros';
import { useUpdateColumn } from '@/src/queries/useUpdateColumn';
import { useUpdateColumnPosition } from '@/src/queries/useUpdateColumnPosition';
import { getRetroStatus } from '@/src/utils/retro.utils';

interface ColumnSettingsFormProps {
  projectId: string;
}

const MAX_COLUMNS = 6;

export const ColumnSettingsForm = ({ projectId }: ColumnSettingsFormProps) => {
  const { t } = useTranslation();

  const [selectedRetroId, setSelectedRetroId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [columnToDelete, setColumnToDelete] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<string>('');

  const { data: retros } = useRetros(projectId);
  const { data: retroBoard } = useRetro(projectId, selectedRetroId ?? '');
  const columns = retroBoard?.columns;
  const notes = retroBoard?.notes;

  const { mutate: deleteColumn } = useDeleteColumn(selectedRetroId ?? '', projectId ?? '');
  const { mutate: addColumn } = useAddColumn(selectedRetroId ?? '', projectId ?? '');
  const { mutate: updateColumn } = useUpdateColumn(selectedRetroId ?? '', projectId ?? '');
  const { mutate: updateColumnPosition } = useUpdateColumnPosition(selectedRetroId ?? '', projectId ?? '');

  const pendingRetros = retros?.filter(
    (retro) => getRetroStatus(retro.startedAt ?? null, retro.closedAt ?? null) === RetroStatus.PENDING
  );
  const retroOptions = pendingRetros?.map((retro) => ({ value: retro.id, label: retro.name }));

  const isDefaultColumn = (columnType: string): boolean => Object.values(ColumnType).includes(columnType as ColumnType);
  const hasNotes = (columnId: number): boolean => (notes ?? []).some((note) => note.columnId === columnId);

  const sortedColumns = useMemo(() => [...(columns ?? [])].sort((a, b) => a.position - b.position), [columns]);
  const canAddMore = (sortedColumns ?? []).length < MAX_COLUMNS;

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const currentPos = sortedColumns[index];
    const abovePos = sortedColumns[index - 1];
    updateColumnPosition({ columnId: currentPos.id, swapWithColumnId: abovePos.id });
  };

  const handleMoveDown = (index: number) => {
    if (index === sortedColumns.length - 1) return;
    const currentPos = sortedColumns[index];
    const abovePos = sortedColumns[index + 1];
    updateColumnPosition({ columnId: currentPos.id, swapWithColumnId: abovePos.id });
  };

  const handleOpenAddColumnModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddColumnModal = () => {
    setShowAddModal(false);
  };

  const handleAddColumnSubmit = (data: AddColumnFormType) => {
    addColumn({
      name: data.name,
      position: (sortedColumns ?? []).length + 1,
    });
    handleCloseAddColumnModal();
  };

  const handleOpenDeleteColumnModal = (columnId: number) => {
    setColumnToDelete(columnId);
  };

  const handleCloseDeleteColumnModal = () => {
    setColumnToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!columnToDelete) return;
    if (hasNotes(columnToDelete)) return;
    deleteColumn(columnToDelete);
    setColumnToDelete(null);
  };

  const handleEditStart = (columnId: number, currentName: string) => {
    setEditingId(columnId);
    setEditingName(currentName);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleEditSave = (columnId: number) => {
    if (!editingName.trim()) return;
    updateColumn({ columnId, body: { name: editingName.trim() } });
    handleEditCancel();
  };

  const handleEditingNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingName(e.target.value);
  };

  return (
    <div className="flex w-1/2 flex-1 flex-col gap-4 rounded-xl border border-gray-200 p-4 shadow">
      <h3 className="text-sm font-semibold text-gray-800 uppercase">{t('PROJECTS.SETTINGS.COLUMN_EDIT')}</h3>
      <NativeSelect
        value={selectedRetroId ?? ''}
        onChange={setSelectedRetroId}
        options={retroOptions ?? []}
        placeholder={t('PROJECTS.SETTINGS.RETRO_COLUMN_EDIT_PLACEHOLDER')}
      />
      {selectedRetroId && canAddMore && (
        <Button variant={ButtonVariants.PRIMARY} onClick={handleOpenAddColumnModal}>
          {t('PROJECTS.SETTINGS.COLUMN_ADD')}
        </Button>
      )}
      {selectedRetroId &&
        sortedColumns.map((column, index) => (
          <ColumnSettingsRow
            key={column.id}
            column={column}
            index={index}
            isDefaultColumn={isDefaultColumn(column.columnType)}
            isEditing={editingId === column.id}
            editingName={editingName}
            isFirst={index === 0}
            isLast={index === sortedColumns.length - 1}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onEditStart={handleEditStart}
            onEditSave={handleEditSave}
            onEditCancel={handleEditCancel}
            onEditNameChange={handleEditingNameChange}
            onDelete={handleOpenDeleteColumnModal}
          />
        ))}

      <Modal show={showAddModal} onClose={handleCloseAddColumnModal} title={t('PROJECTS.SETTINGS.COLUMN_ADD')}>
        <AddColumnModal onSubmit={handleAddColumnSubmit} onClose={handleCloseAddColumnModal}></AddColumnModal>
      </Modal>
      <Modal
        show={columnToDelete !== null}
        onClose={handleCloseDeleteColumnModal}
        title={t('RETRO.NOTES.DELETE_MODAL.TITLE')}
      >
        <div className="mt-2 flex justify-start gap-2">
          <Button
            variant={ButtonVariants.PRIMARY}
            className="bg-red-500 transition hover:bg-red-600"
            onClick={handleConfirmDelete}
          >
            {t('COMMON.BUTTONS.DELETE')}
          </Button>
          <Button variant={ButtonVariants.PRIMARY} onClick={handleCloseDeleteColumnModal}>
            {t('COMMON.BUTTONS.CANCEL')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
