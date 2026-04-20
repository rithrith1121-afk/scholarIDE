import { Note } from '../types';
import { BookOpen } from 'lucide-react';

interface NotesViewProps {
  notes: Note[];
}

export default function NotesView({ notes }: NotesViewProps) {
  if (notes.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full p-8 text-center text-on-surface-variant">
        <BookOpen size={48} className="mb-4 opacity-50" />
        <h2 className="text-xl font-headline text-on-surface mb-2">No notes generated yet</h2>
        <p className="font-body">Solve problems and click "Generate Notes" to build your learning repository.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 h-full overflow-y-auto scrollbar-hide">
      <h1 className="text-3xl font-headline font-bold text-on-surface mb-8">Learning Notes</h1>
      <div className="space-y-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-headline font-semibold text-primary mb-2">
              {note.problemTitle}
            </h2>
            <div className="text-xs text-on-surface-variant font-label mb-4 opacity-70">
              {new Date(note.createdAt).toLocaleString()}
            </div>
            <div 
              className="article-content font-body text-sm text-on-surface-variant leading-relaxed"
              dangerouslySetInnerHTML={{ __html: note.contentHtml }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
