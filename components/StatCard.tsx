'use client';

import type { Stat } from '@/types';
import { XP_PER_LEVEL } from '@/types';

interface StatCardProps {
  stat: Stat;
}

const COLOR_MAP: Record<string, { border: string; text: string; gradient: string }> = {
  connection: {
    border: 'border-connection',
    text: 'text-connection',
    gradient: 'from-connection-light to-connection',
  },
  creative: {
    border: 'border-creative',
    text: 'text-creative',
    gradient: 'from-creative-light to-creative',
  },
  clarity: {
    border: 'border-clarity',
    text: 'text-clarity',
    gradient: 'from-clarity-light to-clarity',
  },
  financial: {
    border: 'border-financial',
    text: 'text-financial',
    gradient: 'from-financial-light to-financial',
  },
  discipline: {
    border: 'border-discipline',
    text: 'text-discipline',
    gradient: 'from-discipline-light to-discipline',
  },
  social: {
    border: 'border-social',
    text: 'text-social',
    gradient: 'from-social-light to-social',
  },
};

export default function StatCard({ stat }: StatCardProps) {
  const progress = (stat.currentXP / XP_PER_LEVEL) * 100;
  const colors = COLOR_MAP[stat.color];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${colors.border}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{stat.emoji}</span>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">{stat.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Level {stat.level}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {stat.currentXP} / {XP_PER_LEVEL} XP
          </span>
          <span className={`font-semibold ${colors.text}`}>
            {Math.floor(progress)}%
          </span>
        </div>
        
        <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${colors.gradient} transition-all duration-500 rounded-full`}
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
          Total: {stat.totalXP} XP
        </p>
      </div>
    </div>
  );
}

