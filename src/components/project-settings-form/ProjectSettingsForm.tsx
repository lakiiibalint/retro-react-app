import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button, ButtonVariants } from '@/src/components/button/Button';
import { ImageUpload } from '@/src/components/image-upload/ImageUpload';
import { Input } from '@/src/components/input/Input';
import { Modal } from '@/src/components/modal/Modal';
import { Textarea } from '@/src/components/textarea/Textarea';
import { ProjectModel } from '@/src/models/project.model';
import { useDeleteProject } from '@/src/queries/useDeleteProject';
import yup from '@/src/utils/yup';

interface ProjectSettingsFormProps {
  project: ProjectModel;
  onSubmit: (data: ProjectSettingsFormType) => void;
}

const projectSettingsSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().default(''),
  coverImage: yup.string().default(''),
});

export type ProjectSettingsFormType = yup.InferType<typeof projectSettingsSchema>;

export const ProjectSettingsForm = ({ onSubmit, project }: ProjectSettingsFormProps) => {
  const { t } = useTranslation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { mutate: deleteProject } = useDeleteProject();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectSettingsFormType>({
    resolver: yupResolver(projectSettingsSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      coverImage: project.coverImage,
    },
  });

  const navigate = useNavigate();

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleNotShowDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteProject = () => {
    deleteProject({ id: project.id });
    navigate('/');
    handleNotShowDeleteModal();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded-xl border border-gray-200 p-3 shadow"
      >
        <h3 className="text-sm font-semibold text-gray-800 uppercase">{t('PROJECTS.SETTINGS.EDIT')}</h3>
        <Input
          name="name"
          control={control}
          label={t('PROJECTS.MODAL.NAME_LABEL')}
          placeholder={t('PROJECTS.MODAL.NAME_PLACEHOLDER')}
          errorMessage={errors.name?.message}
        ></Input>
        <Textarea
          name="description"
          control={control}
          label={t('PROJECTS.MODAL.DESCRIPTION_LABEL')}
          placeholder={t('PROJECTS.MODAL.DESCRIPTION_PLACEHOLDER')}
          errorMessage={errors.description?.message}
        ></Textarea>
        <ImageUpload
          name="coverImage"
          control={control}
          label={t('PROJECTS.MODAL.COVER_IMAGE')}
          errorMessage={errors.coverImage?.message}
        />
        <Button variant={ButtonVariants.PRIMARY} type="submit">
          {t('COMMON.BUTTONS.EDIT')}
        </Button>
      </form>
      <div className="mt-4 flex flex-col gap-4 rounded-xl border border-red-200 p-3 shadow">
        <Button
          variant={ButtonVariants.PRIMARY}
          className="bg-red-500 transition hover:bg-red-600"
          onClick={handleShowDeleteModal}
        >
          {t('PROJECTS.SETTINGS.DELETE')}
        </Button>
      </div>
      <Modal show={showDeleteModal} title={t('PROJECTS.SETTINGS.DELETE_MODAL')} onClose={handleNotShowDeleteModal}>
        <div className="mt-2 flex justify-start gap-2">
          <Button
            variant={ButtonVariants.PRIMARY}
            className="bg-red-500 transition hover:bg-red-600"
            onClick={handleDeleteProject}
          >
            {t('COMMON.BUTTONS.CONFIRM')}
          </Button>

          <Button variant={ButtonVariants.PRIMARY} onClick={handleNotShowDeleteModal}>
            {t('COMMON.BUTTONS.CANCEL')}
          </Button>
        </div>
      </Modal>
    </>
  );
};
