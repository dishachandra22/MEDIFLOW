import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  CalendarCheck, 
  FileSpreadsheet, 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  Clock, 
  User, 
  MapPin, 
  CheckCircle2,
  Stethoscope,
  HeartPulse
} from 'lucide-react';
import SafetyBanner from '../components/SafetyBanner';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <SafetyBanner />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 lg:py-20 bg-radial-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100/80 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-500 animate-spin-slow" />
                <span>Next-Gen Hospital Management Engine</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Intelligent Healthcare, <br />
                <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-teal-500 bg-clip-text text-transparent">
                  Powered by AI.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                A smart hospital assistant that simplifies appointments, patient information, hospital navigation, and everyday healthcare tasks—built with explainable NLP and strict medical guardrails.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/assistant"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-semibold shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Bot className="w-5 h-5" />
                  Try AI Assistant
                </Link>

                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold shadow-sm transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Explore Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Explainable NLP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-500" />
                  <span>24/7 Operations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-teal-500" />
                  <span>Patient First</span>
                </div>
              </div>

            </div>

            {/* Hero Right Mockup - Interactive CSS/SVG Chat & Dashboard Mockup */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Decorative background glow */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-500 via-teal-400 to-indigo-500 opacity-30 blur-xl animate-pulse-glow"></div>

                {/* Glassmorphic Mockup Container */}
                <div className="relative bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
                  
                  {/* Mockup Header Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 ml-2">MediFlow AI Assistant Preview</span>
                    </div>
                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/80 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                      Live Intent Mode
                    </span>
                  </div>

                  {/* Simulated Chat Message 1 */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs shrink-0">
                      V
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded-2xl rounded-tl-none text-xs max-w-[85%] font-medium">
                      "I need to see a cardiologist tomorrow morning."
                    </div>
                  </div>

                  {/* Simulated AI Badge */}
                  <div className="ml-10 flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded-md border border-brand-200 dark:border-brand-800">
                      Detected Intent: Doctor Search (0.96)
                    </span>
                    <span className="text-[10px] font-semibold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded-md">
                      Department: Cardiology
                    </span>
                    <span className="text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-md">
                      Time: Tomorrow
                    </span>
                  </div>

                  {/* Simulated AI Response Card */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-600 to-teal-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-brand-50/90 dark:bg-slate-800/90 border border-brand-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 p-3.5 rounded-2xl rounded-tl-none text-xs space-y-2 w-full">
                      <p className="font-semibold text-brand-900 dark:text-brand-200">
                        Here is our top recommended specialist for tomorrow:
                      </p>
                      
                      {/* Mini Doctor Preview Card */}
                      <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                        <div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white">Dr. Ananya Rao</div>
                          <div className="text-[11px] text-brand-600 dark:text-brand-400">Senior Cardiologist • Room 102</div>
                          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Available Tomorrow @ 10:30 AM</div>
                        </div>
                        <span className="px-2.5 py-1 text-[11px] font-bold text-white bg-brand-600 rounded-lg shadow-sm">
                          Book
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Core Feature Cards Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Intelligent Hospital Automation Modules
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Four core administrative AI features built to streamline hospital workflows and improve patient experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-700 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">AI Hospital Assistant</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Interactive conversational agent powered by keyword scoring NLP, entity parsing, and live intent detection.
              </p>
              <Link to="/assistant" className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:gap-2 transition-all">
                Try Chat Assistant <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:shadow-lg hover:border-teal-300 dark:hover:border-teal-700 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Smart Recommender</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Filters doctors by department & date preference, matching earliest available slots with explainable "Why Recommended" rationale.
              </p>
              <Link to="/assistant" className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1 hover:gap-2 transition-all">
                Search Specialists <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Record Summarizer</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Template-based patient record engine generating plain-language clinical overviews without diagnostic assumptions.
              </p>
              <Link to="/records" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:gap-2 transition-all">
                Summarize Records <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Hospital Navigation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Interactive floor map layout with real-time room search highlighting department locations, landmarks, and step directions.
              </p>
              <Link to="/navigation" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:gap-2 transition-all">
                View Floor Map <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
