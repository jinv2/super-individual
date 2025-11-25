export interface ProfileLink {
  label: string;
  url: string;
  icon: string;
  description?: string;
}

export interface StatItem {
  label: string;
  value: string;
  subValue: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
