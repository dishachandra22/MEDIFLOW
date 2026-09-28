import React from 'react';
import { Bot, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-teal-500 flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">MediFlow AI</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mb-4">
              An intelligent, explainable AI healthcare management platform designed to simplify patient scheduling, administrative routing, floor navigation, and clinical record summarization.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 max-w-md">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Safety Guardrail Enforced: Does not provide medical diagnoses or prescriptions.</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Core AI Features</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/assistant" className="hover:text-brand-600 dark:hover:text-brand-400">AI Assistant Chat</Link></li>
              <li><Link to="/records" className="hover:text-brand-600 dark:hover:text-brand-400">Patient Record Summarization</Link></li>
              <li><Link to="/navigation" className="hover:text-brand-600 dark:hover:text-brand-400">Floor Navigation Finder</Link></li>
              <li><Link to="/faq" className="hover:text-brand-600 dark:hover:text-brand-400">Knowledge Base FAQ</Link></li>
              <li><Link to="/intelligence" className="hover:text-brand-600 dark:hover:text-brand-400">AI Engine & Architecture</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Hospital Contact</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Emergency Line: <strong>+91 1800-999-0000</strong></li>
              <li>OPD Appointments: <strong>+91 1800-123-4567</strong></li>
              <li>Location: Main Medical Campus, Block A</li>
              <li>Operating Hours: 24/7 Casualty & OPD 8AM-8PM</li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} MediFlow AI Healthcare Assistant. Built for Academic Presentation & Demonstration.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Powered by Explainable NLP & FastAPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
