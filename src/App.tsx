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
    return saved ? JSON.parse(saved) : defaultUserStats;
  });

  const [helpContent, setHelpContent] = useState<string | null>(null);

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
      alert('Failed to generate problem. Please try again.');
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
      alert('Failed to explain solution.');
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
    }

    const newHistoryItem: HistoryItem = {
      id: crypto.randomUUID(),
      problem: problemData,
      status: isMockPassed ? 'Passed' : 'Failed',
      timestamp: Date.now(),
    };
    
    setHistory(prev => [newHistoryItem, ...prev]);
    alert(`Challenge Submitted! Status: ${isMockPassed ? 'Passed' : 'Failed'}`);
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
    }
  };
  
  const handleResetStats = () => {
    if (window.confirm('Are you sure you want to reset your stats?')) {
      setUserStats(prev => ({
        ...prev,
        completed: 0,
        streak: 0,
        lastSolvedDate: null
      }));
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to completely reset all data and settings?')) {
      setHistory([]);
      localStorage.removeItem('notes'); // Clean up any leftover notes
      setSettings(defaultSettings);
      setUserStats(defaultUserStats);
      setProblemData(null);
      setCurrentView('generate');
    }
  };

  const hasActiveProblem = problemData !== null;

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
        />
      ) : (
        <DifficultySelectionView onSelect={handleDifficultySelect} userStats={userStats} />
      )}
    </Layout>
  );
}


