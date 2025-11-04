
import React from 'react';

interface SlideProps {
  children: React.ReactNode;
}

export const Slide: React.FC<SlideProps> = ({ children }) => {
  return (
    <div className="bg-slate-800 p-6 md:p-8 rounded-lg shadow-2xl border border-slate-700 animate-fade-in">
      {children}
    </div>
  );
};
