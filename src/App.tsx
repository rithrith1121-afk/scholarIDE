/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ProblemView from './views/ProblemView';
import DifficultySelectionView from './views/DifficultySelectionView';
import HistoryView from './views/HistoryView';
import HelpView from './views/HelpView';
import SettingsView from './views/SettingsView';
import OnboardingView from './views/OnboardingView';
import { ToastContainer, ToastType } from './components/Toast';
import { generateProblem, generateHelp } from './services/geminiService';
import { Problem, HistoryItem, Settings, defaultSettings, UserStats, defaultUserStats } from './types';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('generate');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Generating your challenge...');
  const [problemData, setProblemData] = useState<Problem | null>(null);

  // Persistence State
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('history');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('userStats');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration to enforce onboarding if flag doesn't exist
      if (parsed.hasCompletedOnboarding === undefined) {
         return { ...defaultUserStats, ...parsed, hasCompletedOnboarding: parsed.name ? true : false };
      }
      return parsed;
    }
    return defaultUserStats;
  });

  const [helpContent, setHelpContent] = useState<string | null>(null);
  const [toasts, setToasts] = useState<{ id: string; message: string; type: ToastType }[]>([]);

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
    // Apply theme globally
    if (settings.theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [settings]);

  // Make sure default dark mode is applied on mount if set
  useEffect(() => {
    if (settings.theme === 'dark' && !document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else if (settings.theme === 'light' && !document.documentElement.classList.contains('light')) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleDifficultySelect = async (difficulty: 'Easy' | 'Intermediate' | 'Hard') => {
    console.log(`Selected difficulty: ${difficulty}`);
    try {
      setLoadingMessage('Configuring a unique challenge...');
      setLoading(true);
      const newProblem = await generateProblem(difficulty);
      setProblemData(newProblem);
      setCurrentView('problem');
    } catch (error) {
      console.error('Error generating problem:', error);
      showToast('Failed to generate problem. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleExplainSolution = async (problem: Problem, code: string) => {
    try {
      setLoadingMessage('Analyzing approach...');
      setLoading(true);
      const contentHtml = await generateHelp(problem, code);
      setHelpContent(contentHtml);
      setCurrentView('help');
    } catch (error) {
      console.error('Error generating help:', error);
      showToast('Failed to explain solution.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getTodayString = () => new Date().toISOString().split('T')[0];

  const handleSubmit = () => {
    if (!problemData) return;
    
    // In a real app we'd validate tests. Here we mock a basic "Passed"
    const isSuccess = Math.random() > 0.1 ? 'Passed' : 'Failed'; 
    const isMockPassed = isSuccess === 'Passed';
    
    if (isMockPassed) {
      setUserStats(prev => {
        const today = getTodayString();
        let newStreak = prev.streak;

        if (prev.lastSolvedDate !== today) {
          if (prev.lastSolvedDate) {
            const lastDate = new Date(prev.lastSolvedDate);
            const todayDate = new Date(today);
            const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
              newStreak += 1;
            } else {
              newStreak = 1;
            }
          } else {
            newStreak = 1;
          }
        }

        return {
          ...prev,
          completed: prev.completed + 1,
          streak: newStreak,
          lastSolvedDate: today,
        };
      });
      showToast('Challenge Passed! Stats updated.', 'success');
    } else {
      showToast('Challenge Failed. Keep trying!', 'error');
    }

    const newHistoryItem: HistoryItem = {
      id: crypto.randomUUID(),
      problem: problemData,
      status: isMockPassed ? 'Passed' : 'Failed',
      timestamp: Date.now(),
    };
    
    setHistory(prev => [newHistoryItem, ...prev]);
    if (isMockPassed) {
      setCurrentView('history');
    }
  };

  const handleSelectHistoryProblem = (item: HistoryItem) => {
    setProblemData(item.problem);
    setCurrentView('problem');
  };

  // Settings Handlers
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setHistory([]);
      showToast('History cleared', 'success');
    }
  };
  
  const handleResetStats = () => {
    if (window.confirm('Reset your progress and streak?')) {
      setUserStats(prev => ({
        ...prev,
        completed: 0,
        streak: 0,
        lastSolvedDate: null
      }));
      showToast('Stats reset', 'success');
    }
  };

  const handleResetAll = () => {
    if (window.confirm('This will reset all your data. Continue?')) {
      // Clear persistence
      localStorage.removeItem('history');
      localStorage.removeItem('userStats');
      localStorage.removeItem('notes');
      
      // Reset React state
      setHistory([]);
      setSettings(defaultSettings);
      setUserStats(defaultUserStats);
      setProblemData(null);
      setCurrentView('generate');
      showToast('All data reset', 'success');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Reset Identity & History for a complete session reset
      localStorage.removeItem('userStats');
      localStorage.removeItem('history');
      
      setHistory([]);
      setUserStats(defaultUserStats);
      setProblemData(null);
      setCurrentView('generate');
      showToast('Logged out successfully', 'success');
    }
  };

  const hasActiveProblem = problemData !== null;

  // Root Logic: If no user identity, force onboarding/auth flow
  if (!userStats || !userStats.name) {
    return (
      <>
        <OnboardingView 
          onComplete={(name, dob) => 
            setUserStats(prev => ({ ...prev, name, dateOfBirth: dob, hasCompletedOnboarding: true }))
          } 
        />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </>
    );
  }

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView} hasActiveProblem={hasActiveProblem} userStats={userStats} onSubmit={handleSubmit}>
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center h-full w-full bg-surface">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <h2 className="text-xl font-headline text-on-surface mb-2">{loadingMessage}</h2>
          <p className="text-on-surface-variant font-body">Asking the AI for insights...</p>
        </div>
      ) : currentView === 'problem' && problemData ? (
        <ProblemView 
          problem={problemData} 
          onExplainSolution={handleExplainSolution}
          settings={settings}
        />
      ) : currentView === 'history' ? (
        <HistoryView history={history} onSelectProblem={handleSelectHistoryProblem} />
      ) : currentView === 'help' ? (
        <HelpView helpContent={helpContent} />
      ) : currentView === 'settings' ? (
        <SettingsView 
          settings={settings} 
          userStats={userStats}
          onSettingsChange={setSettings} 
          onUserStatsChange={setUserStats}
          onClearHistory={handleClearHistory}
          onResetStats={handleResetStats}
          onResetAll={handleResetAll}
          onLogout={handleLogout}
        />
      ) : (
        <DifficultySelectionView onSelect={handleDifficultySelect} userStats={userStats} />
      )}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </Layout>
  );
}


