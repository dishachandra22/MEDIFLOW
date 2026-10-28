import React from 'react';
import { ShieldAlert, PhoneCall } from 'lucide-react';

export const SafetyBanner = ({ compact = false }) => {
  return (
    <div className={`w-full bg-amber-500/10 dark:bg-obsidian-900/90 border-b border-amber-500/20 dark:border-obsidian-700 ${compact ? 'py-1.5 px-3 text-xs' : 'py-2 px-4 text-xs sm:text-sm'} transition-colors duration-150`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-amber-900 dark:text-amber-200/90 font-medium">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            <strong className="text-amber-600 dark:text-mint-neon">AI Safety Guardrail:</strong> MediFlow AI provides administrative support only. It does <strong className="underline decoration-amber-400">not</strong> provide medical diagnoses, prescriptions, or clinical judgment.
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-xs text-amber-800 dark:text-mint-neon bg-amber-500/15 dark:bg-obsidian-850 px-3 py-1 rounded-full border border-amber-500/20 dark:border-obsidian-700 shrink-0">
          <PhoneCall className="w-3 h-3 text-mint-neon" />
          <span>Emergency 24/7: <strong className="font-bold text-white">+91 1800-999-0000</strong> (Casualty Ground Floor)</span>
        </div>
      </div>
    </div>
  );
};

export default SafetyBanner;
