import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface LayoutProps {
  currentView: string;
  onViewChange: (view: string) => void;
  children: React.ReactNode;
}

export default function Layout({ currentView, onViewChange, children }: LayoutProps) {
  return (
    <div className="flex w-full h-screen bg-surface text-on-surface overflow-hidden">
      <Sidebar currentView={currentView} />
      <div className="flex-1 flex flex-col md:ml-20 overflow-hidden">
        <Topbar currentView={currentView} onViewChange={onViewChange} />
        <main className="flex-1 overflow-auto bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
}
