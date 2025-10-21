import { useCallback, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { UserData, Stat, XPLog, StatType } from '@/types';
import { STATS_CONFIG, XP_PER_LEVEL, MOTIVATIONAL_MESSAGES } from '@/types';

const getInitialStats = (): Record<StatType, Stat> => {
  const stats = {} as Record<StatType, Stat>;
  
  Object.entries(STATS_CONFIG).forEach(([id, config]) => {
    stats[id as StatType] = {
      id: id as StatType,
      name: config.name,
      emoji: config.emoji,
      color: config.color,
      level: 1,
      currentXP: 0,
      totalXP: 0,
    };
  });
  
  return stats;
};

const initialUserData: UserData = {
  stats: getInitialStats(),
  logs: [],
  streak: {
    current: 0,
    lastLogDate: null,
  },
};

export function useStats() {
  const [userData, setUserData, isLoaded] = useLocalStorage<UserData>('lifexp-data', initialUserData);
  const [levelUpStat, setLevelUpStat] = useState<StatType | null>(null);
  const [motivationalMessage, setMotivationalMessage] = useState<string>('');

  const updateStreak = useCallback((currentStreak: { current: number; lastLogDate: string | null }) => {
    const today = new Date().toDateString();
    
    if (!currentStreak.lastLogDate) {
      return { current: 1, lastLogDate: today };
    }
    
    const lastDate = new Date(currentStreak.lastLogDate).toDateString();
    
    if (lastDate === today) {
      return currentStreak;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (lastDate === yesterdayStr) {
      return { current: currentStreak.current + 1, lastLogDate: today };
    }
    
    return { current: 1, lastLogDate: today };
  }, []);

  const addXP = useCallback((statId: StatType, xp: number, description: string) => {
    setUserData((prevData) => {
      const newData = { ...prevData };
      const stat = { ...newData.stats[statId] };
      
      stat.totalXP += xp;
      stat.currentXP += xp;
      
      let levelsGained = 0;
      while (stat.currentXP >= XP_PER_LEVEL) {
        stat.currentXP -= XP_PER_LEVEL;
        stat.level += 1;
        levelsGained += 1;
      }
      
      newData.stats[statId] = stat;
      
      const newLog: XPLog = {
        id: `${Date.now()}-${Math.random()}`,
        statId,
        description,
        xp,
        timestamp: Date.now(),
      };
      
      newData.logs = [newLog, ...newData.logs];
      newData.streak = updateStreak(prevData.streak);
      
      if (levelsGained > 0) {
        setLevelUpStat(statId);
      }
      
      const messages = MOTIVATIONAL_MESSAGES[statId];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setMotivationalMessage(`${randomMessage.replace(/XP earned/, `+${xp} XP earned`)}`);
      
      return newData;
    });
  }, [setUserData, updateStreak]);

  const clearLevelUp = useCallback(() => {
    setLevelUpStat(null);
  }, []);

  const clearMessage = useCallback(() => {
    setMotivationalMessage('');
  }, []);

  const getPlayerLevel = useCallback(() => {
    const totalLevels = Object.values(userData.stats).reduce((sum, stat) => sum + stat.level, 0);
    return Math.floor(totalLevels / 6);
  }, [userData.stats]);

  const getTotalXP = useCallback(() => {
    return Object.values(userData.stats).reduce((sum, stat) => sum + stat.totalXP, 0);
  }, [userData.stats]);

  return {
    stats: userData.stats,
    logs: userData.logs,
    streak: userData.streak,
    addXP,
    levelUpStat,
    clearLevelUp,
    motivationalMessage,
    clearMessage,
    getPlayerLevel,
    getTotalXP,
    isLoaded,
  };
}


