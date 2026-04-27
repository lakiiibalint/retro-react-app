import { ColumnSettingsForm } from '@/src/components/column-settings-form/ColumnSettingsForm';
import { ProjectMembersForm } from '@/src/components/project-members-form/ProjectMembersForm';
import {
  ProjectSettingsForm,
  ProjectSettingsFormType,
} from '@/src/components/project-settings-form/ProjectSettingsForm';
import { ProjectModel } from '@/src/models/project.model';

interface SettingsTabProps {
  project: ProjectModel;
  onSubmit: (data: ProjectSettingsFormType) => void;
}

export const SettingsTab = ({ project, onSubmit }: SettingsTabProps) => {
  return (
    <>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <ProjectSettingsForm project={project} onSubmit={onSubmit} />
        </div>
        <div className="flex-1">
          <ProjectMembersForm projectId={project.id} members={project.users ?? []} />
        </div>
      </div>
      <ColumnSettingsForm projectId={project.id} />
    </>
  );
};
