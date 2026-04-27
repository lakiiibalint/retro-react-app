interface SelectOption {
  value: string;
  label: string;
}

interface NativeSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  errorMessage?: string;
}

export const NativeSelect = ({ value, onChange, options, placeholder, errorMessage }: NativeSelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      <select
        value={value}
        onChange={handleChange}
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-white font-semibold">
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>
  );
};
