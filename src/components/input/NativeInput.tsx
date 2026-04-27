import React from 'react';

interface NativeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage?: string;
}

export const NativeInput = ({ value, onChange, placeholder, errorMessage }: NativeInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="text-md rounded-lg border border-blue-200 px-2 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>
  );
};
