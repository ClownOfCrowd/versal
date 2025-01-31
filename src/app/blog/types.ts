export interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  aiGenerated: boolean;
  aiResponse?: string;
  ingredients?: string[];
  readingTime?: string;
  likes?: number;
}

export interface AIResponse {
  text: string;
  suggestions?: string[];
  personalNote?: string;
  relatedPosts?: BlogPost[];
  mood?: 'friendly' | 'professional' | 'enthusiastic';
}

export interface AIPersonality {
  name: string;
  role: string;
  specialties: string[];
  greetings: string[];
  personalNotes: string[];
} 