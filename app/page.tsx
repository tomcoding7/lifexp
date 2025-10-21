'use client';

import { useState, useEffect } from 'react';
import { Plus, Activity } from 'lucide-react';
import { useStats } from '@/hooks/useStats';
import StatusWindow from '@/components/StatusWindow';
import DailyMissions from '@/components/DailyMissions';
import AddXPModal from '@/components/AddXPModal';
import LevelUpModal from '@/components/LevelUpModal';
import MotivationalToast from '@/components/MotivationalToast';
import LoginBonusModal from '@/components/LoginBonusModal';

export default function Home() {
  const {
    stats,
    dailyMissions,
    addXP,
    completeMission,
    levelUpStat,
    clearLevelUp,
    motivationalMessage,
    clearMessage,
    getPlayerLevel,
    getPlayerRank,
    getTotalXP,
    isLoaded,
    checkLoginBonus,
    checkDailyMissions,
    showLoginBonus,
    loginBonusAmount,
    claimLoginBonus,
    totalLogins,
  } = useStats();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      checkLoginBonus();
      checkDailyMissions();
    }
  }, [isLoaded, checkLoginBonus, checkDailyMissions]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          <div className="text-xl text-gray-400 font-orbitron">
            SYSTEM INITIALIZING...
          </div>
        </div>
      </div>
    );
  }

  const playerLevel = getPlayerLevel();
  const rank = getPlayerRank();

  return (
    <main className="min-h-screen p-4 md:p-8 relative">
      {/* Animated background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-block mb-4">
            <Activity className="w-12 h-12 text-blue-500 mx-auto mb-2 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gradient font-orbitron mb-2 uppercase tracking-wider">
            HUNTER SYSTEM
          </h1>
          <p className="text-gray-500 font-orbitron text-sm uppercase tracking-widest">
            Evolution in Progress
          </p>
        </header>

        {/* Rank Badge */}
        <div className="glass-dark rounded-lg p-4 border border-gray-800 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-orbitron uppercase tracking-wider mb-1">
                Current Rank
              </div>
              <div 
                className="text-2xl font-bold font-orbitron"
                style={{ 
                  color: rank.color,
                  textShadow: `0 0 10px ${rank.glowColor}`
                }}
              >
                {rank.name}
              </div>
            </div>
            <div 
              className="text-6xl font-black font-orbitron opacity-20"
              style={{ color: rank.color }}
            >
              {rank.class}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Window - Takes 2 columns */}
          <div className="lg:col-span-2">
            <StatusWindow
              stats={stats}
              playerLevel={playerLevel}
              rankName={rank.name}
              rankClass={rank.class}
              rankColor={rank.color}
            />
          </div>

          {/* Daily Missions */}
          <div className="lg:col-span-1">
            <DailyMissions
              missions={dailyMissions}
              onCompleteMission={completeMission}
            />
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-dark rounded-lg p-4 border border-gray-800 text-center">
            <div className="text-3xl font-bold text-gradient font-orbitron">
              {playerLevel}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider font-orbitron mt-1">
              Hunter Level
            </div>
          </div>
          
          <div className="glass-dark rounded-lg p-4 border border-gray-800 text-center">
            <div className="text-3xl font-bold text-gradient-gold font-orbitron">
              {getTotalXP().toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider font-orbitron mt-1">
              Total XP
            </div>
          </div>
          
          <div className="glass-dark rounded-lg p-4 border border-gray-800 text-center">
            <div className="text-3xl font-bold text-blue-400 font-orbitron">
              {dailyMissions.filter(m => m.completed).length}/{dailyMissions.length}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider font-orbitron mt-1">
              Missions
            </div>
          </div>
          
          <div className="glass-dark rounded-lg p-4 border border-gray-800 text-center">
            <div className="text-3xl font-bold text-orange-400 font-orbitron">
              {totalLogins}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider font-orbitron mt-1">
              Days Active
            </div>
          </div>
        </div>

        {/* System Message */}
        <div className="glass-dark rounded-lg p-4 border border-blue-500/30 text-center">
          <p className="text-sm text-gray-400 font-orbitron">
            <span className="text-blue-400">⚡ SYSTEM:</span> Continue your evolution, Hunter. Every action brings you closer to your peak.
          </p>
        </div>

        {/* Floating Action Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-40 group"
          style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)' }}
        >
          <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
        </button>

        {/* Modals and Notifications */}
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

        <LoginBonusModal
          isOpen={showLoginBonus}
          xpAmount={loginBonusAmount}
          loginCount={totalLogins}
          onClaim={claimLoginBonus}
        />
      </div>
    </main>
  );
}
