export interface LyricLine {
  time?: number; // Optional timing for syncing later
  text: string;
  type: 'verse' | 'chorus' | 'intro' | 'bridge';
}

export type AppState = 'GIFT' | 'OPENING' | 'LANDING';

export interface MemoryCard {
  title: string;
  desc: string;
  icon: string;
  color: string;
}

export interface Memory {
  id: number;
  year: number;
  title: string;
  description: string;
  imageUrl: string;
}