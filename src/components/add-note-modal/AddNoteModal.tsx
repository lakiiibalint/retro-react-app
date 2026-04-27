import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, ButtonVariants } from '@/src/components/button/Button';
import { ColorPicker } from '@/src/components/color-picker/ColorPicker';
import { Textarea } from '@/src/components/textarea/Textarea';
import yup from '@/src/utils/yup';

interface AddNoteModalProps {
  onClose: () => void;
  onSubmit: (data: AddNoteFormType) => void;
  defaultValues?: AddNoteFormType;
  isEditing?: boolean;
}

const addNoteSchema = yup.object({
  description: yup.string().required(),
  color: yup.string().required(),
});

export type AddNoteFormType = yup.InferType<typeof addNoteSchema>;

export const AddNoteModal = ({ onClose, onSubmit, defaultValues, isEditing }: AddNoteModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddNoteFormType>({
    resolver: yupResolver(addNoteSchema),
    defaultValues,
  });
  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Textarea
        name="description"
        control={control}
        label={t('RETRO.NOTES.ADD_MODAL.DESCRIPTION_LABEL')}
        placeholder={t('RETRO.NOTES.ADD_MODAL.DESCRIPTION_PLACEHOLDER')}
        errorMessage={errors.description?.message}
      />
      <ColorPicker
        name="color"
        control={control}
        label={t('RETRO.NOTES.ADD_MODAL.COLOR')}
        errorMessage={errors.description?.message}
      />

      <div className="mt-2 flex justify-start gap-2">
        <Button variant={ButtonVariants.PRIMARY} type="submit">
          {isEditing ? t('COMMON.BUTTONS.EDIT') : t('COMMON.BUTTONS.SUBMIT')}
        </Button>
        <Button variant={ButtonVariants.PRIMARY} className="bg-gray-400 transition hover:bg-gray-500" onClick={onClose}>
          {t('COMMON.BUTTONS.CANCEL')}
        </Button>
      </div>
    </form>
  );
};
