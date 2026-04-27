import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface SelectOption {
  value: number;
  label: string;
}

interface SelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  errorMessage?: string;
}

export const Select = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  errorMessage,
  options,
}: SelectProps<T>) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <select
            value={value ?? ''}
            onChange={onChange}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>
  );
};
