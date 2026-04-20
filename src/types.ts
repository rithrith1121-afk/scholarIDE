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

export interface Note {
  id: string;
  problemTitle: string;
  contentHtml: string;
  createdAt: number;
}

export interface HistoryItem {
  id: string;
  problem: Problem;
  status: 'Passed' | 'Failed';
  timestamp: number;
}

