'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, X } from 'lucide-react';
import type { Stat } from '@/types';

interface LevelUpModalProps {
  stat: Stat | null;
  onClose: () => void;
}

export default function LevelUpModal({ stat, onClose }: LevelUpModalProps) {
  useEffect(() => {
    if (stat) {
      // Trigger confetti
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [stat]);

  if (!stat) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl transform animate-in zoom-in duration-500">
        <div className="p-8 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          <div className="mb-6 animate-bounce">
            <div className="inline-block p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Level Up! 🎉
          </h2>
          
          <div className="text-6xl my-4">{stat.emoji}</div>
          
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {stat.name}
          </p>
          
          <p className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Level {stat.level}
          </p>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You're making incredible progress! Keep up the amazing work! 🚀
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}


