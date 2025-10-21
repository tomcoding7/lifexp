export type StatType = 
  | 'intelligence' 
  | 'charisma' 
  | 'energy' 
  | 'wealth' 
  | 'connection' 
  | 'creative';

export interface Stat {
  id: StatType;
  name: string;
  emoji: string;
  color: string;
  glowColor: string;
  level: number;
  currentXP: number;
  totalXP: number;
}

export interface XPLog {
  id: string;
  statId: StatType;
  description: string;
  xp: number;
  timestamp: number;
}

export interface Mission {
  id: string;
  statId: StatType;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
}

export interface PresetAction {
  id: string;
  statId: StatType;
  label: string;
  xp: number;
}

export interface UserData {
  stats: Record<StatType, Stat>;
  logs: XPLog[];
  streak: {
    current: number;
    lastLogDate: string | null;
  };
  dailyMissions: Mission[];
  lastMissionReset: string | null;
  lastLoginBonus: string | null;
  totalLogins: number;
}

export const STATS_CONFIG: Record<StatType, { name: string; emoji: string; color: string; glowColor: string }> = {
  intelligence: { name: 'INTELLIGENCE', emoji: '🧠', color: '#60a5fa', glowColor: 'rgba(96, 165, 250, 0.5)' },
  energy: { name: 'ENERGY', emoji: '⚡', color: '#fbbf24', glowColor: 'rgba(251, 191, 36, 0.5)' },
  charisma: { name: 'CHARISMA', emoji: '💬', color: '#a78bfa', glowColor: 'rgba(167, 139, 250, 0.5)' },
  wealth: { name: 'WEALTH', emoji: '💼', color: '#34d399', glowColor: 'rgba(52, 211, 153, 0.5)' },
  connection: { name: 'CONNECTION', emoji: '❤️', color: '#f87171', glowColor: 'rgba(248, 113, 113, 0.5)' },
  creative: { name: 'CREATIVE', emoji: '🎬', color: '#fb923c', glowColor: 'rgba(251, 146, 60, 0.5)' },
};

// Dynamic XP scaling like Solo Leveling
export const getXPForLevel = (level: number): number => {
  if (level <= 1) return 20;
  if (level <= 2) return 60;
  if (level <= 3) return 150;
  if (level <= 5) return 300;
  if (level <= 10) return 500;
  if (level <= 20) return 800;
  return Math.floor(800 + (level - 20) * 200);
};

export interface Rank {
  name: string;
  minLevel: number;
  maxLevel: number;
  class: string;
  color: string;
  glowColor: string;
}

export const RANKS: Rank[] = [
  { name: 'F-Class Hunter', minLevel: 1, maxLevel: 4, class: 'F', color: '#9ca3af', glowColor: 'rgba(156, 163, 175, 0.5)' },
  { name: 'E-Class Hunter', minLevel: 5, maxLevel: 9, class: 'E', color: '#60a5fa', glowColor: 'rgba(96, 165, 250, 0.5)' },
  { name: 'D-Class Hunter', minLevel: 10, maxLevel: 14, class: 'D', color: '#34d399', glowColor: 'rgba(52, 211, 153, 0.5)' },
  { name: 'C-Class Hunter', minLevel: 15, maxLevel: 19, class: 'C', color: '#fbbf24', glowColor: 'rgba(251, 191, 36, 0.5)' },
  { name: 'B-Class Hunter', minLevel: 20, maxLevel: 29, class: 'B', color: '#f87171', glowColor: 'rgba(248, 113, 113, 0.5)' },
  { name: 'A-Class Hunter', minLevel: 30, maxLevel: 49, class: 'A', color: '#a78bfa', glowColor: 'rgba(167, 139, 250, 0.5)' },
  { name: 'S-Class Hunter', minLevel: 50, maxLevel: 99, class: 'S', color: '#fb923c', glowColor: 'rgba(251, 146, 60, 0.5)' },
  { name: 'National Level Hunter', minLevel: 100, maxLevel: 999, class: 'SS', color: '#ec4899', glowColor: 'rgba(236, 72, 153, 0.5)' },
];

export const getRankForLevel = (level: number): Rank => {
  return RANKS.find(rank => level >= rank.minLevel && level <= rank.maxLevel) || RANKS[0];
};

