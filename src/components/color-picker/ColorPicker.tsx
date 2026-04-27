import clsx from 'clsx';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { Button } from '@/src/components/button/Button';

interface ColorPickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  errorMessage?: string;
}

const COLORS = [{ value: '#DC2626' }, { value: '#16A34A' }, { value: '#2563EB' }, { value: '#dbd539' }];

export const ColorPicker = <T extends FieldValues>({ name, control, label, errorMessage }: ColorPickerProps<T>) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="flex gap-2">
            {COLORS.map((color) => (
              <Button
                key={color.value}
                type="button"
                onClick={() => onChange(color.value)}
                className={clsx(
                  'mt-3 h-7 w-7 cursor-pointer rounded-full border-2 transition',
                  value === color.value ? 'scale-110 border-gray-800' : 'border-transparent'
                )}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>
        )}
      />

      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>
  );
};
