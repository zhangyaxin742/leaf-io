import { useState, useEffect } from 'react';
import { AppData, Transaction, Budget, RedirectEvent, LearnBite, Rule } from '@/types/data';
import { mockData } from '@/data/mockData';

const STORAGE_KEY = 'leaf-app-data';

export const useAppData = () => {
  const [data, setData] = useState<AppData>(() => {
    // Try to load from localStorage first
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored data:', error);
      }
    }
    return mockData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn-${Date.now()}`
    };
    
    setData(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions]
    }));
    
    return newTransaction;
  };

  const updateBudget = (month: string, updates: Partial<Budget>) => {
    setData(prev => ({
      ...prev,
      budgets: prev.budgets.map(budget => 
        budget.month === month 
          ? { ...budget, ...updates }
          : budget
      )
    }));
  };

  const addRedirectEvent = (event: Omit<RedirectEvent, 'id'>) => {
    const newEvent: RedirectEvent = {
      ...event,
      id: `redirect-${Date.now()}`
    };
    
    setData(prev => ({
      ...prev,
      redirectEvents: [newEvent, ...prev.redirectEvents]
    }));
    
    return newEvent;
  };

  const completeLearnBite = (biteId: string) => {
    setData(prev => ({
      ...prev,
      learnBites: prev.learnBites.map(bite =>
        bite.id === biteId
          ? { ...bite, completed: true, completedAt: new Date().toISOString() }
          : bite
      )
    }));
  };

  const addRule = (rule: Omit<Rule, 'id'>) => {
    const newRule: Rule = {
      ...rule,
      id: `rule-${Date.now()}`
    };
    
    setData(prev => ({
      ...prev,
      rules: [newRule, ...prev.rules]
    }));
    
    return newRule;
  };

  const toggleRule = (ruleId: string) => {
    setData(prev => ({
      ...prev,
      rules: prev.rules.map(rule =>
        rule.id === ruleId
          ? { ...rule, isActive: !rule.isActive }
          : rule
      )
    }));
  };

  const deleteRule = (ruleId: string) => {
    setData(prev => ({
      ...prev,
      rules: prev.rules.filter(rule => rule.id !== ruleId)
    }));
  };

  const resetData = () => {
    setData(mockData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'leaf-app-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Computed values
  const currentBudget = data.budgets.find(b => b.month === '2024-12') || data.budgets[0];
  const recentTransactions = data.transactions.slice(0, 10);
  const activeRules = data.rules.filter(r => r.isActive);
  const completedBites = data.learnBites.filter(b => b.completed);
  const currentStreak = calculateLearningStreak(data.learnBites);
  const totalSimulated = data.themes.reduce((sum, theme) => sum + theme.totalSimulated, 0);

  return {
    data,
    currentBudget,
    recentTransactions,
    activeRules,
    completedBites,
    currentStreak,
    totalSimulated,
    addTransaction,
    updateBudget,
    addRedirectEvent,
    completeLearnBite,
    addRule,
    toggleRule,
    deleteRule,
    resetData,
    exportData
  };
};

// Helper function to calculate learning streak
function calculateLearningStreak(learnBites: LearnBite[]): number {
  const completedBites = learnBites
    .filter(bite => bite.completed && bite.completedAt)
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime());

  if (completedBites.length === 0) return 0;

  let streak = 1;
  let currentDate = new Date(completedBites[0].completedAt!);
  
  for (let i = 1; i < completedBites.length; i++) {
    const biteDate = new Date(completedBites[i].completedAt!);
    const daysDiff = Math.floor((currentDate.getTime() - biteDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      streak++;
      currentDate = biteDate;
    } else {
      break;
    }
  }
  
  return streak;
}