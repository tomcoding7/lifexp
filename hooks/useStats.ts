import { useCallback, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { UserData, Stat, XPLog, StatType, Mission } from '@/types';
import { STATS_CONFIG, getXPForLevel, SYSTEM_MESSAGES, MISSION_POOL, getRankForLevel } from '@/types';

const getInitialStats = (): Record<StatType, Stat> => {
  const stats = {} as Record<StatType, Stat>;
  
  Object.entries(STATS_CONFIG).forEach(([id, config]) => {
    stats[id as StatType] = {
      id: id as StatType,
      name: config.name,
      emoji: config.emoji,
      color: config.color,
      glowColor: config.glowColor,
      level: 1,
      currentXP: 0,
      totalXP: 0,
    };
  });
  
  return stats;
};

const generateDailyMissions = (): Mission[] => {
  const shuffled = [...MISSION_POOL].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 5);
  
  return selected.map((mission, index) => ({
    id: `mission-${Date.now()}-${index}`,
    statId: mission.statId,
    title: mission.title,
    description: mission.description,
    xp: mission.xp,
    completed: false,
  }));
};

const initialUserData: UserData = {
  stats: getInitialStats(),
  logs: [],
  streak: {
    current: 0,
    lastLogDate: null,
  },
  dailyMissions: generateDailyMissions(),
  lastMissionReset: new Date().toDateString(),
  lastLoginBonus: null,
  totalLogins: 0,
};

export function useStats() {
  const [userData, setUserData, isLoaded] = useLocalStorage<UserData>('lifexp-hunter-data', initialUserData);
  const [levelUpStat, setLevelUpStat] = useState<StatType | null>(null);
  const [motivationalMessage, setMotivationalMessage] = useState<string>('');
  const [showLoginBonus, setShowLoginBonus] = useState(false);
  const [loginBonusAmount, setLoginBonusAmount] = useState(0);

  // Check for login bonus
  const checkLoginBonus = useCallback(() => {
    const today = new Date().toDateString();
    
    if (userData.lastLoginBonus !== today) {
      const bonusXP = 10 + (userData.totalLogins % 7) * 5; // 10-40 XP based on login streak
      setLoginBonusAmount(bonusXP);
      setShowLoginBonus(true);
      
      setUserData((prevData) => ({
        ...prevData,
        lastLoginBonus: today,
        totalLogins: prevData.totalLogins + 1,
      }));
    }
  }, [userData.lastLoginBonus, userData.totalLogins, setUserData]);

  // Check and reset daily missions
  const checkDailyMissions = useCallback(() => {
    const today = new Date().toDateString();
    
    if (userData.lastMissionReset !== today) {
      setUserData((prevData) => ({
        ...prevData,
        dailyMissions: generateDailyMissions(),
        lastMissionReset: today,
      }));
    }
  }, [userData.lastMissionReset, setUserData]);

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
      let xpNeeded = getXPForLevel(stat.level);
      
      while (stat.currentXP >= xpNeeded) {
        stat.currentXP -= xpNeeded;
        stat.level += 1;
        levelsGained += 1;
        xpNeeded = getXPForLevel(stat.level);
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
      
      const messages = SYSTEM_MESSAGES[statId];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setMotivationalMessage(`${randomMessage} [+${xp} XP]`);
      
      return newData;
    });
  }, [setUserData, updateStreak]);

  const completeMission = useCallback((missionId: string) => {
    setUserData((prevData) => {
      const mission = prevData.dailyMissions.find(m => m.id === missionId);
      if (!mission || mission.completed) return prevData;

      const newData = { ...prevData };
      
      // Mark mission as completed
      newData.dailyMissions = prevData.dailyMissions.map(m =>
        m.id === missionId ? { ...m, completed: true } : m
      );
      
      // Add XP to the stat
      const stat = { ...newData.stats[mission.statId] };
      stat.totalXP += mission.xp;
      stat.currentXP += mission.xp;
      
      let levelsGained = 0;
      let xpNeeded = getXPForLevel(stat.level);
      
      while (stat.currentXP >= xpNeeded) {
        stat.currentXP -= xpNeeded;
        stat.level += 1;
        levelsGained += 1;
        xpNeeded = getXPForLevel(stat.level);
      }
      
      newData.stats[mission.statId] = stat;
      
      // Add log
      const newLog: XPLog = {
        id: `${Date.now()}-${Math.random()}`,
        statId: mission.statId,
        description: `Mission: ${mission.title}`,
        xp: mission.xp,
        timestamp: Date.now(),
      };
      
      newData.logs = [newLog, ...newData.logs];
      
      if (levelsGained > 0) {
        setLevelUpStat(mission.statId);
      }
      
      setMotivationalMessage(`✅ System: Mission completed. [+${mission.xp} XP]`);
      
      return newData;
    });
  }, [setUserData]);

  const claimLoginBonus = useCallback(() => {
    if (loginBonusAmount > 0) {
      // Distribute bonus XP across all stats
      const xpPerStat = Math.floor(loginBonusAmount / 6);
      
      setUserData((prevData) => {
        const newData = { ...prevData };
        
        Object.keys(newData.stats).forEach((statId) => {
          const stat = { ...newData.stats[statId as StatType] };
          stat.totalXP += xpPerStat;
          stat.currentXP += xpPerStat;
          
          let xpNeeded = getXPForLevel(stat.level);
          while (stat.currentXP >= xpNeeded) {
            stat.currentXP -= xpNeeded;
            stat.level += 1;
            xpNeeded = getXPForLevel(stat.level);
          }
          
          newData.stats[statId as StatType] = stat;
        });
        
        return newData;
      });
      
      setShowLoginBonus(false);
      setMotivationalMessage(`⚡ System: Daily login bonus claimed. [+${loginBonusAmount} XP distributed]`);
    }
  }, [loginBonusAmount, setUserData]);

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

  const getPlayerRank = useCallback(() => {
    return getRankForLevel(getPlayerLevel());
  }, [getPlayerLevel]);

  const getTotalXP = useCallback(() => {
    return Object.values(userData.stats).reduce((sum, stat) => sum + stat.totalXP, 0);
  }, [userData.stats]);

  return {
    stats: userData.stats,
    logs: userData.logs,
    streak: userData.streak,
    dailyMissions: userData.dailyMissions,
    totalLogins: userData.totalLogins,
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
  };
}
