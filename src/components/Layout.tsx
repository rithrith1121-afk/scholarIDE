import Topbar from './Topbar';

interface LayoutProps {
  currentView: string;
  onViewChange: (view: string) => void;
  hasActiveProblem: boolean;
  onSubmit?: () => void;
  children: React.ReactNode;
}

export default function Layout({ currentView, onViewChange, hasActiveProblem, onSubmit, children }: LayoutProps) {
  return (
    <div className="flex w-full h-screen bg-surface text-on-surface overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar currentView={currentView} onViewChange={onViewChange} hasActiveProblem={hasActiveProblem} onSubmit={onSubmit} />
        <main className="flex-1 overflow-auto bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
}
