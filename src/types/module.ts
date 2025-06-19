
import type { LucideIcon } from 'lucide-react';
import type { SVGProps } from 'react';

export type ScreenType =
  | 'intro'
  | 'coreMessage'
  | 'interactiveTips'
  | 'sortingGame'
  | 'knowledgeQuiz'
  | 'reward'
  | 'mythOrFact'; // Added new screen type

export interface Tip {
  id: string;
  title: string;
  content: string;
  icon?: LucideIcon | React.FC<SVGProps<SVGSVGElement>>;
}

export interface WasteItem {
  id: string;
  name: string;
  type: 'recycling' | 'trash' | 'compost';
  icon: React.FC<SVGProps<SVGSVGElement>> | LucideIcon;
  dataAiHint?: string;
}

export interface Bin {
  id: 'recycling' | 'trash' | 'compost';
  name: string;
  accepts: 'recycling' | 'trash' | 'compost';
  icon: LucideIcon;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  feedbackCorrect: string;
  feedbackIncorrect: string;
  explanation?: string;
}

export interface MythOrFactStatement {
  id: string;
  statementText: string;
  isFact: boolean;
  explanation: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: React.FC<SVGProps<SVGSVGElement>> | LucideIcon;
  description: string;
}

export interface ScreenConfig {
  id: string;
  type: ScreenType;
  title?: string;
  voiceoverUrl?: string;
  content?: string;
  videoUrl?: string;
  tips?: Tip[];
  gameItems?: WasteItem[];
  bins?: Bin[];
  questions?: QuizQuestion[];
  mythOrFactStatements?: MythOrFactStatement[]; // Added for the new screen type
  badgeToAward?: string;
  backgroundImageUrl?: string;
  backgroundAiHint?: string;
}
