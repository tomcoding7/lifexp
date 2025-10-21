'use client';

import type { XPLog, Stat } from '@/types';
import { Clock } from 'lucide-react';

interface RecentLogsProps {
  logs: XPLog[];
  stats: Record<string, Stat>;
}

export default function RecentLogs({ logs, stats }: RecentLogsProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Activity</h2>
      </div>
      
      {logs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No activity yet. Start logging to see your progress!
        </p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {logs.slice(0, 20).map((log) => {
            const stat = stats[log.statId];
            return (
              <div
                key={log.id}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-2xl">{stat.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    {log.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-purple-600 dark:text-purple-400">
                    +{log.xp} XP
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTime(log.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

