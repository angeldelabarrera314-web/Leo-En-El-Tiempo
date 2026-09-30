export interface TimeTravelResult {
  yearOrEra: string;
  title: string;
  shortSummary: string;
  curiousFacts: string[];
  howChildrenLived: string;
  soundOrSensation: string;
  leoChallenge: string;
  timeMachineCoordinates: {
    era: string;
    temporalFlux: string;
    dangerLevel: "Tranquilo" | "Aventura" | "Épico";
  };
  colombianContext?: {
    decade: string;
    region: string;
    socialTheme: string;
  };
}

export interface TravelStamp {
  id: string;
  year: string;
  title: string;
  era: string;
  icon: string;
  region: string;
  visitedAt: string;
  description: string;
}

export interface QuickEra {
  id: string;
  year: number;
  label: string;
  decade: string;
  title: string;
  icon: string;
  color: string;
  theme: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  targetYear: number;
  icon: string;
  completed: boolean;
  xpReward: number;
  category: "Ciencias Sociales" | "Tecnología" | "Arte y Cultura";
}

export interface TriviaQuestion {
  id: string;
  year: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  rewardCoins: number;
  category?: string;
}

export interface AvatarItem {
  id: string;
  name: string;
  category: "hat" | "glasses" | "suit" | "badge";
  icon: string;
  unlocked: boolean;
  cost: number;
  description: string;
}

export type ProsodyMode = 'humano' | 'pedagogico' | 'expresivo' | 'lineal';

export interface LeoVoiceSettings {
  pitch: number;
  rate: number;
  volume: number;
  autoSpeak: boolean;
  enabled: boolean;
  prosodyMode?: ProsodyMode;
  prosodicPauses?: boolean;
  prosodicInflection?: number; // 0.0 to 0.25 (degree of pitch modulation)
}

export interface ExplorerRank {
  id: string;
  level: number;
  title: string;
  badgeIcon: string;
  minJumps: number;
  minXP: number;
  color: string;
  borderColor: string;
  bgColor: string;
  description: string;
  perk: string;
}

export type HomeworkMode = 'summary' | 'key_dates' | 'bullet_points' | 'poster_ideas' | 'quiz_prep' | 'easy_explain';

export interface HomeworkHelperResult {
  mode: HomeworkMode;
  query: string;
  title: string;
  content: string;
  bulletPoints?: string[];
  keyDates?: { year: string; event: string }[];
  notebookDraft?: string;
  posterIdeas?: { title: string; slogan: string; drawRecommendation: string };
  studyQuiz?: { question: string; answer: string }[];
  funFactForClass: string;
  sourceText?: string;
}

export interface VintageNewspaperData {
  newspaperName: string;
  editionDate: string;
  headline: string;
  subheadline: string;
  leadArticle: string;
  secondaryArticle: string;
  reporterName: string;
  historicLocation: string;
  curiousSnippet: string;
  quoteOfTheDay: string;
  priceTag: string;
}

