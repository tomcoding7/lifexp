'use client';

import { useEffect } from 'react';
import { Zap, X } from 'lucide-react';

interface MotivationalToastProps {
  message: string;
  onClose: () => void;
}

export default function MotivationalToast({ message, onClose }: MotivationalToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-500 max-w-md">
      <div className="glass-dark border border-blue-500/50 px-6 py-4 rounded-lg shadow-2xl flex items-start gap-3 relative overflow-hidden"
        style={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)' }}
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent animate-pulse" />
        
        <div className="relative z-10 flex items-start gap-3 flex-1">
          <Zap className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400 animate-pulse" />
          <p className="font-medium text-gray-200 leading-relaxed text-sm">
            {message}
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="relative z-10 p-1 text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
