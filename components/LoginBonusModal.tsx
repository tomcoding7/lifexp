'use client';

import { Gift, Sparkles } from 'lucide-react';

interface LoginBonusModalProps {
  isOpen: boolean;
  xpAmount: number;
  loginCount: number;
  onClaim: () => void;
}

export default function LoginBonusModal({ isOpen, xpAmount, loginCount, onClaim }: LoginBonusModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="glass-dark rounded-2xl max-w-md w-full p-8 border-2 border-blue-500/50 shadow-2xl relative overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
        
        <div className="relative z-10 text-center">
          {/* Icon */}
          <div className="mb-6 relative">
            <div className="inline-block p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-bounce">
              <Gift className="w-12 h-12 text-white" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
            <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-blue-400 animate-spin" style={{ animationDuration: '4s' }} />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold mb-2 text-gradient font-orbitron">
            DAILY LOGIN BONUS
          </h2>
          
          <p className="text-gray-400 mb-6">
            System detected hunter presence
          </p>

          {/* XP Amount */}
          <div className="mb-6 p-6 bg-black/50 rounded-lg border border-gray-700">
            <div className="text-5xl font-bold text-gradient-gold mb-2 font-orbitron">
              +{xpAmount}
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">
              XP REWARDED
            </div>
          </div>

          {/* Login count */}
          <div className="mb-6 flex items-center justify-center gap-2 text-gray-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">
              Login streak: <span className="font-bold text-blue-400">{loginCount} days</span>
            </span>
            <Sparkles className="w-4 h-4" />
          </div>

          {/* Claim button */}
          <button
            onClick={onClaim}
            className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 font-orbitron uppercase tracking-wider relative overflow-hidden group"
          >
            <span className="relative z-10">Claim Reward</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <p className="text-xs text-gray-600 mt-4">
            XP will be distributed across all stats
          </p>
        </div>
      </div>
    </div>
  );
}