export const PRESET_ACTIONS: PresetAction[] = [
  // Intelligence
  { id: 'int-1', statId: 'intelligence', label: 'Deep work session', xp: 25 },
  { id: 'int-2', statId: 'intelligence', label: 'Read/Study', xp: 15 },
  { id: 'int-3', statId: 'intelligence', label: 'Problem solving', xp: 20 },
  
  // Energy
  { id: 'eng-1', statId: 'energy', label: 'Workout completed', xp: 20 },
  { id: 'eng-2', statId: 'energy', label: 'Healthy meal', xp: 10 },
  { id: 'eng-3', statId: 'energy', label: 'Resisted temptation', xp: 15 },
  
  // Charisma
  { id: 'cha-1', statId: 'charisma', label: 'Social interaction', xp: 15 },
  { id: 'cha-2', statId: 'charisma', label: 'Public speaking', xp: 25 },
  { id: 'cha-3', statId: 'charisma', label: 'Helped someone', xp: 20 },
  
  // Wealth
  { id: 'wea-1', statId: 'wealth', label: 'Income generation', xp: 30 },
  { id: 'wea-2', statId: 'wealth', label: 'Financial planning', xp: 15 },
  { id: 'wea-3', statId: 'wealth', label: 'Learning investing', xp: 20 },
  
  // Connection
  { id: 'con-1', statId: 'connection', label: 'Quality time', xp: 20 },
  { id: 'con-2', statId: 'connection', label: 'Reached out', xp: 10 },
  { id: 'con-3', statId: 'connection', label: 'Deep conversation', xp: 25 },
  
  // Creative
  { id: 'cre-1', statId: 'creative', label: 'Created content', xp: 20 },
  { id: 'cre-2', statId: 'creative', label: 'Built something', xp: 25 },
  { id: 'cre-3', statId: 'creative', label: 'Practiced skill', xp: 15 },
];

// System-style dramatic messages
export const SYSTEM_MESSAGES: Record<StatType, string[]> = {
  intelligence: [
    '⚡ System: Neural patterns accelerating. Intelligence increased.',
    '🧠 System: Mind sharpened. Cognitive enhancement detected.',
    '⚡ System: Knowledge absorption rate optimal.',
    '🧠 System: Mental clarity reaching new heights.',
  ],
  energy: [
    '⚡ System: Power surge detected. Energy levels rising.',
    '🔥 System: Physical enhancement in progress.',
    '⚡ System: Stamina reserves expanding.',
    '🔥 System: Vitality overflow detected.',
  ],
  charisma: [
    '💫 System: Charm +1. Social influence growing.',
    '✨ System: Charisma stat evolution detected.',
    '💫 System: Presence level increased.',
    '✨ System: Persuasion capabilities enhanced.',
  ],
  wealth: [
    '💰 System: Wealth energy rising. Financial aura detected.',
    '💎 System: Money magnetism intensifying.',
    '💰 System: Abundance frequency unlocked.',
    '💎 System: Prosperity matrix activated.',
  ],
  connection: [
    '❤️ System: Bond strength increased. Connection deepened.',
    '💝 System: Relationship stat enhanced.',
    '❤️ System: Empathy levels optimal.',
    '💝 System: Social bond reinforced.',
  ],
  creative: [
    '🎨 System: Creative flow detected. Innovation unlocked.',
    '⚡ System: Imagination stat amplified.',
    '🎨 System: Artistic potential expanding.',
    '⚡ System: Creation power surging.',
  ],
};

export const MISSION_POOL = [
  // Intelligence Missions
  { statId: 'intelligence' as StatType, title: 'Mental Fortress', description: 'Focus for 25 minutes without distraction', xp: 25 },
  { statId: 'intelligence' as StatType, title: 'Knowledge Seeker', description: 'Learn something new today', xp: 20 },
  { statId: 'intelligence' as StatType, title: 'Problem Crusher', description: 'Solve a difficult problem', xp: 30 },
  
  // Energy Missions
  { statId: 'energy' as StatType, title: 'Physical Dominance', description: 'Complete a workout session', xp: 25 },
  { statId: 'energy' as StatType, title: 'Defeat Comfort', description: 'Resist the urge to scroll/snack', xp: 20 },
  { statId: 'energy' as StatType, title: 'Morning Warrior', description: 'Wake up early and start strong', xp: 30 },
  
  // Charisma Missions
  { statId: 'charisma' as StatType, title: 'Social Courage', description: 'Talk to a stranger or new person', xp: 25 },
  { statId: 'charisma' as StatType, title: 'Charm Enhancement', description: 'Make someone smile today', xp: 15 },
  { statId: 'charisma' as StatType, title: 'Leader\'s Path', description: 'Lead a conversation or meeting', xp: 30 },
  
  // Wealth Missions
  { statId: 'wealth' as StatType, title: 'Money Moves', description: 'Work on income-generating activity', xp: 35 },
  { statId: 'wealth' as StatType, title: 'Financial Wisdom', description: 'Review or plan your finances', xp: 20 },
  { statId: 'wealth' as StatType, title: 'Value Creation', description: 'Create something of value', xp: 30 },
  
  // Connection Missions
  { statId: 'connection' as StatType, title: 'Bond Strengthening', description: 'Spend quality time with loved ones', xp: 25 },
  { statId: 'connection' as StatType, title: 'Heart Bridge', description: 'Reach out to someone you care about', xp: 20 },
  { statId: 'connection' as StatType, title: 'Deep Link', description: 'Have a meaningful conversation', xp: 30 },
  
  // Creative Missions
  { statId: 'creative' as StatType, title: 'Creator Mode', description: 'Make or build something new', xp: 25 },
  { statId: 'creative' as StatType, title: 'Innovation Spark', description: 'Post or share your work', xp: 20 },
  { statId: 'creative' as StatType, title: 'Skill Forge', description: 'Practice your craft', xp: 20 },
];


