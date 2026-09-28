import React, { useState } from 'react';
import { Cpu, Sparkles, ShieldCheck, ArrowRight, CheckCircle2, Code2, Bot, Layers, Sliders, Database } from 'lucide-react';
import SafetyBanner from '../components/SafetyBanner';

export const IntelligencePage = () => {
  // Demo 1: NLP Intent & Entity Test
  const [nlpQuery, setNlpQuery] = useState('I need to see a skin specialist tomorrow');
  const [nlpResult, setNlpResult] = useState({
    intent: 'Doctor Search',
    confidence: 0.94,
    entities: { department: 'Dermatology', time_preference: 'tomorrow', requirement: 'Consultation with Dermatology specialist' }
  });

  // Demo 2: Recommendation Engine Test
  const [demoDept, setDemoDept] = useState('Cardiology');
  const [demoTime, setDemoTime] = useState('tomorrow');
  const [demoRec, setDemoRec] = useState({
    doctor: 'Dr. Ananya Rao',
    specialization: 'Senior Cardiologist (MD, DM)',
    slot: 'Tomorrow @ 10:30 AM',
    reason: 'Dr. Ananya Rao is recommended as a top-rated Senior Cardiologist with 14 years of clinical experience. Earliest available slot is tomorrow at 10:30 AM.'
  });

  // Demo 3: Summarizer Test
  const [sumDemoText, setSumDemoText] = useState(
    "Patient recently visited the Cardiology department (Dr. Ananya Rao) complaining of mild palpitations. Resting ECG report was normal (72 bpm, sinus rhythm). Follow-up consultation scheduled."
  );

  const handleTestNlp = (text) => {
    const q = text.toLowerCase();
    let dept = null;
    if (q.includes('skin') || q.includes('dermatolog')) dept = 'Dermatology';
    else if (q.includes('cardio') || q.includes('heart')) dept = 'Cardiology';
    else if (q.includes('bone') || q.includes('ortho')) dept = 'Orthopedics';

    let time = 'anytime';
    if (q.includes('tomorrow')) time = 'tomorrow';
    else if (q.includes('today')) time = 'today';
    else if (q.includes('week')) time = 'this_week';

    let intent = 'General Hospital Assistance';
    if (q.includes('see') || q.includes('doctor') || q.includes('specialist')) intent = 'Doctor Search';
    else if (q.includes('where') || q.includes('floor')) intent = 'Hospital Navigation';
    else if (q.includes('summar')) intent = 'Patient Record Summary';
    else if (q.includes('document') || q.includes('hours')) intent = 'Hospital Information';

    setNlpResult({
      intent,
      confidence: 0.92,
      entities: { department: dept, time_preference: time, requirement: `Query: '${text}'` }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors py-6">
      <SafetyBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mt-4">
        
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-2">
              <Cpu className="w-3.5 h-3.5" /> Explainable AI Architecture & Demos
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              MediFlow AI Engine & Technical Demonstration
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Test all 5 modular AI sub-components in real-time and inspect the underlying system pipeline architecture.
            </p>
          </div>
        </div>

        {/* SECTION 1: System Architecture Diagram */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-500" />
                MediFlow End-to-End AI Orchestration Flow
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Query processing pipeline from safety filter to response card delivery</p>
            </div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
              Strategy Pattern Architecture
            </span>
          </div>

          {/* Visual Flow Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 text-center">
            
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs">1</div>
              <span className="font-bold text-xs text-slate-900 dark:text-white">User Query</span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Natural language input</p>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-800/50 flex flex-col items-center justify-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 flex items-center justify-center font-bold text-xs">2</div>
              <span className="font-bold text-xs text-red-900 dark:text-red-200">Safety Check</span>
              <p className="text-[10px] text-red-700 dark:text-red-300">Blocks diagnosis requests</p>
            </div>

            <div className="p-4 bg-brand-50 dark:bg-brand-950/40 rounded-2xl border border-brand-200 dark:border-brand-800/50 flex flex-col items-center justify-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-xs">3</div>
              <span className="font-bold text-xs text-brand-900 dark:text-brand-200">Intent & Entity NLP</span>
              <p className="text-[10px] text-brand-700 dark:text-brand-300">Classifies 7 intent categories</p>
            </div>

            <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800/50 flex flex-col items-center justify-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs">4</div>
              <span className="font-bold text-xs text-teal-900 dark:text-teal-200">KB / DB Query</span>
              <p className="text-[10px] text-teal-700 dark:text-teal-300">Fetches verified data</p>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 flex flex-col items-center justify-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">5</div>
              <span className="font-bold text-xs text-indigo-900 dark:text-indigo-200">AI Response</span>
              <p className="text-[10px] text-indigo-700 dark:text-indigo-300">Synthesizes natural answer</p>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 flex flex-col items-center justify-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">6</div>
              <span className="font-bold text-xs text-emerald-900 dark:text-emerald-200">Recommended Action</span>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-300">Doctor & Location cards</p>
            </div>

          </div>

          {/* LLM Integration Guide Callout */}
          <div className="p-4 bg-slate-900 text-white dark:bg-slate-800 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-teal-400">
              <Code2 className="w-4 h-4" />
              How to Plug In a Real LLM (OpenAI / Gemini)
            </div>
            <p className="text-slate-300 leading-relaxed">
              MediFlow AI uses an abstract <code className="bg-slate-800 dark:bg-slate-900 px-1.5 py-0.5 rounded text-teal-300">LLMProvider</code> interface in <code className="bg-slate-800 dark:bg-slate-900 px-1.5 py-0.5 rounded text-teal-300">backend/ai/llm_provider.py</code>. By default, it operates offline using <code className="text-emerald-400 font-semibold">RuleBasedProvider</code> (zero API key needed). To switch to live OpenAI GPT-4 or Google Gemini:
            </p>
            <div className="p-2.5 bg-slate-950 rounded-xl font-mono text-[11px] text-brand-300">
              LLM_PROVIDER=openai &nbsp;&nbsp;# or gemini<br />
              OPENAI_API_KEY=sk-... &nbsp;&nbsp;# or GEMINI_API_KEY=AIzaSy...
            </div>
          </div>
        </div>

        {/* SECTION 2: 5 Interactive AI Feature Cards */}
        <div className="space-y-4">
          <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">
            Interactive AI Module Testing Sandbox
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Rule-Based NLP & Entity Parser */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-500" /> 1. NLP & Entity Parser
                </span>
                <span className="text-[10px] font-bold bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                  intent_detector.py
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Type a test sentence:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nlpQuery}
                    onChange={(e) => {
                      setNlpQuery(e.target.value);
                      handleTestNlp(e.target.value);
                    }}
                    className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-xs space-y-1.5 font-mono text-slate-700 dark:text-slate-300">
                <div><strong>Detected Intent:</strong> <span className="text-brand-600 font-bold">{nlpResult.intent}</span></div>
                <div><strong>Confidence:</strong> {nlpResult.confidence}</div>
                <div><strong>Parsed Department:</strong> {nlpResult.entities.department || 'None'}</div>
                <div><strong>Time Preference:</strong> {nlpResult.entities.time_preference}</div>
              </div>
            </div>

            {/* Card 2: Explainable Doctor Recommender */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-teal-500" /> 2. Explainable Doctor Recommender
                </span>
                <span className="text-[10px] font-bold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                  recommender.py
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Department</label>
                  <select
                    value={demoDept}
                    onChange={(e) => setDemoDept(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Orthopedics">Orthopedics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Time Preference</label>
                  <select
                    value={demoTime}
                    onChange={(e) => setDemoTime(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="tomorrow">Tomorrow</option>
                    <option value="today">Today</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/50 rounded-2xl text-xs space-y-1">
                <span className="font-bold text-teal-900 dark:text-teal-200">Top Match: {demoDept === 'Dermatology' ? 'Dr. Sneha Kapoor' : 'Dr. Ananya Rao'}</span>
                <p className="text-teal-800 dark:text-teal-300 leading-relaxed text-[11px]">
                  <strong>Why Recommended:</strong> Filtered by {demoDept} department. Matched earliest unbooked slot on {demoTime}.
                </p>
              </div>
            </div>

            {/* Card 3: Patient Record Summarizer */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-indigo-500" /> 3. Patient Record Summarizer
                </span>
                <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                  summarizer.py
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-xs leading-relaxed text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {sumDemoText}
              </div>

              <p className="text-[10px] text-amber-700 dark:text-amber-400 italic">
                * Note: Strict safety rule prevents diagnosing conditions or altering medical advice.
              </p>
            </div>

            {/* Card 4: Knowledge Base FAQ Matcher */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-500" /> 4. Knowledge Base Matcher
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                  knowledge_base.py
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-xs space-y-1 text-slate-700 dark:text-slate-300">
                <div className="font-bold text-slate-900 dark:text-white">Sample KB Query: "What documents do I need for registration?"</div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">Source Tag: Hospital Knowledge Base</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Matches verified registration policy article (Score 8/10). Returns Aadhaar/Passport ID, Insurance card, and past records list.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default IntelligencePage;
