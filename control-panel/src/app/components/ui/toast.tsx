import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed bottom-5 right-5 ${bgColor} text-white py-2 px-4 rounded shadow-lg transition-opacity  text-center flex justify-center`}>
      {message}
      <button onClick={onClose} className="ml-4 text-sm">
        ×
      </button>
    </div>
  );
};

export default Toast;