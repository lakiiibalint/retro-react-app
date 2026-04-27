import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, ButtonVariants } from '@/src/components/button/Button';
import { ImageUpload } from '@/src/components/image-upload/ImageUpload';
import { Input } from '@/src/components/input/Input';
import { MultiSelect } from '@/src/components/multi-select/MultiSelect';
import { Textarea } from '@/src/components/textarea/Textarea';
import { useAuth } from '@/src/queries/useAuth';
import { useUsers } from '@/src/queries/useUsers';
import yup from '@/src/utils/yup';
interface AddProjectModalProps {
  onClose: () => void;
  onSubmit: (data: AddProjectFormType) => void;
}

export const addProjectSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().default(''),
  coverImage: yup.string().default(''),
  memberIds: yup.array().of(yup.number().required()).default([]),
});

export type AddProjectFormType = yup.InferType<typeof addProjectSchema>;

export const AddProjectModal = ({ onClose, onSubmit }: AddProjectModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProjectFormType>({
    resolver: yupResolver(addProjectSchema),
  });

  const { t } = useTranslation();

  const { data: users } = useUsers();

  const { user: currentUser } = useAuth();

  const userOptions = useMemo(
    () =>
      users?.items
        .filter((user) => user.id !== currentUser?.id)
        .map((user) => ({ value: String(user.id), label: user.username })) ?? [],
    [users, currentUser]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        name="name"
        control={control}
        label={t('PROJECTS.MODAL.NAME_LABEL')}
        placeholder={t('PROJECTS.MODAL.NAME_PLACEHOLDER')}
        errorMessage={errors.name?.message}
      />
      <Textarea
        name="description"
        control={control}
        label={t('PROJECTS.MODAL.DESCRIPTION_LABEL')}
        placeholder={t('PROJECTS.MODAL.DESCRIPTION_PLACEHOLDER')}
        errorMessage={errors.description?.message}
      />
      <ImageUpload
        name="coverImage"
        control={control}
        label={t('PROJECTS.MODAL.COVER_IMAGE')}
        errorMessage={errors.coverImage?.message}
      />
      <MultiSelect
        name="memberIds"
        control={control}
        label={t('PROJECTS.MODAL.MEMBERS_LABEL')}
        options={userOptions}
        errorMessage={errors.memberIds?.message}
      />

      <div className="mt-2 flex justify-end gap-2">
        <Button variant={ButtonVariants.PRIMARY} onClick={onClose}>
          {t('COMMON.BUTTONS.CANCEL')}
        </Button>
        <Button variant={ButtonVariants.PRIMARY} type="submit">
          {t('COMMON.BUTTONS.SUBMIT')}
        </Button>
      </div>
    </form>
  );
};
