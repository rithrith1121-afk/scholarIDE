import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface OnboardingViewProps {
  onComplete: (name: string, dob: string) => void;
}

export default function OnboardingView({ onComplete }: OnboardingViewProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && dob) {
      setStep(2);
    }
  };

  const handleStartChallenge = () => {
    onComplete(name.trim(), dob);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-container-high/60 via-surface to-surface p-6">
      {step === 1 ? (
        <div className="max-w-md w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl p-8 shadow-2xl animate-[fade-in-up_0.4s_ease-out_forwards]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl tracking-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container font-label mb-2">
              ScholarIDE
            </div>
            <h1 className="text-2xl font-headline font-bold text-on-surface">
              Authentication
            </h1>
            <p className="text-on-surface-variant font-body mt-2">
              Let's personalize your learning experience.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-headline font-medium text-on-surface mb-2">
                User Name
              </label>
              <input
                id="name"
                type="text"
                required
                maxLength={20}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Scholar"
                className="w-full bg-surface-container border border-outline-variant/20 text-on-surface font-label rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="dob" className="block font-headline font-medium text-on-surface mb-2">
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/20 text-on-surface font-label rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert-[var(--is-dark)]"
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim() || !dob}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-container rounded-lg font-label font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none mt-2 shadow-md"
            >
              Continue <ArrowRight size={18} />
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-xl w-full text-center space-y-6 animate-[fade-in-up_0.4s_ease-out_forwards]">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-2">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
            Welcome to ScholarIDE
          </h1>

          <h2 className="text-xl md:text-2xl tracking-tight font-semibold text-transparent bg-clip-text bg-gradient-to-br from-primary/80 to-primary-container/80 font-label">
            Hi, {name} 👋
          </h2>

          <p className="text-on-surface-variant font-body text-lg italic mt-8">
            "Ready to test your best?"
          </p>

          <div className="pt-6">
            <button
              onClick={handleStartChallenge}
              className="inline-flex items-center justify-center gap-2 py-4 px-8 bg-gradient-to-br from-primary to-primary-container text-on-primary-container rounded-lg font-label font-bold tracking-wide text-lg hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_32px_rgba(55,93,241,0.2)]"
            >
              Start Challenge
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
