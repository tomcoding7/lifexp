export type StatType = 
  | 'connection' 
  | 'creative' 
  | 'clarity' 
  | 'financial' 
  | 'discipline' 
  | 'social';

export interface Stat {
  id: StatType;
  name: string;
  emoji: string;
  color: string;
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
}

export const STATS_CONFIG: Record<StatType, { name: string; emoji: string; color: string }> = {
  connection: { name: 'Connection & Relationships', emoji: '❤️', color: 'connection' },
  creative: { name: 'Creative Output', emoji: '🎬', color: 'creative' },
  clarity: { name: 'Clarity & Wisdom', emoji: '🧠', color: 'clarity' },
  financial: { name: 'Financial Momentum', emoji: '💼', color: 'financial' },
  discipline: { name: 'Discipline & Energy', emoji: '⚡', color: 'discipline' },
  social: { name: 'Social Presence', emoji: '💬', color: 'social' },
};

export const XP_PER_LEVEL = 100;

export const PRESET_ACTIONS: PresetAction[] = [
  // Connection & Relationships
  { id: 'conn-1', statId: 'connection', label: 'Had meaningful conversation', xp: 15 },
  { id: 'conn-2', statId: 'connection', label: 'Reached out to friend/family', xp: 10 },
  { id: 'conn-3', statId: 'connection', label: 'Quality time with loved ones', xp: 25 },
  
  // Creative Output
  { id: 'cre-1', statId: 'creative', label: 'Created content', xp: 20 },
  { id: 'cre-2', statId: 'creative', label: 'Worked on project', xp: 15 },
  { id: 'cre-3', statId: 'creative', label: 'Learned new skill', xp: 10 },
  
  // Clarity & Wisdom
  { id: 'cla-1', statId: 'clarity', label: 'Meditated', xp: 10 },
  { id: 'cla-2', statId: 'clarity', label: 'Journaled', xp: 15 },
  { id: 'cla-3', statId: 'clarity', label: 'Read book/article', xp: 20 },
  
  // Financial Momentum
  { id: 'fin-1', statId: 'financial', label: 'Worked on income source', xp: 25 },
  { id: 'fin-2', statId: 'financial', label: 'Reviewed finances', xp: 10 },
  { id: 'fin-3', statId: 'financial', label: 'Learned about investing', xp: 15 },
  
  // Discipline & Energy
  { id: 'dis-1', statId: 'discipline', label: 'Exercised', xp: 20 },
  { id: 'dis-2', statId: 'discipline', label: 'Ate healthy meal', xp: 10 },
  { id: 'dis-3', statId: 'discipline', label: 'Resisted temptation', xp: 15 },
  
  // Social Presence
  { id: 'soc-1', statId: 'social', label: 'Posted on social media', xp: 15 },
  { id: 'soc-2', statId: 'social', label: 'Engaged with audience', xp: 10 },
  { id: 'soc-3', statId: 'social', label: 'Networked professionally', xp: 20 },
];

export const MOTIVATIONAL_MESSAGES: Record<StatType, string[]> = {
  connection: [
    '❤️ Connection XP earned — relationships matter most!',
    '❤️ Your bonds grow stronger!',
    '❤️ Love and connection fuel the soul!',
  ],
  creative: [
    '🎬 Creative XP earned — you\'re building something amazing!',
    '🎬 Your creativity knows no bounds!',
    '🎬 Keep creating, the world needs your art!',
  ],
  clarity: [
    '🧠 Clarity XP earned — wisdom is accumulating!',
    '🧠 Your mind grows sharper!',
    '🧠 Knowledge is power, keep learning!',
  ],
  financial: [
    '💼 Financial XP earned — money magnet mode activated!',
    '💼 Your wealth mindset is strengthening!',
    '💼 Prosperity flows to you!',
  ],
  discipline: [
    '⚡ Discipline XP earned — you resisted distractions!',
    '⚡ Your willpower is unstoppable!',
    '⚡ Energy and focus locked in!',
  ],
  social: [
    '💬 Social Presence XP earned — your charisma grows!',
    '💬 Your influence is expanding!',
    '💬 You\'re making your mark!',
  ],
};


