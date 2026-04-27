import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, ButtonVariants } from '@/src/components/button/Button';
import { Input } from '@/src/components/input/Input';
import { Textarea } from '@/src/components/textarea/Textarea';
import yup from '@/src/utils/yup';

interface AddRetroModalProps {
  onClose: () => void;
  onSubmit: (data: AddRetroFormType) => void;
}

const addRetroSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().default(''),
});

export type AddRetroFormType = yup.InferType<typeof addRetroSchema>;

export const AddRetroModal = ({ onClose, onSubmit }: AddRetroModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddRetroFormType>({
    resolver: yupResolver(addRetroSchema),
  });
  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        name="name"
        control={control}
        label={t('RETRO.MODAL.NAME')}
        placeholder={t('RETRO.MODAL.NAME_PLACEHOLDER')}
        errorMessage={errors.name?.message}
      />
      <Textarea
        name="description"
        control={control}
        label={t('RETRO.MODAL.DESCRIPTION_LABEL')}
        placeholder={t('RETRO.MODAL.DESCRIPTION')}
        errorMessage={errors.description?.message}
      />

      <div className="mt-2 flex justify-end gap-2">
        <Button variant={ButtonVariants.PRIMARY} onClick={onClose}>
          {t('COMMON.BUTTONS.CANCEL')}
        </Button>

        <Button variant={ButtonVariants.PRIMARY} type="submit">
          {t('COMMON.BUTTONS.SAVE')}
        </Button>
      </div>
    </form>
  );
};
