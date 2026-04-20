import { ChevronDown, AlignLeft, RotateCcw, Info, ChevronUp, X } from 'lucide-react';
import { Problem } from '../types';
import { useState } from 'react';

interface ProblemViewProps {
  problem: Problem;
  onGenerateNotes: (problem: Problem) => void;
  onExplainSolution: (problem: Problem, code: string) => void;
}

export default function ProblemView({ problem, onGenerateNotes, onExplainSolution }: ProblemViewProps) {
  const [lang, setLang] = useState<'python' | 'java' | 'cpp'>('python');

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Left Panel: Problem Description */}
      <section className="w-2/5 bg-surface-container-low flex flex-col overflow-y-auto scrollbar-hide p-8 relative">
        <div className="max-w-2xl mx-auto w-full">
          <h1 className="font-headline text-3xl font-bold text-on-surface mb-4">{problem.title}</h1>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className={`px-2 py-1 rounded text-xs font-label uppercase tracking-wider ${
              problem.difficulty === 'Easy' ? 'bg-secondary-container/20 text-secondary-container' :
              problem.difficulty === 'Intermediate' ? 'bg-primary-container/20 text-primary' :
              'bg-error-container/20 text-error'
            }`}>
              {problem.difficulty}
            </span>
            {problem.tags.map(tag => (
              <span key={tag} className="bg-surface-container-high text-on-surface-variant px-2 py-1 rounded text-xs font-label border border-outline-variant/15">
                {tag}
              </span>
            ))}
          </div>

          <div 
            className="font-body text-on-surface-variant leading-relaxed space-y-4 mb-8 text-sm article-content"
            dangerouslySetInnerHTML={{ __html: problem.descriptionHtml }}
          />

          {problem.examples.map((example, index) => (
            <div key={index}>
              <h3 className="font-headline text-lg font-semibold text-on-surface mb-3">Example {index + 1}:</h3>
              <div className="bg-surface-container-highest p-4 rounded-lg mb-6 shadow-sm border border-outline-variant/15">
                <p className="font-label text-sm text-on-surface-variant mb-1 whitespace-pre-wrap">
                  <span className="text-on-surface">Input:</span> {example.input}
                </p>
                <p className="font-label text-sm text-on-surface-variant mb-1 whitespace-pre-wrap">
                  <span className="text-on-surface">Output:</span> {example.output}
                </p>
                {example.explanation && (
                  <p className="font-label text-sm text-outline mt-2 pt-2 border-t border-outline-variant/15">
                    <span className="text-on-surface">Explanation:</span> {example.explanation}
                  </p>
                )}
              </div>
            </div>
          ))}

          <h3 className="font-headline text-lg font-semibold text-on-surface mb-3">Constraints:</h3>
          <ul className="list-disc list-inside font-label text-sm text-on-surface-variant space-y-2 mb-8 ml-2">
            {problem.constraints.map((constraint, i) => (
              <li key={i}>
                <code className="text-primary-fixed-dim bg-surface-container-highest px-1.5 py-0.5 rounded border border-outline-variant/15">
                  {constraint}
                </code>
              </li>
            ))}
          </ul>

          <h3 className="font-headline text-lg font-semibold text-on-surface mb-3">Example Snippets:</h3>
          <ul className="list-disc list-inside font-label text-sm text-on-surface-variant space-y-2 mb-8 ml-2">
            <li>
              <span className="text-on-surface mr-2 w-16 inline-block">Python:</span>
              <code className="text-primary-fixed-dim bg-surface-container-highest px-1.5 py-0.5 rounded border border-outline-variant/15">
                {problem.snippets.python}
              </code>
            </li>
            <li>
              <span className="text-on-surface mr-2 w-16 inline-block">Java:</span>
              <code className="text-primary-fixed-dim bg-surface-container-highest px-1.5 py-0.5 rounded border border-outline-variant/15">
                {problem.snippets.java}
              </code>
            </li>
            <li>
              <span className="text-on-surface mr-2 w-16 inline-block">C++:</span>
              <code className="text-primary-fixed-dim bg-surface-container-highest px-1.5 py-0.5 rounded border border-outline-variant/15">
                {problem.snippets.cpp}
              </code>
            </li>
          </ul>

          <div className="flex gap-4 mt-12 mb-8 border-t border-outline-variant/20 pt-8">
            <button
              onClick={() => onGenerateNotes(problem)}
              className="flex-1 px-4 py-2 bg-surface-container border border-outline-variant/30 rounded-lg text-primary hover:bg-primary-container/20 transition-colors font-label shadow-sm active:scale-95"
            >
              Generate Notes
            </button>
            <button
              onClick={() => onExplainSolution(problem, problem.starterCode[lang])}
              className="flex-1 px-4 py-2 bg-surface-container border border-outline-variant/30 rounded-lg text-secondary hover:bg-secondary-container/20 transition-colors font-label shadow-sm active:scale-95"
            >
              Explain Solution
            </button>
          </div>
        </div>
      </section>

      {/* Right Panel: Editor & Output */}
      <section className="w-3/5 flex flex-col bg-surface relative">
        {/* Editor Header */}
        <div className="h-12 bg-surface-container-low flex items-center justify-between px-4 border-b border-outline-variant/15">
          <div className="flex items-center gap-2 relative">
            <select 
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              className="bg-surface-container-highest border-none text-on-surface font-label text-sm rounded focus:ring-1 focus:ring-primary-container py-1 pl-2 pr-6 appearance-none cursor-pointer outline-none"
            >
              <option value="python">Python 3</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
            <ChevronDown size={14} className="text-on-surface-variant absolute right-2 pointer-events-none" />
          </div>
          <div className="flex items-center gap-3 text-on-surface-variant">
            <button className="hover:text-on-surface transition-colors" title="Format Document">
              <AlignLeft size={16} />
            </button>
            <button className="hover:text-on-surface transition-colors" title="Reset Code">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="flex-1 overflow-hidden flex bg-[#0d1117]">
          {/* Simulated Line Numbers */}
          <div className="w-12 text-outline font-label text-xs flex flex-col items-end pr-2 pt-4 select-none opacity-50 border-r border-outline-variant/15">
            {problem.starterCode[lang].split('\n').map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          {/* Code */}
          <div className="flex-1 pt-4 pl-4 font-mono text-sm overflow-auto text-[#c9d1d9] leading-relaxed">
            <pre>
              <code>
                {problem.starterCode[lang]}
              </code>
            </pre>
          </div>
        </div>

        {/* Bottom Panel (Terminal/Output) */}
        <div className="h-64 bg-surface-container-low flex flex-col shadow-[0_-24px_48px_rgba(6,14,32,0.4)] z-10">
          <div className="flex items-center px-4 bg-surface-container-high h-10 gap-6 border-b border-outline-variant/15">
            <button className="text-primary border-b-2 border-primary-container h-full px-2 font-label text-sm font-medium">
              Test Results
            </button>
            <button className="text-on-surface-variant hover:text-on-surface h-full px-2 font-label text-sm transition-colors">
              Output
            </button>
            <button className="text-on-surface-variant hover:text-on-surface h-full px-2 font-label text-sm transition-colors">
              Errors
            </button>
            <div className="ml-auto flex items-center gap-2 text-on-surface-variant">
              <button className="hover:text-on-surface">
                <ChevronUp size={16} />
              </button>
              <button className="hover:text-on-surface">
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-label text-sm text-on-surface-variant bg-surface-container-lowest">
            <div className="flex items-center gap-2 text-outline mb-4">
              <Info size={16} />
              <span>Run your code to see test results here.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
