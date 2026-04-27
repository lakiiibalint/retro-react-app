import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { CheckboxItem } from '@/src/components/checkbox-item/CheckboxItem';

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: MultiSelectOption[];
  errorMessage?: string;
}

export const MultiSelect = <T extends FieldValues>({
  name,
  control,
  label,
  errorMessage,
  options,
}: MultiSelectProps<T>) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value = [], onChange } }) => {
          const selectedValues = value as string[];

          const handleToggle = (optionValue: string, isChecked: boolean) => {
            if (isChecked) {
              onChange([...selectedValues, optionValue]);
            } else {
              onChange(selectedValues.filter((val: string) => val !== optionValue));
            }
          };

          return (
            <div className="flex max-h-30 flex-col gap-2 overflow-y-auto rounded-lg border border-gray-200 p-2">
              {options.map((option) => (
                <CheckboxItem
                  key={option.value}
                  option={option}
                  checked={selectedValues.includes(option.value)}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          );
        }}
      />
      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>
  );
};
