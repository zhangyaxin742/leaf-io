import { AppData, User, Budget, Transaction, Rule, Theme, SimHolding, RedirectEvent, LearnBite, Achievement } from '@/types/data';

// Mock user data
const mockUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  ageBracket: '16-17',
  riskLevel: 'moderate',
  values: ['Environmental Protection', 'Social Justice', 'Community Development'],
  avoids: ['Fossil Fuels', 'Weapons', 'Tobacco'],
  createdAt: '2024-10-01T00:00:00Z'
};

// Mock budget data
const mockBudgets: Budget[] = [
  {
    month: '2024-12',
    income: 800,
    targets: {
      needs: 400, // 50%
      wants: 240, // 30%
      saveImpact: 160 // 20%
    },
    spent: {
      needs: 385,
      wants: 195,
      saveImpact: 125
    }
  },
  {
    month: '2024-11',
    income: 750,
    targets: {
      needs: 375,
      wants: 225,
      saveImpact: 150
    },
    spent: {
      needs: 390,
      wants: 210,
      saveImpact: 140
    }
  }
];

// Mock themes
const mockThemes: Theme[] = [
  {
    id: 'theme-1',
    name: 'Solar & Storage',
    description: 'Clean energy generation and battery storage solutions',
    tags: ['solar panels', 'battery storage', 'grid independence', 'renewable energy'],
    icon: 'Sun',
    color: 'yellow',
    allocatedAmount: 85,
    totalSimulated: 245
  },
  {
    id: 'theme-2',
    name: 'Community Projects',
    description: 'Local development and community improvement initiatives',
    tags: ['affordable housing', 'community centers', 'local business', 'education'],
    icon: 'Users',
    color: 'blue',
    allocatedAmount: 65,
    totalSimulated: 180
  },
  {
    id: 'theme-3',
    name: 'Climate Resilience',
    description: 'Infrastructure and solutions for climate adaptation',
    tags: ['coastal barriers', 'early warning systems', 'heat adaptation', 'flood protection'],
    icon: 'Shield',
    color: 'green',
    allocatedAmount: 45,
    totalSimulated: 120
  },
  {
    id: 'theme-4',
    name: 'Sustainable Transport',
    description: 'Electric vehicles and sustainable mobility solutions',
    tags: ['electric vehicles', 'public transit', 'bike infrastructure', 'ride sharing'],
    icon: 'Car',
    color: 'emerald',
    allocatedAmount: 35,
    totalSimulated: 95
  }
];

// Mock holdings
const mockHoldings: SimHolding[] = [
  {
    id: 'holding-1',
    symbol: 'SOLAR-A',
    name: 'Solar Energy Growth Fund',
    themeId: 'theme-1',
    risk: 'moderate',
    allocation: 35,
    simPerf: { '1w': 2.3, '1m': 8.7, '1y': 15.2 },
    impactNotes: 'Funds 2.3 solar panel installations',
    price: 24.85,
    shares: 8.5
  },
  {
    id: 'holding-2',
    symbol: 'BATT-B',
    name: 'Battery Storage Solutions',
    themeId: 'theme-1',
    risk: 'high',
    allocation: 25,
    simPerf: { '1w': -1.2, '1m': 12.4, '1y': 28.9 },
    impactNotes: 'Powers 180 homes during peak hours',
    price: 18.92,
    shares: 6.2
  },
  {
    id: 'holding-3',
    symbol: 'COMM-C',
    name: 'Community Development Bond',
    themeId: 'theme-2',
    risk: 'low',
    allocation: 20,
    simPerf: { '1w': 0.5, '1m': 2.1, '1y': 5.8 },
    impactNotes: 'Supports 3 affordable housing units',
    price: 102.15,
    shares: 1.8
  },
  {
    id: 'holding-4',
    symbol: 'WATER-D',
    name: 'Clean Water Access Fund',
    themeId: 'theme-3',
    risk: 'moderate',
    allocation: 15,
    simPerf: { '1w': 1.8, '1m': 4.2, '1y': 11.3 },
    impactNotes: 'Provides clean water for 45 people',
    price: 31.67,
    shares: 2.4
  },
  {
    id: 'holding-5',
    symbol: 'TRANS-E',
    name: 'Electric Vehicle Infrastructure',
    themeId: 'theme-4',
    risk: 'moderate',
    allocation: 12,
    simPerf: { '1w': 0.9, '1m': 6.8, '1y': 19.7 },
    impactNotes: 'Enables 120 electric vehicle charges',
    price: 45.33,
    shares: 1.1
  },
  {
    id: 'holding-6',
    symbol: 'GRLIB-F',
    name: 'Green Liberty Bond',
    themeId: 'theme-2',
    risk: 'low',
    allocation: 8,
    simPerf: { '1w': 0.2, '1m': 1.8, '1y': 4.5 },
    impactNotes: 'Funds community education programs',
    price: 98.45,
    shares: 0.7
  },
  {
    id: 'holding-7',
    symbol: 'COAST-G',
    name: 'Coastal Protection Fund',
    themeId: 'theme-3',
    risk: 'moderate',
    allocation: 10,
    simPerf: { '1w': 1.1, '1m': 3.9, '1y': 9.2 },
    impactNotes: 'Protects 0.5 miles of coastline',
    price: 28.91,
    shares: 1.9
  },
  {
    id: 'holding-8',
    symbol: 'BIKE-H',
    name: 'Sustainable Mobility Solutions',
    themeId: 'theme-4',
    risk: 'high',
    allocation: 7,
    simPerf: { '1w': 3.2, '1m': 9.1, '1y': 22.4 },
    impactNotes: 'Supports bike-share programs in 2 cities',
    price: 16.78,
    shares: 3.1
  }
];

