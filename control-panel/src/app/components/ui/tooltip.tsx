import Link from 'next/link';
import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative inline-block group">
      {children}
      <div className="absolute left-1/2 transform -translate-x-1/2   w-max  text-white bg-black text-sm rounded px-2 opacity-0 group-hover:opacity-100 duration-200">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;