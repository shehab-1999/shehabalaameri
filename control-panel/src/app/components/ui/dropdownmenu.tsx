// components/DropdownMenu.tsx
import React, { useState } from 'react';

interface DropdownMenuProps {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="py-2 px-4 border rounded">
        {label}
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-white border rounded shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;