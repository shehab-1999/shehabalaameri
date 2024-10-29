import React, { useState, useEffect } from 'react';
import Toast from './toast';

interface ToastContainerProps {
  message?: string;
  type?: 'success' | 'error';
}

const ToastContainer: React.FC<ToastContainerProps> = ({ message, type }) => {
  const [toasts, setToasts] = useState<{ message: string; type: 'success' | 'error' }[]>([]);

  useEffect(() => {
    if (message) {
      addToast(message, type || 'error');
    }
  }, [message, type]);

  const addToast = (message: string, type: 'success' | 'error') => {
    setToasts((prev) => [...prev, { message, type }]);
    
    // استخدام setTimeout لإزالة الرسالة بعد 3 ثوانٍ، دون الاعتماد على الرسالة
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.message !== message));
    }, 3000);
  };

  return (
    <div>
      {toasts.map(({ message, type }, index) => (
        <Toast key={`${type}-${index}`} message={message} type={type} onClose={() => setToasts(toasts.filter(t => t.message !== message))} />
      ))}
    </div>
  );
};

export default ToastContainer;