// Mock transactions (past week)
const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    date: '2024-12-08T10:30:00Z',
    merchant: 'WHOLE FOODS MARKET',
    category: 'needs',
    amount: 45.67,
    notes: 'Weekly groceries',
    isSubscription: false
  },
  {
    id: 'txn-2',
    date: '2024-12-08T14:15:00Z',
    merchant: 'SPOTIFY PREMIUM',
    category: 'wants',
    amount: 9.99,
    notes: 'Monthly subscription',
    isSubscription: true,
    isRecurring: true,
    recurringFrequency: 'monthly'
  },
  {
    id: 'txn-3',
    date: '2024-12-07T18:45:00Z',
    merchant: 'UBER EATS',
    category: 'wants',
    amount: 18.50,
    notes: 'Dinner delivery',
    isSubscription: false
  },
  {
    id: 'txn-4',
    date: '2024-12-07T09:20:00Z',
    merchant: 'METRO TRANSIT',
    category: 'needs',
    amount: 12.00,
    notes: 'Weekly bus pass',
    isSubscription: false
  },
  {
    id: 'txn-5',
    date: '2024-12-06T16:30:00Z',
    merchant: 'AMAZON PRIME',
    category: 'wants',
    amount: 14.99,
    notes: 'Monthly subscription',
    isSubscription: true,
    isRecurring: true,
    recurringFrequency: 'monthly'
  },
  {
    id: 'txn-6',
    date: '2024-12-06T11:45:00Z',
    merchant: 'STARBUCKS',
    category: 'wants',
    amount: 5.75,
    notes: 'Coffee and pastry',
    isSubscription: false
  },
  {
    id: 'txn-7',
    date: '2024-12-05T15:20:00Z',
    merchant: 'TARGET',
    category: 'needs',
    amount: 32.89,
    notes: 'School supplies',
    isSubscription: false
  },
  {
    id: 'txn-8',
    date: '2024-12-05T19:10:00Z',
    merchant: 'NETFLIX',
    category: 'wants',
    amount: 15.49,
    notes: 'Monthly subscription',
    isSubscription: true,
    isRecurring: true,
    recurringFrequency: 'monthly'
  },
  {
    id: 'txn-9',
    date: '2024-12-04T13:25:00Z',
    merchant: 'CHIPOTLE',
    category: 'wants',
    amount: 12.45,
    notes: 'Lunch',
    isSubscription: false
  },
  {
    id: 'txn-10',
    date: '2024-12-04T08:15:00Z',
    merchant: 'WALGREENS',
    category: 'needs',
    amount: 8.99,
    notes: 'Personal care items',
    isSubscription: false
  },
  {
    id: 'txn-11',
    date: '2024-12-03T17:40:00Z',
    merchant: 'STEAM GAMES',
    category: 'wants',
    amount: 29.99,
    notes: 'Video game purchase',
    isSubscription: false
  },
  {
    id: 'txn-12',
    date: '2024-12-02T12:30:00Z',
    merchant: 'SAFEWAY',
    category: 'needs',
    amount: 28.76,
    notes: 'Groceries',
    isSubscription: false
  }
];

// Mock redirect events
const mockRedirectEvents: RedirectEvent[] = [
  {
    id: 'redirect-1',
    date: '2024-12-08T23:59:00Z',
    amount: 3.50,
    themeId: 'theme-1',
    note: 'Spare change from daily purchases',
    source: 'spare-change'
  },
  {
    id: 'redirect-2',
    date: '2024-12-07T23:59:00Z',
    amount: 2.25,
    themeId: 'theme-2',
    note: 'Spare change redirect',
    source: 'spare-change'
  },
  {
    id: 'redirect-3',
    date: '2024-12-06T15:00:00Z',
    amount: 10.00,
    themeId: 'theme-1',
    note: 'Manual contribution to solar energy',
    source: 'manual'
  },
  {
    id: 'redirect-4',
    date: '2024-12-05T23:59:00Z',
    amount: 4.75,
    themeId: 'theme-3',
    note: 'Spare change for climate resilience',
    source: 'spare-change'
  }
];

