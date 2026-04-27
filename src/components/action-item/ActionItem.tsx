import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { IconName, IconSize } from '@/src/assets/iconCollection';
import { Button } from '@/src/components/button/Button';
import { Icon } from '@/src/components/icon/Icon';
import { ActionItemModel } from '@/src/models/action-items-model';
import { useAuth } from '@/src/queries/useAuth';
import { useUpdateActionItem } from '@/src/queries/useUpdateActionItem';

interface ActionItemProps {
  actionItem: ActionItemModel;
  assigneeName?: string;
  projectId: string;
  retroId: string;
  isRetroActive: boolean;
  onEdit: (actionItem: ActionItemModel) => void;
  onDelete: (actionId: string) => void;
}

export const ActionItem = ({
  actionItem,
  assigneeName,
  projectId,
  retroId,
  onEdit,
  onDelete,
  isRetroActive,
}: ActionItemProps) => {
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: actionItem.actionId });
  const { mutate: updateActionItem } = useUpdateActionItem(projectId, retroId);
  const { isPM } = useAuth();

  const isDone = actionItem.status === 'Done';

  const handleDoneClick = () => {
    updateActionItem({
      actionId: actionItem.actionId,
      body: {
        name: actionItem.name,
        description: actionItem.description ?? '',
        dueDate: actionItem.dueDate ?? '',
        assignedId: String(actionItem.assignedId),
        status: isDone ? 'ToDo' : 'Done',
      },
    });
  };

  const handleEdit = () => {
    onEdit(actionItem);
  };

  const handleDelete = () => {
    onDelete(actionItem.actionId);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      className={clsx(
        'mb-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md',
        isDone ? 'border-green-500' : 'border-yellow-500'
      )}
      style={style}
      ref={setNodeRef}
    >
      <h2 className={clsx('text-md mb-1 font-semibold', isDone ? 'text-gray-400 line-through' : 'text-gray-700')}>
        {actionItem.name}
      </h2>
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <p
          className={clsx(
            'mb-2 text-sm leading-relaxed break-words',
            isDone ? 'text-gray-400 line-through' : 'text-gray-700'
          )}
        >
          {actionItem.description}
        </p>
      </div>
      <div className="flex-start flex">
        <span className={clsx('text-xs', isDone ? 'text-gray-400 line-through' : 'text-gray-400')}>
          {assigneeName} - {actionItem.dueDate}
        </span>
      </div>
      {isPM && isRetroActive && (
        <div className="mt-2 flex items-center gap-1">
          <Button
            onClick={handleDoneClick}
            className="flex items-center gap-1 rounded-md bg-green-50 px-2 py-1 text-xs font-bold text-green-600 transition hover:bg-green-100"
          >
            {isDone ? t('RETRO.ACTION_ITEMS.DONE_BUTTON') : t('RETRO.ACTION_ITEMS.REVOKE_BUTTON')}
          </Button>
          <Button onClick={handleEdit} className="rounded-md p-1 text-xs transition hover:bg-blue-200">
            <Icon name={IconName.EDIT} size={IconSize.MD} color="blue" />
          </Button>
          <Button onClick={handleDelete} className="rounded-md p-1 text-xs transition hover:bg-red-200">
            <Icon name={IconName.DELETE} size={IconSize.MD} color="red" />
          </Button>
        </div>
      )}
    </div>
  );
};
