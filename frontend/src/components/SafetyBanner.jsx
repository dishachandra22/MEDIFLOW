import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export const SafetyBanner = ({ compact = false }) => {
  return (
    <div className={`w-full bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200/80 dark:border-amber-800/50 ${compact ? 'py-1.5 px-3 text-xs' : 'py-2 px-4 text-xs sm:text-sm'} transition-colors duration-150`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-amber-900 dark:text-amber-200 font-medium">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            <strong>AI Safety Notice:</strong> I provide hospital information and administrative assistance. I do <strong>not</strong> diagnose medical conditions or replace a healthcare professional.
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1 text-xs text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/50 px-2 py-0.5 rounded-full">
          <Info className="w-3 h-3" />
          <span>For emergencies, call +91 1800-999-0000</span>
        </div>
      </div>
    </div>
  );
};

export default SafetyBanner;
