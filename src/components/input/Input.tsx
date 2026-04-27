import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  errorMessage?: string;
  type?: string;
}

export const Input = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  errorMessage,
  type = 'text',
}: InputProps<T>) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            value={value ?? ''}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        )}
      />
      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>
  );
};
