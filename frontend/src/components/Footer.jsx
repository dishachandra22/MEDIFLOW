import React from 'react';
import { Bot, ShieldCheck, Sparkles, Cpu, PhoneCall, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-obsidian-950 border-t border-slate-200 dark:border-obsidian-700 py-8 mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-mint-neon flex items-center justify-center text-obsidian-950 font-black shadow-glow-mint">
                <Bot className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                MediFlow <span className="text-mint-neon">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Next-generation hospital management intelligence platform. Simplifies appointment scheduling, specialist recommendations, floor wayfinding, and clinical records through explainable rule-based NLP.
            </p>
            <div className="inline-flex items-center gap-2 text-[11px] text-slate-600 dark:text-mint-neon bg-mint-neon/10 dark:bg-obsidian-900 px-3 py-1.5 rounded-xl border border-mint-neon/30">
              <ShieldCheck className="w-4 h-4 text-mint-neon shrink-0" />
              <span>Strict Medical Guardrail Active: Refuses diagnostic & prescriptive queries.</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-3 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-mint-neon" /> Core AI Modules
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li><Link to="/assistant" className="hover:text-mint-neon transition-colors">AI Assistant Chat</Link></li>
              <li><Link to="/dashboard" className="hover:text-mint-neon transition-colors">Patient Health Portal</Link></li>
              <li><Link to="/records" className="hover:text-mint-neon transition-colors">Record Summarizer</Link></li>
              <li><Link to="/navigation" className="hover:text-mint-neon transition-colors">Hospital Map Navigation</Link></li>
              <li><Link to="/faq" className="hover:text-mint-neon transition-colors">Knowledge Base FAQ</Link></li>
              <li><Link to="/intelligence" className="hover:text-mint-neon transition-colors">AI Pipeline Sandbox</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-3 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-mint-neon" /> Hospital Directory
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-mint-neon" />
                <span>Emergency: <strong className="text-slate-900 dark:text-white">+91 1800-999-0000</strong></span>
              </li>
              <li>OPD Helpdesk: <strong>+91 1800-123-4567</strong></li>
              <li>Location: <strong>Main Health Campus, Block A</strong></li>
              <li>Casualty: <strong>24/7 Ground Floor</strong></li>
              <li>OPD Timing: <strong>Mon - Sat, 8:00 AM - 8:00 PM</strong></li>
            </ul>
          </div>

        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-obsidian-700 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} MediFlow AI Healthcare Platform. College-level AI Project Implementation.</p>
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-400 font-mono text-[10px]">
            <span className="w-2 h-2 rounded-full bg-mint-neon animate-pulse shadow-glow-mint"></span>
            <span>FastAPI • React • SQLite • Explainable NLP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
