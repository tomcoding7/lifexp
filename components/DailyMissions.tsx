'use client';

import { CheckCircle2, Circle } from 'lucide-react';
import type { Mission } from '@/types';
import { STATS_CONFIG } from '@/types';

interface DailyMissionsProps {
  missions: Mission[];
  onCompleteMission: (missionId: string) => void;
}

export default function DailyMissions({ missions, onCompleteMission }: DailyMissionsProps) {
  const completedCount = missions.filter(m => m.completed).length;

  return (
    <div className="glass-dark rounded-lg p-6 border border-gray-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-orbitron text-xl text-gray-300 uppercase tracking-wider mb-1">
              Daily Missions
            </h2>
            <p className="text-sm text-gray-500">
              Complete tasks to earn XP
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gradient">{completedCount}/{missions.length}</div>
            <div className="text-xs text-gray-500 uppercase">Completed</div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-4" />

        <div className="space-y-3">
          {missions.map((mission) => {
            const config = STATS_CONFIG[mission.statId];
            
            return (
              <button
                key={mission.id}
                onClick={() => !mission.completed && onCompleteMission(mission.id)}
                disabled={mission.completed}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                  mission.completed
                    ? 'bg-gray-900/50 border-gray-800 opacity-60'
                    : 'bg-gray-900/80 border-gray-700 hover:border-gray-600 hover:bg-gray-800/80 hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {mission.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{config.emoji}</span>
                      <h3 className={`font-semibold ${mission.completed ? 'line-through text-gray-600' : 'text-gray-200'}`}>
                        {mission.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {mission.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 font-orbitron uppercase">
                        {config.name}
                      </span>
                      <span 
                        className="text-sm font-bold font-orbitron"
                        style={{ color: mission.completed ? '#6b7280' : config.color }}
                      >
                        +{mission.xp} XP
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

