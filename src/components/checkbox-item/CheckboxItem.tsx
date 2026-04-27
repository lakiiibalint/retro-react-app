interface CheckboxItemProps {
  option: { value: string; label: string };
  checked: boolean;
  onToggle: (value: string, checked: boolean) => void;
}

export const CheckboxItem = ({ option, checked, onToggle }: CheckboxItemProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(option.value, e.target.checked);
  };

  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
      <input type="checkbox" checked={checked} onChange={handleChange} />
      {option.label}
    </label>
  );
};
