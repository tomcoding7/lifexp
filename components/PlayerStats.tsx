'use client';

import { Trophy, TrendingUp, Flame } from 'lucide-react';

interface PlayerStatsProps {
  playerLevel: number;
  totalXP: number;
  streak: number;
}

export default function PlayerStats({ playerLevel, totalXP, streak }: PlayerStatsProps) {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-700 dark:to-pink-700 rounded-xl p-6 shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Trophy className="w-6 h-6" />
        Your Progress
      </h2>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4" />
            <p className="text-xs opacity-80">Player Level</p>
          </div>
          <p className="text-3xl font-bold">{playerLevel}</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4" />
            <p className="text-xs opacity-80">Total XP</p>
          </div>
          <p className="text-3xl font-bold">{totalXP.toLocaleString()}</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4" />
            <p className="text-xs opacity-80">Day Streak</p>
          </div>
          <p className="text-3xl font-bold">{streak}</p>
        </div>
      </div>
    </div>
  );
}


