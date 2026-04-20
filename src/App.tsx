/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ProblemView from './views/ProblemView';
import DifficultySelectionView from './views/DifficultySelectionView';
import NotesView from './views/NotesView';
import HistoryView from './views/HistoryView';
import HelpView from './views/HelpView';
import { generateProblem, generateNotes, generateHelp } from './services/geminiService';
import { Problem, Note, HistoryItem } from './types';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('generate');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Generating your challenge...');
  const [problemData, setProblemData] = useState<Problem | null>(null);

  // Persistence State
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('history');
    return saved ? JSON.parse(saved) : [];
  });

  const [helpContent, setHelpContent] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

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

  const handleGenerateNotes = async (problem: Problem) => {
    try {
      setLoadingMessage('Synthesizing learning notes...');
      setLoading(true);
      const contentHtml = await generateNotes(problem);
      
      const newNote: Note = {
        id: crypto.randomUUID(),
        problemTitle: problem.title,
        contentHtml,
        createdAt: Date.now()
      };
      
      setNotes(prev => [newNote, ...prev]);
      setCurrentView('notes');
    } catch (error) {
      console.error('Error generating notes:', error);
      alert('Failed to generate notes.');
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

  const handleSubmit = () => {
    if (!problemData) return;
    
    // In a real app we'd validate tests. Here we mock a basic "Passed"
    const isSuccess = Math.random() > 0.1 ? 'Passed' : 'Failed'; 
    const isMockPassed = isSuccess === 'Passed';
    
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

  const hasActiveProblem = problemData !== null;

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView} hasActiveProblem={hasActiveProblem} onSubmit={handleSubmit}>
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center h-full w-full bg-surface">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <h2 className="text-xl font-headline text-on-surface mb-2">{loadingMessage}</h2>
          <p className="text-on-surface-variant font-body">Asking the AI for insights...</p>
        </div>
      ) : currentView === 'problem' && problemData ? (
        <ProblemView 
          problem={problemData} 
          onGenerateNotes={handleGenerateNotes} 
          onExplainSolution={handleExplainSolution} 
        />
      ) : currentView === 'notes' ? (
        <NotesView notes={notes} />
      ) : currentView === 'history' ? (
        <HistoryView history={history} onSelectProblem={handleSelectHistoryProblem} />
      ) : currentView === 'help' ? (
        <HelpView helpContent={helpContent} />
      ) : (
        <DifficultySelectionView onSelect={handleDifficultySelect} />
      )}
    </Layout>
  );
}


