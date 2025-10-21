'use client';

import { useState } from 'react';
import { Plus, Moon, Sun } from 'lucide-react';
import { useStats } from '@/hooks/useStats';
import { useTheme } from '@/hooks/useTheme';
import StatCard from '@/components/StatCard';
import PlayerStats from '@/components/PlayerStats';
import RecentLogs from '@/components/RecentLogs';
import AddXPModal from '@/components/AddXPModal';
import LevelUpModal from '@/components/LevelUpModal';
import MotivationalToast from '@/components/MotivationalToast';

export default function Home() {
  const {
    stats,
    logs,
    streak,
    addXP,
    levelUpStat,
    clearLevelUp,
    motivationalMessage,
    clearMessage,
    getPlayerLevel,
    getTotalXP,
    isLoaded,
  } = useStats();

  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600 dark:text-gray-400">
          Loading your progress...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              LifeXP
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Level up your life, one action at a time
            </p>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-800 dark:text-white" />
            ) : (
              <Sun className="w-5 h-5 text-gray-800 dark:text-white" />
            )}
          </button>
        </header>

        {/* Player Stats */}
        <PlayerStats
          playerLevel={getPlayerLevel()}
          totalXP={getTotalXP()}
          streak={streak.current}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(stats).map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        {/* Recent Logs */}
        <RecentLogs logs={logs} stats={stats} />

        {/* Floating Add Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 z-40"
          aria-label="Add XP"
        >
          <Plus className="w-8 h-8" />
        </button>

        {/* Modals and Toasts */}
        <AddXPModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddXP={(statId, xp, description) => {
            addXP(statId, xp, description);
          }}
        />

        <LevelUpModal
          stat={levelUpStat ? stats[levelUpStat] : null}
          onClose={clearLevelUp}
        />

        <MotivationalToast
          message={motivationalMessage}
          onClose={clearMessage}
        />
      </div>
    </main>
  );
}


