// components/StatusButton.tsx
import React from 'react';

interface StatusButtonProps {
  status: 'active' | 'inactive' | 'pending';
  onClick: () => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({ status, onClick }) => {
  const getButtonStyle = () => {
    switch (status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'inactive':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      default:
        return '';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded ${getButtonStyle()}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </button>
  );
};

export default StatusButton;