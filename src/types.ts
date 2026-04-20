export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface CodeSnippets {
  python: string;
  java: string;
  cpp: string;
}

export interface Problem {
  title: string;
  difficulty: 'Easy' | 'Intermediate' | 'Hard';
  tags: string[];
  descriptionHtml: string;
  examples: Example[];
  constraints: string[];
  snippets: CodeSnippets;
  starterCode: CodeSnippets;
}

export interface HistoryItem {
  id: string;
  problem: Problem;
  status: 'Passed' | 'Failed';
  timestamp: number;
}

export interface Settings {
  theme: 'dark' | 'light';
  language: 'python' | 'java' | 'cpp';
  fontSize: number;
  autosave: boolean;
}

export const defaultSettings: Settings = {
  theme: 'dark',
  language: 'python',
  fontSize: 14,
  autosave: true,
};

export interface UserStats {
  name: string;
  completed: number;
  streak: number;
  lastSolvedDate: string | null;
}

export const defaultUserStats: UserStats = {
  name: '',
  completed: 0,
  streak: 0,
  lastSolvedDate: null,
};

