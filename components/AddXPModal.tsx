'use client';

import { useState } from 'react';
import { X, Zap } from 'lucide-react';
import type { StatType } from '@/types';
import { STATS_CONFIG, PRESET_ACTIONS } from '@/types';

interface AddXPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddXP: (statId: StatType, xp: number, description: string) => void;
}

export default function AddXPModal({ isOpen, onClose, onAddXP }: AddXPModalProps) {
  const [selectedStat, setSelectedStat] = useState<StatType>('energy');
  const [customXP, setCustomXP] = useState('10');
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState<'preset' | 'custom'>('preset');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'custom' && description.trim() && parseInt(customXP) > 0) {
      onAddXP(selectedStat, parseInt(customXP), description.trim());
      setDescription('');
      setCustomXP('10');
      onClose();
    }
  };

  const handlePresetClick = (statId: StatType, xp: number, label: string) => {
    onAddXP(statId, xp, label);
    onClose();
  };

  const presetActionsForStat = PRESET_ACTIONS.filter(action => action.statId === selectedStat);
  const selectedConfig = STATS_CONFIG[selectedStat];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-dark rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 relative">
        {/* Background glow */}
        <div 
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: selectedConfig.color }}
        />
        
        <div className="sticky top-0 glass-dark border-b border-gray-800 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold font-orbitron uppercase tracking-wider text-gradient flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Log Activity
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6 relative z-10">
          {/* Mode Toggle */}
          <div className="flex gap-2 bg-black/50 p-1 rounded-lg border border-gray-800">
            <button
              onClick={() => setMode('preset')}
              className={`flex-1 py-3 px-4 rounded-md font-semibold font-orbitron uppercase text-sm tracking-wider transition-all ${
                mode === 'preset'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Quick Actions
            </button>
            <button
              onClick={() => setMode('custom')}
              className={`flex-1 py-3 px-4 rounded-md font-semibold font-orbitron uppercase text-sm tracking-wider transition-all ${
                mode === 'custom'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Custom
            </button>
          </div>

          {/* Stat Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-3 font-orbitron uppercase tracking-wider">
              Select Stat
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(Object.keys(STATS_CONFIG) as StatType[]).map((statId) => {
                const config = STATS_CONFIG[statId];
                const isSelected = selectedStat === statId;
                return (
                  <button
                    key={statId}
                    onClick={() => setSelectedStat(statId)}
                    className={`p-4 rounded-lg border-2 transition-all relative overflow-hidden ${
                      isSelected
                        ? 'border-current bg-current/10'
                        : 'border-gray-800 hover:border-gray-700 bg-black/30'
                    }`}
                    style={isSelected ? { 
                      borderColor: config.color,
                      boxShadow: `0 0 20px ${config.glowColor}`
                    } : {}}
                  >
                    {isSelected && (
                      <div 
                        className="absolute inset-0 opacity-10"
                        style={{ backgroundColor: config.color }}
                      />
                    )}
                    <div className="relative z-10">
                      <div className="text-3xl mb-2">{config.emoji}</div>
                      <div className="text-xs font-orbitron font-semibold uppercase tracking-wide"
                        style={isSelected ? { color: config.color } : { color: '#9ca3af' }}
                      >
                        {config.name.split(' ')[0]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {mode === 'preset' ? (
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-3 font-orbitron uppercase tracking-wider">
                Quick Actions
              </label>
              <div className="space-y-2">
                {presetActionsForStat.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handlePresetClick(action.statId, action.xp, action.label)}
                    className="w-full p-4 bg-black/50 hover:bg-black/70 border border-gray-800 hover:border-gray-700 rounded-lg text-left transition-all flex items-center justify-between group"
                  >
                    <span className="font-medium text-gray-200">{action.label}</span>
                    <span 
                      className="text-sm font-bold font-orbitron group-hover:scale-110 transition-transform"
                      style={{ color: selectedConfig.color }}
                    >
                      +{action.xp} XP
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2 font-orbitron uppercase tracking-wider">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What did you accomplish?"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-600 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2 font-orbitron uppercase tracking-wider">
                  XP Amount
                </label>
                <input
                  type="number"
                  value={customXP}
                  onChange={(e) => setCustomXP(e.target.value)}
                  min="1"
                  max="1000"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-lg focus:ring-2 focus:border-transparent text-gray-200 font-bold font-orbitron text-lg"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 font-orbitron uppercase tracking-wider relative overflow-hidden group"
                style={{ 
                  backgroundColor: selectedConfig.color,
                  boxShadow: `0 0 20px ${selectedConfig.glowColor}`
                }}
              >
                <span className="relative z-10 text-white">
                  Add +{customXP} XP to {selectedConfig.name}
                </span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
