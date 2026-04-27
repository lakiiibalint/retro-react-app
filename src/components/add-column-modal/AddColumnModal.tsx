import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, ButtonVariants } from '@/src/components/button/Button';
import { Input } from '@/src/components/input/Input';
import yup from '@/src/utils/yup';

interface AddColumnModalProps {
  onSubmit: (data: AddColumnFormType) => void;
  onClose: () => void;
}

const addColumnSchema = yup.object({
  name: yup.string().required(),
});

export type AddColumnFormType = yup.InferType<typeof addColumnSchema>;

export const AddColumnModal = ({ onSubmit, onClose }: AddColumnModalProps) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddColumnFormType>({
    resolver: yupResolver(addColumnSchema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        name="name"
        control={control}
        label={t('PROJECTS.SETTINGS.COLUMN_LABEL')}
        placeholder={t('PROJECTS.SETTINGS.COLUMN_PLACEHOLDER')}
        errorMessage={errors.name?.message}
      />

      <div className="mt-2 flex justify-start gap-2">
        <Button variant={ButtonVariants.PRIMARY} type="submit">
          {t('COMMON.BUTTONS.SUBMIT')}
        </Button>
        <Button variant={ButtonVariants.PRIMARY} className="bg-gray-400 transition hover:bg-gray-500" onClick={onClose}>
          {t('COMMON.BUTTONS.CANCEL')}
        </Button>
      </div>
    </form>
  );
};
