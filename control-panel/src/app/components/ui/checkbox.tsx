import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, className = '' }) => {
  return (
    <label className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      {label}
    </label>
  );
};

export default Checkbox;