import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { RetroStatusBanner } from '@/src/components/retro-status-banner/RetroStatusBanner';
import { ProjectModel } from '@/src/models/project.model';

interface ProjectCardProps {
  project: ProjectModel;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation();
  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl"
      style={{
        backgroundImage: project.coverImage ? `url(${project.coverImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-white/70" />

      <div className="relative space-y-3 p-6">
        <RetroStatusBanner isActive={project.isActive} />
        <h3 className="text-lg font-bold text-blue-800">{project.name}</h3>
        <p className="text-sm">{project.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-600">{project.lastRetroDate ?? '-'}</span>
          <Link to={`/projects/${project.id}`} className="text-xs font-medium text-blue-700 hover:underline">
            {t('PROJECTS.DETAILS')}
          </Link>
        </div>
      </div>
    </div>
  );
};
