import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, ButtonVariants } from '@/src/components/button/Button';
import { Input } from '@/src/components/input/Input';
import { Select } from '@/src/components/select/Select';
import { Textarea } from '@/src/components/textarea/Textarea';
import { UserModel } from '@/src/models/user.model';
import yup from '@/src/utils/yup';

interface AddActionItemModalProps {
  onClose: () => void;
  onSubmit: (data: AddActionFormType) => void;
  users?: UserModel[];
  defaultValues?: Partial<AddActionFormType>;
  isEditing?: boolean;
}

const addActionSchema = yup.object({
  name: yup.string().default('').required(),
  description: yup.string().default('').required(),
  assignedId: yup.string().default('').required(),
  dueDate: yup.string().default('').required(),
});

export type AddActionFormType = yup.InferType<typeof addActionSchema>;

export const AddActionItemModal = ({ onClose, onSubmit, users, defaultValues, isEditing }: AddActionItemModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddActionFormType>({
    resolver: yupResolver(addActionSchema),
    defaultValues: defaultValues ?? { name: '', description: '', assignedId: '', dueDate: '' },
  });
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <>
        <Input
          name="name"
          control={control}
          label={t('RETRO.ACTION_ITEMS.MODAL.NAME_LABEL')}
          placeholder={t('RETRO.ACTION_ITEMS.MODAL.NAME_PLACEHOLDER')}
          errorMessage={errors.name?.message}
        ></Input>

        <Textarea
          name="description"
          control={control}
          label={t('RETRO.ACTION_ITEMS.MODAL.DESCRIPTION_LABEL')}
          placeholder={t('RETRO.ACTION_ITEMS.MODAL.DESCRIPTION_PLACEHOLDER')}
          errorMessage={errors.description?.message}
        />
      </>

      <Input
        name="dueDate"
        control={control}
        label={t('RETRO.ACTION_ITEMS.MODAL.DUE_DATE_LABEL')}
        type="date"
        errorMessage={errors.dueDate?.message}
      />
      {users && users.length > 0 && (
        <Select
          name="assignedId"
          control={control}
          label={t('RETRO.ACTION_ITEMS.MODAL.ASSIGNEE_LABEL')}
          placeholder={t('RETRO.ACTION_ITEMS.MODAL.NO_ASSIGNEE')}
          options={users.map((user) => ({ value: user.id, label: `${user.username} (${user.role})` }))}
        />
      )}
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
