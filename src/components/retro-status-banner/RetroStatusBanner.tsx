import { useTranslation } from 'react-i18next';

interface RetroStatusBannerProps {
  isActive: boolean;
}

export const RetroStatusBanner = ({ isActive }: RetroStatusBannerProps) => {
  const { t } = useTranslation();
  return (
    <div
      className={`-mx-6 -mt-6 mb-3 flex items-center gap-2 rounded-t-2xl px-4 py-2 ${isActive ? 'bg-green-300 text-green-900' : 'bg-red-200 text-red-700'}`}
    >
      <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-green-700' : 'bg-red-600'}`} />
      <span className="text-cross text-xs font-semibold">{isActive ? t('PROJECTS.ACTIVE') : t('PROJECTS.CLOSED')}</span>
    </div>
  );
};
