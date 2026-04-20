import {
  FileText,
  History,
  ListTodo,
  PenLine,
  HelpCircle,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
}

export default function Sidebar({ currentView }: SidebarProps) {
  return (
    <nav className="hidden md:flex flex-col items-center py-8 gap-y-6 flex-shrink-0 z-40 fixed left-0 h-full w-20 bg-surface text-primary border-r border-outline-variant/15">
      <div className="hidden text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container font-label">
        SA
      </div>
      <div className="flex flex-col gap-y-6 mt-8 w-full">
        <a
          href="#"
          title="Problem"
          className={`flex flex-col items-center justify-center p-3 transition-all ease-in-out duration-200 group w-full ${
            currentView === 'problem'
              ? 'text-secondary border-l-4 border-secondary bg-secondary/10'
              : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
          }`}
        >
          <FileText
            size={24}
            className={`mb-1 transition-transform ${
              currentView !== 'problem' && 'group-hover:scale-110'
            }`}
          />
          <span className="font-label text-[10px] font-bold uppercase tracking-widest text-center mt-1">
            Problem
          </span>
        </a>
        <a
          href="#"
          title="Submissions"
          className="flex flex-col items-center justify-center p-3 text-slate-500 hover:bg-white/5 hover:text-slate-200 transition-all ease-in-out duration-200 group w-full"
        >
          <History size={24} className="mb-1 group-hover:scale-110 transition-transform" />
          <span className="font-label text-[10px] font-bold uppercase tracking-widest text-center mt-1">
            History
          </span>
        </a>
        <a
          href="#"
          title="Test Cases"
          className="flex flex-col items-center justify-center p-3 text-slate-500 hover:bg-white/5 hover:text-slate-200 transition-all ease-in-out duration-200 group w-full"
        >
          <ListTodo size={24} className="mb-1 group-hover:scale-110 transition-transform" />
          <span className="font-label text-[10px] font-bold uppercase tracking-widest text-center mt-1">
            Tests
          </span>
        </a>
        <a
          href="#"
          title="Notes"
          className="flex flex-col items-center justify-center p-3 text-slate-500 hover:bg-white/5 hover:text-slate-200 transition-all ease-in-out duration-200 group w-full"
        >
          <PenLine size={24} className="mb-1 group-hover:scale-110 transition-transform" />
          <span className="font-label text-[10px] font-bold uppercase tracking-widest text-center mt-1">
            Notes
          </span>
        </a>
      </div>
      <div className="mt-auto mb-4 flex flex-col items-center gap-4">
        <button
          className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/15 flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors"
          title="Help"
        >
          <HelpCircle size={20} />
        </button>
        <img
          alt="User Avatar"
          className="w-10 h-10 rounded-full border border-outline-variant/15 object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuACasrSG_Za1k3unKnxX7v4Cjmx6q4cjm3rgCYjDsAfHwY-N_eIREANGK09uogBwQDzrTO6QugTpwG0xnLi7MTbNaAv2sTvtseaQoU7rlZKwRu9G6lmobzjC53IQyfkyHkHuONvZKmf3ZaHn6YKIFGOlN2EvBQBErH1Yb4cjY7OUlxbsrMx67wRoQZi7yMFm-Bl686dtsz2v2hcH-jIT7Ni0aIDP9QsXqhQPV4zSGrFrPeiaDh-ZWeCJ1d-ZrzUHJGvJIEMKYP01TI"
        />
      </div>
    </nav>
  );
}
