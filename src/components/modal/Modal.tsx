import { ReactNode } from 'react';

import { Button } from '@/src/components/button/Button';

export interface ModalProps {
  show: boolean;
  onClose?: () => void;
  children?: ReactNode;
  title: string;
}

export const Modal = ({ show, onClose, children, title }: ModalProps) => {
  if (!show) return null;
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-96 rounded-2xl bg-white p-6 shadow-xl" onClick={handleContentClick}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <Button onClick={onClose}>✕</Button>
        </div>

        {children}
      </div>
    </div>
  );
};
