import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonVariants } from '@/src/components';
import { AddProjectFormType, AddProjectModal } from '@/src/components/add-project-modal/AddProjectModal';
import { Modal } from '@/src/components/modal/Modal';
import { ProjectCard } from '@/src/components/project-card/ProjectCard';
import { Sidebar } from '@/src/components/sidebar/Sidebar';
import { useAddProject } from '@/src/queries/useAddProject';
import { useAuth } from '@/src/queries/useAuth';
import { useProjects } from '@/src/queries/useProjects';

export function ProjectsPage() {
  const { t } = useTranslation();
  const { data: projects = [], isLoading, isError } = useProjects();
  const { isPM, user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const { mutate: addProject } = useAddProject();

  const sortedProjects = useMemo(() => {
    if (projects.length === 0) return [];

    const currentUserId = user?.id;
    const hasMemberData = projects.some((project) => project.users.length > 0);

    const shouldShow = isPM || currentUserId == null || !hasMemberData;

    const filtered = shouldShow
      ? projects
      : projects.filter((project) => project.users.some((member) => member.id === currentUserId));

    return [...filtered].sort((a, b) => {
      if (a.isActive && !b.isActive) return -1;
      if (!a.isActive && b.isActive) return 1;
      return new Date(b.lastRetroDate ?? 0).getTime() - new Date(a.lastRetroDate ?? 0).getTime();
    });
  }, [projects, isPM, user]);

  const handleOnClick = () => setShowModal(true);

  const handleOnCloseClick = () => setShowModal(false);

  const handleAddProject = (data: AddProjectFormType) => {
    addProject({
      name: data.name,
      description: data.description,
      coverImage: data.coverImage,
      memberIds: [...new Set([...data.memberIds, ...(user?.id ? [user.id] : [])])],
    });
    handleOnCloseClick();
  };
  if (isLoading) return <div>{t('COMMON.BUTTONS.LOADING')}</div>;

  if (isError) return <div>{t('COMMON.BUTTONS.ERROR')}</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="max-w-8xl flex min-h-[95vh] w-full overflow-hidden rounded-3xl bg-white shadow-2xl">
        <Sidebar />
        <main className="flex-1 space-y-12 bg-gray-50 p-8">
          <header className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">{t('PROJECTS.TITLE')}</h1>
            {isPM && (
              <Button variant={ButtonVariants.PRIMARY} onClick={handleOnClick}>
                {t('PROJECTS.ADD_PROJECT')}
              </Button>
            )}
          </header>
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedProjects.length === 0 ? (
              <p className="text-2xl text-gray-400">{t('PROJECTS.EMPTY')}</p>
            ) : (
              sortedProjects.map((project) => <ProjectCard key={project.id} project={project} />)
            )}
          </section>
        </main>
      </div>
      <Modal show={showModal} onClose={handleOnCloseClick} title={t('PROJECTS.MODAL.TITLE')}>
        <AddProjectModal onClose={handleOnCloseClick} onSubmit={handleAddProject} />
      </Modal>
    </div>
  );
}

export default ProjectsPage;
