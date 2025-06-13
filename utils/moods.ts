export interface MoodEntry {
  id: string;
  mood: 'happy' | 'neutral' | 'sad';
  comment?: string;
  timestamp: Date;
  employeeName?: string;
}

// In-memory storage for mood entries
let moods: MoodEntry[] = [
 
];

export function getAllMoods(): MoodEntry[] {
  return moods.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function addMood(mood: Omit<MoodEntry, 'id' | 'timestamp'>): MoodEntry {
  const newMood: MoodEntry = {
    ...mood,
    id: Date.now().toString(),
    timestamp: new Date()
  };
  moods.push(newMood);
  return newMood;
}

export function getMoodStats() {
  const total = moods.length;
  const happy = moods.filter(m => m.mood === 'happy').length;
  const neutral = moods.filter(m => m.mood === 'neutral').length;
  const sad = moods.filter(m => m.mood === 'sad').length;
  
  return {
    total,
    happy: Math.round((happy / total) * 100) || 0,
    neutral: Math.round((neutral / total) * 100) || 0,
    sad: Math.round((sad / total) * 100) || 0
  };
}