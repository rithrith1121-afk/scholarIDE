import { Settings } from 'lucide-react';

interface TopbarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  hasActiveProblem: boolean;
  onSubmit?: () => void;
}

export default function Topbar({ currentView, onViewChange, hasActiveProblem, onSubmit }: TopbarProps) {
  return (
    <header className="flex justify-between items-center w-full px-6 md:px-10 h-16 bg-surface/70 backdrop-blur-xl sticky top-0 z-50 shadow-[0_1px_0_0_rgba(255,255,255,0.05),0_24px_48px_rgba(6,14,32,0.4)]">
      <div className="flex items-center gap-10 md:gap-16 h-full">
        <div className="text-2xl tracking-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container font-label">
          ScholarIDE
        </div>
        <nav className="hidden md:flex items-center gap-8 h-full">
          <button
            onClick={() => onViewChange('generate')}
            className={`font-label h-full flex items-center px-2 transition-all duration-300 hover:bg-white/5 ${
              currentView === 'generate'
                ? 'text-primary border-b-2 border-primary-container'
                : 'text-slate-400 hover:text-secondary'
            }`}
          >
            New Challenge
          </button>
          
          {hasActiveProblem && (
            <button
              onClick={() => onViewChange('problem')}
              className={`font-label h-full flex items-center px-2 transition-all duration-300 hover:bg-white/5 ${
                currentView === 'problem'
                  ? 'text-primary border-b-2 border-primary-container'
                  : 'text-slate-400 hover:text-secondary'
              }`}
            >
              Current Problem
            </button>
          )}

          <button
            onClick={() => onViewChange('history')}
            className={`font-label h-full flex items-center px-2 transition-all duration-300 hover:bg-white/5 ${
              currentView === 'history'
                ? 'text-primary border-b-2 border-primary-container'
                : 'text-slate-400 hover:text-secondary'
            }`}
          >
            History
          </button>
          <button
            onClick={() => onViewChange('notes')}
            className={`font-label h-full flex items-center px-2 transition-all duration-300 hover:bg-white/5 ${
              currentView === 'notes'
                ? 'text-primary border-b-2 border-primary-container'
                : 'text-slate-400 hover:text-secondary'
            }`}
          >
            Notes
          </button>
          
          <button
            onClick={() => onViewChange('help')}
            className={`font-label h-full flex items-center px-2 transition-all duration-300 hover:bg-white/5 ${
              currentView === 'help'
                ? 'text-primary border-b-2 border-primary-container'
                : 'text-slate-400 hover:text-secondary'
            }`}
          >
            Help
          </button>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 mr-4 text-slate-400">
          <button className="p-2 hover:text-secondary transition-all duration-300 hover:bg-white/5 rounded-md active:scale-95 flex items-center justify-center">
            <Settings size={20} />
          </button>
        </div>
        {hasActiveProblem && (
          <>
            <button className="px-4 py-1.5 text-sm font-label rounded-md bg-secondary text-on-secondary hover:bg-secondary-fixed transition-colors active:scale-95 duration-150 shadow-sm">
              Run
            </button>
            <button onClick={onSubmit} className="px-4 py-1.5 text-sm font-label rounded-md bg-gradient-to-br from-primary to-primary-container text-on-primary-container hover:brightness-110 transition-all active:scale-95 duration-150 shadow-md">
              Submit
            </button>
          </>
        )}
      </div>
    </header>
  );
}
