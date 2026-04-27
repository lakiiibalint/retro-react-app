import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { IconName, IconSize } from '@/src/assets/iconCollection';
import { Button, ButtonVariants } from '@/src/components/button/Button';
import { Icon } from '@/src/components/icon/Icon';
import { Modal } from '@/src/components/modal/Modal';
import { RetroModel, RetroStatus } from '@/src/models/retro.model';
import { useAuth } from '@/src/queries/useAuth';
import { useDeleteRetro } from '@/src/queries/useDeleteRetro';
import { useUpdateRetro } from '@/src/queries/useUpdateRetro';
import { getRetroStatus } from '@/src/utils/retro.utils';

interface RetroItemProps {
  retro: RetroModel;
  projectId: string;
}

const statusColor: Record<RetroStatus, string> = {
  [RetroStatus.ACTIVE]: 'bg-green-500 hover:bg-green-700',
  [RetroStatus.PENDING]: 'bg-blue-500',
  [RetroStatus.CLOSED]: 'bg-gray-200',
};

export const RetroItem = ({ retro, projectId }: RetroItemProps) => {
  const { t } = useTranslation();
  const { isPM } = useAuth();
  const navigate = useNavigate();
  const status = getRetroStatus(retro.startedAt ?? null, retro.closedAt ?? null);

  const { mutate: updateRetro } = useUpdateRetro(projectId);
  const { mutate: deleteRetro } = useDeleteRetro(projectId);

  const [retroToDelete, setRetroToDelete] = useState<string | null>(null);

  const handleOpenDeleteModal = () => setRetroToDelete(retro.id);

  const handleCloseDeleteModal = () => setRetroToDelete(null);

  const handleConfirmDelete = () => {
    if (!retroToDelete) return;
    deleteRetro(retroToDelete);
    setRetroToDelete(null);
  };

  const handleStart = () => {
    updateRetro({ retroId: retro.id, isActive: true });
  };

  const handleJoin = () => navigate(`/projects/${projectId}/retros/${retro.id}`);
  const handleView = () => navigate(`/projects/${projectId}/retros/${retro.id}`);

  const renderButtons = () => {
    const buttons = [];

    if (isPM && status !== RetroStatus.ACTIVE) {
      buttons.push({
        key: 'delete',
        label: <Icon name={IconName.DELETE} size={IconSize.LG} color="red" />,
        onClick: handleOpenDeleteModal,
        className: 'rounded-md p-1 transition hover:bg-red-200',
        variant: undefined,
      });
    }

    switch (status) {
      case RetroStatus.ACTIVE:
        buttons.push({
          key: 'join',
          label: t('RETRO.JOIN'),
          onClick: handleJoin,
          className: statusColor[status],
          variant: ButtonVariants.PRIMARY,
        });
        break;
      case RetroStatus.CLOSED:
        buttons.push({
          key: 'view',
          label: t('RETRO.VIEW'),
          onClick: handleView,
          className: statusColor[status],
          variant: ButtonVariants.GHOST,
        });
        break;
      case RetroStatus.PENDING:
        if (isPM) {
          buttons.push({
            key: 'start',
            label: t('RETRO.START'),
            onClick: handleStart,
            variant: ButtonVariants.PRIMARY,
            className: undefined,
          });
        }
        break;
    }

    return buttons;
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={clsx('h-2 w-2 rounded-full', statusColor[status])} />
        <div className={status === RetroStatus.CLOSED ? 'line-through' : ''}>
          <p className="font-bold text-gray-800">{retro.name}</p>
          <p className="text-xs text-gray-500">
            {retro.startedAt ?? retro.startsAt ?? '-'} • {retro.noteCount} {t('RETRO.NOTE')} • {retro.actionItemCount}{' '}
            {t('RETRO.ACTION_ITEMS.ACTION_ITEM')}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {renderButtons().map((button) => (
          <Button key={button.key} variant={button.variant} className={button.className} onClick={button.onClick}>
            {button.label}
          </Button>
        ))}
      </div>

      <Modal show={retroToDelete !== null} onClose={handleCloseDeleteModal} title={t('RETRO.NOTES.DELETE_MODAL.TITLE')}>
        <div className="mt-2 flex justify-start gap-2">
          <Button
            variant={ButtonVariants.PRIMARY}
            className="bg-red-500 transition hover:bg-red-600"
            onClick={handleConfirmDelete}
          >
            {t('COMMON.BUTTONS.DELETE')}
          </Button>
          <Button variant={ButtonVariants.PRIMARY} onClick={handleCloseDeleteModal}>
            {t('COMMON.BUTTONS.CANCEL')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
