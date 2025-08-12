// Data model types for Leaf.io app

export interface User {
  id: string;
  name: string;
  email: string;
  ageBracket: '13-15' | '16-17' | '18+';
  riskLevel: 'conservative' | 'moderate' | 'growth';
  values: string[];
  avoids: string[];
  createdAt: string;
}

export interface Budget {
  month: string; // YYYY-MM format
  income: number;
  targets: {
    needs: number;
    wants: number;
    saveImpact: number;
  };
  spent: {
    needs: number;
    wants: number;
    saveImpact: number;
  };
}

export interface Transaction {
  id: string;
  date: string; // ISO date string
  merchant: string;
  category: 'needs' | 'wants' | 'saveImpact';
  amount: number;
  notes?: string;
  isSubscription: boolean;
  isRecurring?: boolean;
  recurringFrequency?: 'weekly' | 'monthly' | 'yearly';
}

export interface Rule {
  id: string;
  ifContains: string;
  setCategory: 'needs' | 'wants' | 'saveImpact';
  isActive: boolean;
  createdAt: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  tags: string[];
  icon: string; // Icon name from lucide-react
  color: string; // Tailwind color class
  allocatedAmount: number;
  totalSimulated: number;
}

export interface SimHolding {
  id: string;
  symbol: string;
  name: string;
  themeId: string;
  risk: 'low' | 'moderate' | 'high';
  allocation: number; // percentage
  simPerf: {
    '1w': number;
    '1m': number;
    '1y': number;
  };
  impactNotes: string;
  price: number;
  shares: number;
}

export interface RedirectEvent {
  id: string;
  date: string; // ISO date string
  amount: number;
  themeId: string;
  note: string;
  source: 'spare-change' | 'manual' | 'recurring';
}

export interface LearnBite {
  id: string;
  title: string;
  description: string;
  durationMin: number;
  completed: boolean;
  category: 'budgeting' | 'investing' | 'impact' | 'general';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completedAt?: string;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  badge?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface AppData {
  user: User;
  budgets: Budget[];
  transactions: Transaction[];
  rules: Rule[];
  themes: Theme[];
  holdings: SimHolding[];
  redirectEvents: RedirectEvent[];
  learnBites: LearnBite[];
  achievements: Achievement[];
}