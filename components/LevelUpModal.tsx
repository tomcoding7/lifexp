'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, X, Zap } from 'lucide-react';
import type { Stat } from '@/types';
import { getRankForLevel } from '@/types';

interface LevelUpModalProps {
  stat: Stat | null;
  onClose: () => void;
}

export default function LevelUpModal({ stat, onClose }: LevelUpModalProps) {
  useEffect(() => {
    if (stat) {
      // Epic confetti for level up
      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 100 * (timeLeft / duration);
        
        confetti({
          particleCount,
          startVelocity: 40,
          spread: 360,
          ticks: 80,
          origin: { x: 0.5, y: 0.5 },
          colors: [stat.color, '#ffffff', '#ffd700'],
          zIndex: 100,
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [stat]);

  if (!stat) return null;

  const rank = getRankForLevel(stat.level);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[80] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="glass-dark rounded-2xl max-w-md w-full relative overflow-hidden border-2 shadow-2xl"
        style={{ 
          borderColor: stat.color,
          boxShadow: `0 0 40px ${stat.glowColor}`
        }}
      >
        {/* Animated background */}
        <div 
          className="absolute inset-0 opacity-20 animate-pulse"
          style={{ backgroundColor: stat.color }}
        />
        
        <div className="relative z-10 p-8 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>

          {/* Icon with glow */}
          <div className="mb-6 relative">
            <div 
              className="inline-flex p-6 rounded-full animate-bounce"
              style={{ 
                backgroundColor: stat.color,
                boxShadow: `0 0 40px ${stat.glowColor}, 0 0 80px ${stat.glowColor}`
              }}
            >
              <Zap className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Level Up Text */}
          <div className="mb-4">
            <h2 className="text-4xl font-bold font-orbitron mb-2 uppercase tracking-wider" 
              style={{ 
                color: stat.color,
                textShadow: `0 0 20px ${stat.glowColor}`
              }}
            >
              LEVEL UP!
            </h2>
            <p className="text-gray-400 text-sm uppercase tracking-wide">
              System: Enhancement complete
            </p>
          </div>
          
          {/* Stat Info */}
          <div className="text-6xl my-6 animate-bounce">{stat.emoji}</div>
          
          <div className="mb-6 space-y-2">
            <p className="text-xl font-orbitron uppercase tracking-wide text-gray-300">
              {stat.name}
            </p>
            
            <div className="inline-block px-6 py-3 bg-black/50 rounded-lg border"
              style={{ borderColor: stat.color }}
            >
              <div className="text-5xl font-bold font-orbitron"
                style={{ 
                  color: stat.color,
                  textShadow: `0 0 20px ${stat.glowColor}`
                }}
              >
                {stat.level}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Level</div>
            </div>
          </div>

          {/* Rank check */}
          {stat.level === rank.minLevel && stat.level > 1 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-yellow-500 font-bold font-orbitron">
                NEW RANK: {rank.name.toUpperCase()}
              </p>
            </div>
          )}
          
          <div className="mb-6 space-y-2">
            <p className="text-gray-400">
              You're evolving beyond your limits.
            </p>
            <p className="text-sm text-gray-500">
              Continue growing stronger, Hunter.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 font-orbitron uppercase tracking-wider relative overflow-hidden group"
            style={{ 
              backgroundColor: stat.color,
              boxShadow: `0 0 20px ${stat.glowColor}`
            }}
          >
            <span className="relative z-10 text-white">Continue Evolution</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
