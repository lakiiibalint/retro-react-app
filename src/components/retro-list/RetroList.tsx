import { useTranslation } from 'react-i18next';

import { RetroItem } from '@/src/components/retro-list/RetroItem';
import { useRetros } from '@/src/queries/useRetros';

interface RetroListProps {
  projectId: string;
}

export const RetroList = ({ projectId }: RetroListProps) => {
  const { t } = useTranslation();
  const { data: retros, isLoading, isError } = useRetros(projectId);

  if (isLoading) return <div>{t('COMMON.BUTTONS.LOADING')}</div>;
  if (isError) return <div>{t('COMMON.BUTTONS.ERROR')}</div>;
  if (!retros?.length) return <div>{t('RETRO.EMPTY')}</div>;

  return (
    <div className="flex flex-col gap-3">
      {retros.map((retro) => (
        <RetroItem key={retro.id} retro={retro} projectId={projectId} />
      ))}
    </div>
  );
};