// Mock rules
const mockRules: Rule[] = [
  {
    id: 'rule-1',
    ifContains: 'UBER',
    setCategory: 'wants',
    isActive: true,
    createdAt: '2024-11-15T00:00:00Z'
  },
  {
    id: 'rule-2',
    ifContains: 'WHOLE FOODS',
    setCategory: 'needs',
    isActive: true,
    createdAt: '2024-11-20T00:00:00Z'
  },
  {
    id: 'rule-3',
    ifContains: 'SPOTIFY',
    setCategory: 'wants',
    isActive: true,
    createdAt: '2024-11-25T00:00:00Z'
  },
  {
    id: 'rule-4',
    ifContains: 'TRANSIT',
    setCategory: 'needs',
    isActive: true,
    createdAt: '2024-12-01T00:00:00Z'
  }
];

// Mock learn bites
const mockLearnBites: LearnBite[] = [
  {
    id: 'bite-1',
    title: 'Budgeting Basics: 50/30/20 Rule',
    description: 'Learn the fundamental rule for splitting your income',
    durationMin: 3,
    completed: true,
    category: 'budgeting',
    difficulty: 'beginner',
    completedAt: '2024-12-01T00:00:00Z',
    quiz: [
      {
        question: 'What percentage should go to needs in the 50/30/20 rule?',
        options: ['30%', '50%', '20%', '40%'],
        correctAnswer: 1
      }
    ],
    badge: 'Budget Master'
  },
  {
    id: 'bite-2',
    title: 'What are Green Bonds?',
    description: 'Understanding environmentally focused investment bonds',
    durationMin: 2,
    completed: true,
    category: 'investing',
    difficulty: 'beginner',
    completedAt: '2024-12-03T00:00:00Z',
    quiz: [
      {
        question: 'Green bonds primarily fund what type of projects?',
        options: ['Any project', 'Environmental projects', 'Tech startups', 'Real estate'],
        correctAnswer: 1
      }
    ],
    badge: 'Green Investor'
  },
  {
    id: 'bite-3',
    title: 'Blended Finance Explained',
    description: 'How public and private funding work together for impact',
    durationMin: 4,
    completed: false,
    category: 'impact',
    difficulty: 'intermediate',
    quiz: [
      {
        question: 'Blended finance combines which types of funding?',
        options: ['Public and private', 'Debt and equity', 'Local and foreign', 'Short and long term'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'bite-4',
    title: 'Avoiding Greenwash',
    description: 'How to spot genuine vs. misleading environmental claims',
    durationMin: 3,
    completed: false,
    category: 'impact',
    difficulty: 'intermediate',
    quiz: [
      {
        question: 'What is the best way to verify environmental claims?',
        options: ['Trust the marketing', 'Look for transparency', 'Check the price', 'Ask friends'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'bite-5',
    title: 'Simulation vs. Real Advice',
    description: 'Understanding the difference between practice and real investment',
    durationMin: 2,
    completed: false,
    category: 'general',
    difficulty: 'beginner',
    quiz: [
      {
        question: 'Our app provides what type of investment guidance?',
        options: ['Real financial advice', 'Simulation for learning', 'Guaranteed returns', 'Tax advice'],
        correctAnswer: 1
      }
    ]
  }
];

// Mock achievements
const mockAchievements: Achievement[] = [
  {
    id: 'achievement-1',
    name: 'Budget Master',
    description: 'Completed budgeting basics course',
    icon: 'Target',
    unlockedAt: '2024-12-01T00:00:00Z',
    progress: 1,
    maxProgress: 1
  },
  {
    id: 'achievement-2',
    name: 'Green Investor',
    description: 'Completed green bonds course',
    icon: 'Leaf',
    unlockedAt: '2024-12-03T00:00:00Z',
    progress: 1,
    maxProgress: 1
  },
  {
    id: 'achievement-3',
    name: 'Week Warrior',
    description: 'Complete 7 days of learning',
    icon: 'Trophy',
    progress: 2,
    maxProgress: 7
  },
  {
    id: 'achievement-4',
    name: 'Impact Pioneer',
    description: 'Simulate $100 in impact investments',
    icon: 'Star',
    progress: 45,
    maxProgress: 100
  }
];

// Complete mock data
export const mockData: AppData = {
  user: mockUser,
  budgets: mockBudgets,
  transactions: mockTransactions,
  rules: mockRules,
  themes: mockThemes,
  holdings: mockHoldings,
  redirectEvents: mockRedirectEvents,
  learnBites: mockLearnBites,
  achievements: mockAchievements
};