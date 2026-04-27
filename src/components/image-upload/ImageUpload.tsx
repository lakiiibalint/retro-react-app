import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ImageUploadProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  errorMessage?: string;
}

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => onChange(reader.result as string);
  reader.readAsDataURL(file);
};

export const ImageUpload = <T extends FieldValues>({ name, control, label, errorMessage }: ImageUploadProps<T>) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            handleFileChange(e, onChange);
          };

          return (
            <div className="flex flex-col gap-2">
              {value && (
                <img src={value} alt={t('COMMON.IMAGE_PREVIEW')} className="h-32 w-full rounded-lg object-cover" />
              )}
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 px-3 py-4 text-sm text-gray-500 hover:border-blue-500 hover:text-blue-500">
                <span>{t('PROJECTS.MODAL.COVER_IMAGE')}</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
              </label>
            </div>
          );
        }}
      />
      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>
  );
};
