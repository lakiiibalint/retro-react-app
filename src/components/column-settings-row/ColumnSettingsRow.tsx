import React from 'react';
import { useTranslation } from 'react-i18next';

import { IconName, IconSize } from '@/src/assets/iconCollection';
import { Button, ButtonVariants } from '@/src/components/button/Button';
import { Icon } from '@/src/components/icon/Icon';
import { NativeInput } from '@/src/components/input/NativeInput';
import { ColumnModel } from '@/src/models/column.model';

interface ColumnSettingsRowProps {
  column: ColumnModel;
  index: number;
  isDefaultColumn: boolean;
  isEditing: boolean;
  editingName: string;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onEditStart: (columnId: number, name: string) => void;
  onEditSave: (columnId: number) => void;
  onEditCancel: () => void;
  onEditNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (columnId: number) => void;
}

export const ColumnSettingsRow = ({
  column,
  index,
  isDefaultColumn,
  isEditing,
  editingName,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onEditStart,
  onEditSave,
  onEditCancel,
  onEditNameChange,
  onDelete,
}: ColumnSettingsRowProps) => {
  const { t } = useTranslation();

  const handleMoveUp = () => onMoveUp(index);
  const handleMoveDown = () => onMoveDown(index);
  const handleEditStart = () => onEditStart(column.id, column.name);
  const handleEditSave = () => onEditSave(column.id);
  const handleDelete = () => onDelete(column.id);

  return (
    <div
      key={column.id}
      className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 font-semibold"
    >
      {isEditing ? (
        <>
          <NativeInput value={editingName} onChange={onEditNameChange} />
          <div className="flex gap-1">
            <Button variant={ButtonVariants.PRIMARY} onClick={handleEditSave} className="text-sm">
              {t('COMMON.BUTTONS.SAVE')}
            </Button>
            <Button variant={ButtonVariants.GHOST} onClick={onEditCancel} className="text-sm">
              {t('COMMON.BUTTONS.CANCEL')}
            </Button>
          </div>
        </>
      ) : (
        <>
          <p>{column.name}</p>
          <div className="flex gap-1">
            <Button
              onClick={handleMoveUp}
              disabled={isFirst}
              className="cursor-pointer rounded-md p-2 transition hover:bg-blue-200"
            >
              <Icon name={IconName.UP} color="black" />
            </Button>

            <Button
              onClick={handleMoveDown}
              disabled={isLast}
              className="cursor-pointer rounded-md p-2 transition hover:bg-blue-200"
            >
              <Icon name={IconName.DOWN} color="black" />
            </Button>

            {!isDefaultColumn && (
              <>
                <Button
                  onClick={handleEditStart}
                  className="cursor-pointer rounded-md p-2 text-lg transition hover:bg-blue-200"
                >
                  <Icon name={IconName.EDIT} size={IconSize.MD} color="blue" />
                </Button>
                <Button
                  onClick={handleDelete}
                  className="cursor-pointer rounded-md p-2 text-xs transition hover:bg-red-200"
                >
                  <Icon name={IconName.DELETE} size={IconSize.MD} color="red" />
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
