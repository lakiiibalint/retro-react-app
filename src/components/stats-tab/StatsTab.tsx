import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { IconName, IconSize } from '@/src/assets/iconCollection';
import { Icon } from '@/src/components/icon/Icon';
import { ColumnType } from '@/src/models/column.model';
import { useProjectStats } from '@/src/queries/useProjectStats';

interface StatsTabProps {
  projectId: string;
}

const colorMap: Record<string, string> = {
  blue: 'text-blue-600',
  red: 'text-red-600',
  green: 'text-green-600',
  yellow: 'text-yellow-600',
};

export const StatsTab = ({ projectId }: StatsTabProps) => {
  const { data: stats } = useProjectStats(projectId);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-5 rounded-xl border border-gray-200 bg-white p-6 shadow">
        <div className="flex flex-col items-center">
          <h3 className="mb-4 text-sm font-semibold text-gray-600 uppercase">{t('PROJECTS.STATS.RETROS_COUNT')}</h3>
          <p className="text-3xl font-bold">{stats?.retroCount}</p>
        </div>

        {stats?.notesByColor.map((note) => (
          <div key={note.color} className="flex flex-col items-center">
            <h3 className="mb-4 text-sm font-semibold text-gray-600 uppercase">
              {note.color} {t('PROJECTS.STATS.NOTE')}
            </h3>
            <p className={clsx('text-3xl font-bold', colorMap[note.color])}>{note.count}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow">
        <h3 className="mb-4 font-semibold text-gray-600 uppercase">{t('PROJECTS.STATS.NOTES_BY_COLUMN')}</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 text-left text-sm font-semibold text-gray-500 uppercase">
                {t('PROJECTS.STATS.COLUMNS')}
              </th>
              <th className="py-2 text-left text-sm font-semibold text-gray-500 uppercase">
                {t('PROJECTS.STATS.NOTE_COUNT')}
              </th>
            </tr>
          </thead>
          <tbody>
            {stats?.notesByColumn
              .filter((column) => column.columnName !== ColumnType.ACTION_ITEMS)
              .map((column) => (
                <tr key={column.columnName} className="border-b border-gray-100">
                  <td className="py-3 text-gray-800">{column.columnName}</td>
                  <td className="py-3 text-xl font-semibold text-blue-600">{column.count}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow">
        <h3 className="mb-4 font-semibold text-gray-600 uppercase">{t('PROJECTS.STATS.UPVOTES_TITLE')}</h3>
        {stats?.topVoted.map((note) => (
          <div
            key={note.noteId}
            className="mb-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
            style={{ borderLeft: `3px solid ${note.color}` }}
          >
            <div className="flex items-center">
              <p className="mb-1 p-3 leading-relaxed text-gray-700">{note.text}</p>
              <Icon name={IconName.THUMBS_UP} color="green" size={IconSize.LG}></Icon>
              <p className="ml-2 text-xl font-semibold text-green-500">{note.agree}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
