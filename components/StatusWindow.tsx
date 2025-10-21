'use client';

import type { Stat } from '@/types';
import { getXPForLevel, STATS_CONFIG } from '@/types';

interface StatusWindowProps {
  stats: Record<string, Stat>;
  playerLevel: number;
  rankName: string;
  rankClass: string;
  rankColor: string;
}

export default function StatusWindow({ stats, playerLevel, rankName, rankClass, rankColor }: StatusWindowProps) {
  const statsList = Object.values(stats);

  return (
    <div className="glass-dark rounded-lg p-6 border border-gray-800 relative overflow-hidden">
      {/* Background glow effect */}
      <div 
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: rankColor }}
      />
      
      <div className="relative z-10">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-orbitron text-xl text-gray-400 uppercase tracking-wider">STATUS WINDOW</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 font-orbitron">RANK:</span>
              <span 
                className="font-orbitron font-bold text-xl"
                style={{ color: rankColor, textShadow: `0 0 10px ${rankColor}` }}
              >
                {rankClass}
              </span>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 font-orbitron uppercase tracking-wider">Hunter</div>
              <div className="text-2xl font-bold text-gradient-gold">Level {playerLevel}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 font-orbitron uppercase tracking-wider">Class</div>
              <div 
                className="text-lg font-orbitron font-bold"
                style={{ color: rankColor }}
              >
                {rankName}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {statsList.map((stat) => {
            const xpNeeded = getXPForLevel(stat.level);
            const progress = (stat.currentXP / xpNeeded) * 100;
            const config = STATS_CONFIG[stat.id];

            return (
              <div key={stat.id} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{stat.emoji}</span>
                    <span className="font-orbitron text-sm uppercase tracking-wide text-gray-300">
                      {config.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span 
                      className="font-bold text-xl font-orbitron"
                      style={{ color: config.color }}
                    >
                      {stat.level}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      {stat.currentXP}/{xpNeeded}
                    </span>
                  </div>
                </div>
                
                <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                  <div
                    className="absolute top-0 left-0 h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: config.color,
                      boxShadow: `0 0 10px ${config.glowColor}, inset 0 1px 0 rgba(255,255,255,0.2)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

