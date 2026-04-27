import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';

import { IconName, IconSize } from '@/src/assets/iconCollection';
import { Button, ButtonVariants } from '@/src/components';
import { AddRetroFormType, AddRetroModal } from '@/src/components/add-retro-modal/AddRetroModal';
import { Icon } from '@/src/components/icon/Icon';
import { Modal } from '@/src/components/modal/Modal';
import { ProjectSettingsFormType } from '@/src/components/project-settings-form/ProjectSettingsForm';
import { RetroList } from '@/src/components/retro-list/RetroList';
import { SettingsTab } from '@/src/components/settings-tab/SettingsTab';
import { Sidebar } from '@/src/components/sidebar/Sidebar';
import { StatsTab } from '@/src/components/stats-tab/StatsTab';
import { useAddRetro } from '@/src/queries/useAddRetro';
import { useAuth } from '@/src/queries/useAuth';
import { useProject } from '@/src/queries/useProject';
import { useUpdateProject } from '@/src/queries/useUpdateProject';

const TABS = {
  retros: { label: 'PROJECT_DETAIL.TABS.RETROS', component: RetroList, isPmOnly: false },
  stats: { label: 'PROJECT_DETAIL.TABS.STATS', component: StatsTab, isPmOnly: true },
  settings: { label: 'PROJECT_DETAIL.TABS.SETTINGS', component: SettingsTab, isPmOnly: true },
} as const;

export const ProjectDetailPage = () => {
  const { isPM } = useAuth();

  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const { mutate: updateProject } = useUpdateProject(id ?? '');
  const { data: project, isLoading, isError } = useProject(id ?? '');

  const { mutate: addRetro } = useAddRetro();

  const [activeTab, setActiveTab] = useState<string>('retros');
  const [showRetroModal, setShowRetroModal] = useState(false);

  if (isLoading) return <div>{t('COMMON.BUTTONS.LOADING')}</div>;

  if (isError) return <div>{t('COMMON.BUTTONS.ERROR')}</div>;

  if (!project) return null;

  const handleOpenRetroModal = () => setShowRetroModal(true);

  const handleCloseRetroModal = () => setShowRetroModal(false);

  const handleAddRetro = (data: AddRetroFormType) => {
    addRetro({ projectId: id ?? '', body: { name: data.name } });
    //TODO - status kezelés
    handleCloseRetroModal();
  };

  const handleSubmitSettings = (data: ProjectSettingsFormType) => {
    updateProject(
      {
        name: data.name,
        description: data.description,
        coverImage: data.coverImage,
      },
      {
        onSuccess: () => {
          alert(t('COMMON.SAVE'));
        },
      }
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'retros':
        return <RetroList projectId={id ?? ''} />;

      case 'stats':
        return <StatsTab projectId={id ?? ''} />;

      case 'settings':
        return <SettingsTab project={project ?? ''} onSubmit={handleSubmitSettings} />;

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="max-w-8xl flex min-h-[95vh] w-full overflow-hidden rounded-3xl bg-white shadow-2xl">
        <Sidebar />
        <main className="flex-1 space-y-12 bg-gray-50 p-8">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-800">
            <Icon name={IconName.BACK} size={IconSize.LG} color="blue" />
          </Link>
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
              <p className="text-sm text-gray-500">{project.description}</p>
            </div>
            {isPM && activeTab === 'retros' && (
              <Button variant={ButtonVariants.PRIMARY} onClick={handleOpenRetroModal}>
                {t('RETRO.ADD_RETRO')}
              </Button>
            )}
          </header>
          <div className="flex gap-3">
            {Object.entries(TABS).map(([key, config]) => {
              return (
                <Button
                  onClick={() => setActiveTab(key)}
                  key={key}
                  variant={activeTab === key ? ButtonVariants.PRIMARY : ButtonVariants.GHOST}
                >
                  {t(config.label)}
                </Button>
              );
            })}
          </div>
          {renderTabContent()}
        </main>
      </div>
      <Modal show={showRetroModal} onClose={handleCloseRetroModal} title={t('RETRO.MODAL.TITLE')}>
        <AddRetroModal onClose={handleCloseRetroModal} onSubmit={handleAddRetro} />
      </Modal>
    </div>
  );
};
