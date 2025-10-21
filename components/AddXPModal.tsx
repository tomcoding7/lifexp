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
  const [selectedStat, setSelectedStat] = useState<StatType>('discipline');
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Add XP
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Mode Toggle */}
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <button
              onClick={() => setMode('preset')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                mode === 'preset'
                  ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Quick Actions
            </button>
            <button
              onClick={() => setMode('custom')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                mode === 'custom'
                  ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Custom
            </button>
          </div>

          {/* Stat Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Category
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {(Object.keys(STATS_CONFIG) as StatType[]).map((statId) => {
                const config = STATS_CONFIG[statId];
                return (
                  <button
                    key={statId}
                    onClick={() => setSelectedStat(statId)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedStat === statId
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="text-2xl mb-1">{config.emoji}</div>
                    <div className="text-xs font-medium text-gray-800 dark:text-white">
                      {config.name.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {mode === 'preset' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quick Actions
              </label>
              <div className="space-y-2">
                {presetActionsForStat.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handlePresetClick(action.statId, action.xp, action.label)}
                    className="w-full p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left transition-colors flex items-center justify-between group"
                  >
                    <span className="font-medium text-gray-800 dark:text-white">{action.label}</span>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                      +{action.xp} XP
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What did you do? (e.g., went swimming, posted TikTok)"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  XP Amount
                </label>
                <input
                  type="number"
                  value={customXP}
                  onChange={(e) => setCustomXP(e.target.value)}
                  min="1"
                  max="1000"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Add +{customXP} XP to {STATS_CONFIG[selectedStat].name}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

