'use client';

import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface MotivationalToastProps {
  message: string;
  onClose: () => void;
}

export default function MotivationalToast({ message, onClose }: MotivationalToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-500">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-lg shadow-2xl max-w-md flex items-center gap-3">
        <Sparkles className="w-5 h-5 flex-shrink-0" />
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 text-white/80 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}


